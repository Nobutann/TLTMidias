from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator
from django.db.models import Q 
from django.urls import reverse 

from .models import Article, Category, Columnist
from .forms import ArticleForms
from comments.forms import CommentsForm, ResponsesForm
from comments.models import Comments


def homepage(request):
    categories = Category.objects.all()
    
    search_query = request.GET.get('q')        
    search_date = request.GET.get('data')      
    category_slug = request.GET.get('categoria')
    
    articles_list = Article.objects.all().order_by('-published_date')
    
    if search_query:
        articles_list = articles_list.filter(
            Q(title__icontains=search_query) | 
            Q(content__icontains=search_query) |
            Q(category__title__icontains=search_query)
        )

    if search_date:
        articles_list = articles_list.filter(published_date__date=search_date)

    if category_slug:
        articles_list = articles_list.filter(
            category__slug=category_slug
        )

    if not articles_list.exists():
        no_results = True
    else:
        no_results = False

    paginator = Paginator(articles_list, 10)
    page_number = request.GET.get('page')
    articles = paginator.get_page(page_number)

    context = {
        'categories': categories,
        'articles': articles,
        'no_results': no_results,        
        'search_query': search_query,    
        'search_date': search_date,
        'category_slug': category_slug,  
    }

    return render(request, 'article/index.html', context)

def article_details(request, slug):
    try:
        article = Article.objects.get(slug=slug)
    except Article.DoesNotExist:
        return render(request, 'article/confirm_delete.html', {'article': None}, status=404)
    categories = Category.objects.all()
    comments = article.comments.all()

    related_articles = Article.objects.filter(category=article.category).exclude(slug=article.slug).order_by('-published_date')[:4]

    if request.method == 'POST':
        if 'comment_submit' in request.POST:
            comment_form = CommentsForm(request.POST)
            if comment_form.is_valid():
                new_comment = comment_form.save(commit=False)
                new_comment.article = article
                new_comment.save()
                
                return redirect('article:details', slug=slug)
        elif 'response_submit' in request.POST:
            response_form = ResponsesForm(request.POST)
            if response_form.is_valid():
                comment_id = request.POST.get('comment_id')
                comment = get_object_or_404(Comments, pk=comment_id)
                new_response = response_form.save(commit=False)
                new_response.comment = comment
                new_response.save()
                return redirect('article:details', slug=slug)
    else:
        comment_form = CommentsForm()
        response_form = ResponsesForm()

    context = {
        'article': article,
        'categories': categories,
        'related_articles': related_articles,
        'comments': comments,
        'comment_form': comment_form,
        'response_form': response_form,
    }

    return render(request, 'article/article_details.html', context)

def category_page(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    categories = Category.objects.all()

    articles_list = Article.objects.filter(category__slug=category_slug).order_by('-published_date')

    if not articles_list.exists():
        no_results = True
    else:
        no_results = False

    paginator = Paginator(articles_list, 10)
    page_number = request.GET.get('page')
    articles = paginator.get_page(page_number)

    context = {
        'categories': categories,
        'articles': articles,
        'no_results': no_results,
        'category_slug': category_slug,
    }

    return render(request, 'article/index.html', context)