from django.shortcuts import render, get_object_or_404, redirect
from .models import Article, Category, Subcategory 
from .forms import ArticleForms


def home(request):
    # Lógica do menu... (MANTIDA)
    categories = Category.objects.all().order_by('title')
    subcategories = Subcategory.objects.select_related('category').all()
    menu_data = {}
    for category in categories:
        menu_data[category.title] = {
            'slug': category.slug,
            'subcategories': []
        }
    for subcategory in subcategories:
        category_title = subcategory.category.title
        if category_title in menu_data:
            menu_data[category_title]['subcategories'].append(subcategory) 

    context = {'menu': menu_data}
    return render(request, 'home.html', context) 


# --- VIEWS ADICIONADAS/CORRIGIDAS ---

def article_detail(request, slug):
    article = get_object_or_404(Article, slug=slug)
    context = {'article': article, 'title': article.title}
    return render(request, 'article_detail.html', context)


def publish_article(request):
    if request.method == 'POST':
        form = ArticleForms(request.POST)
        if form.is_valid():
            article = form.save(commit=False)
            article.save()
            return redirect('artigo', slug=article.slug) 
    else:
        form = ArticleForms()
    
    context = {'form': form, 'title': 'Publicar Novo Artigo'}
    return render(request, 'publish_article.html', context)


def edit_article(request, pk):
    article = get_object_or_404(Article, pk=pk)
    
    if request.method == 'POST':
        form = ArticleForms(request.POST, instance=article)
        if form.is_valid():
            form.save()
            return redirect('artigo', slug=article.slug)
    else:
        form = ArticleForms(instance=article)
    
    context = {'form': form, 'title': f'Editar Artigo: {article.title}'}
    return render(request, 'edit_article.html', context)


# 🚨 CORREÇÃO 4: Adicionada a view 'delete_article' que estava faltando
def delete_article(request, pk):
    """
    Exclui um artigo e redireciona para a página inicial.
    """
    article = get_object_or_404(Article, pk=pk)
    
    if request.method == 'POST':
        # Nota: Você pode querer adicionar uma confirmação de usuário/segurança aqui.
        article.delete()
        # Redireciona para a página inicial (home) após a exclusão
        return redirect('home')
    
    # Se não for POST (por exemplo, GET), mostra uma página de confirmação
    context = {'article': article, 'title': f'Confirmar Exclusão: {article.title}'}
    return render(request, 'delete_article_confirm.html', context)


# Views para listagem de artigos (mantidas como você as tem)
def category_articles(request, slug):
    category = get_object_or_404(Category, slug=slug)
    articles = Article.objects.filter(category=category).order_by('-published_date') 
    context = {'title': category.title, 'articles': articles}
    return render(request, 'list_page.html', context)


def subcategory_articles(request, slug):
    subcategory = get_object_or_404(Subcategory, slug=slug)
    articles = Article.objects.filter(subcategory=subcategory).order_by('-published_date')
    context = {'title': subcategory.title, 'articles': articles}
    return render(request, 'article/home.html', context)