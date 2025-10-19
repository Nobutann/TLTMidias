from django.shortcuts import render, get_object_or_404, redirect
from .models import Article, Category
from .forms import ArticleForms
from django.core.paginator import Paginator

def homepage(request):
    articles_list = Article.objects.all().order_by('-published_date')
    categories = Category.objects.all()

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

    context = {
        'article': article
    }

    return render(request, 'article/article_details.html', context)