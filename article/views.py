from django.shortcuts import render, get_object_or_404, redirect
from .models import Article, Category
from .forms import ArticleForms
from django.core.paginator import Paginator

def homepage(request):
    categories = Category.objects.all()

    category_slug = request.GET.get('categoria') 

    if category_slug:
        articles_list = Article.objects.filter(
            category__slug=category_slug
        ).order_by('-published_date')
    else:
        articles_list = Article.objects.all().order_by('-published_date')

    paginator = Paginator(articles_list, 10)
    page_number = request.GET.get('page')
    
    articles = paginator.get_page(page_number)

    context = {
        'categories': categories,
        'articles': articles,
    }

    return render(request, 'article/index.html', context)

def publish_article(request):
    if request.method == 'POST':
        form = ArticleForms(request.POST, request.FILES)
        if form.is_valid():
            article = form.save()
            return redirect('article:homepage')
    else:
        form = ArticleForms()

    context = {
        'form': form
    }

    return render(request, 'article/publish.html', context)

def edit_article(request, pk):
    article = get_object_or_404(Article, pk=pk)
    if request.method == 'POST':
        form = ArticleForms(request.POST, request.FILES, instance=article)
        if form.is_valid():
            form.save()
            return redirect('artigo', slug=article.slug)
    else:
        form = ArticleForms(instance=article)

    context = {
        'form': form,
        'article': article
    }

    return render(request, 'article/edit.html', context)

def delete_article(request, pk):
    article = get_object_or_404(Article, pk=pk)

    if request.method == 'POST':
        article.delete()
        return redirect('index')
    
    context = {
        'article': article
    }

    return render(request, 'article/confirm_delete.html', context)

def article_details(request, pk):
    article = get_object_or_404(Article, pk=pk)
    categories = Category.objects.all()

    related_articles = Article.objects.filter(category=article.category).exclude(pk=article.pk).order_by('-published_date')[:4]

    context = {
        'article': article,
        'categories': categories,
        'related_articles': related_articles
    }

    return render(request, 'article/article_details.html', context)
def category_page(request, category_slug):
    
    category = get_object_or_404(Category, slug=category_slug)
    
    
    categories = Category.objects.all()

    
    articles_list = Article.objects.filter(
        category=category
    ).order_by('-published_date')

    
    paginator = Paginator(articles_list, 10)
    page_number = request.GET.get('page')
    articles = paginator.get_page(page_number)

    context = {
        'categories': categories,     
        'articles': articles,         
        'current_category': category, 
    }

    return render(request, 'article/index.html', context)