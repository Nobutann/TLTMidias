from django.shortcuts import render, redirect, get_object_or_404
from article.forms import ArticleForms
from article.models import Article
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .models import Columnist

def columnists_page(request):
    columnists = Columnist.objects.all().order_by('name') 
    context = {
        'columnists': columnists
    }
    return render(request, 'dashboard/columnists.html', context)

def dashboard_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('administration:publish_article')
        else:
            messages.error(request, "Usuário ou senha incorretos")

    return render(request, 'dashboard/login.html')

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

    return render(request, 'dashboard/publish.html', context)

def edit_article(request, slug):
    article = get_object_or_404(Article, slug=slug)
    if request.method == 'POST':
        form = ArticleForms(request.POST, request.FILES, instance=article)
        if form.is_valid():
            form.save()
            return redirect('article:details', slug=article.slug) 
    else:
        form = ArticleForms(instance=article)

    context = {
        'form': form,
        'article': article
    }

    return render(request, 'dashboard/edit.html', context)

def delete_article(request, slug):
    article = get_object_or_404(Article, slug=slug)

    if request.method == 'POST':
        article.delete()
        return redirect('article:homepage') 
    
    context = {
        'article': article
    }

    return render(request, 'dashboard/confirm_delete.html', context)

def manage_articles(request):
    articles = Article.objects.all().order_by('-published_date')
    
    context = {
        'articles': articles
    }
    
    return render(request, 'dashboard/manage_articles.html', context)
