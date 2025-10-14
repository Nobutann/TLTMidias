# article/views.py (Conteúdo COMPLETO)

from django.shortcuts import render, get_object_or_404
from .models import Article, Category, Subcategory 

# ----------------------------------------------------------------------
# 1. VIEW HOME (Implementação do Cenário 1: Exibição Agrupada)
# ----------------------------------------------------------------------
def home(request):
    categories = Category.objects.all().order_by('title')
    # select_related otimiza a busca das subcategorias
    subcategories = Subcategory.objects.select_related('category').all()
    
    menu_data = {}
    
    # Cria a estrutura: {'Categoria': {'slug': 'slug', 'subcategories': [...]}}
    for category in categories:
        menu_data[category.title] = {
            'slug': category.slug,
            'subcategories': []
        }
        
    # Aninha as Subcategorias
    for subcategory in subcategories:
        category_title = subcategory.category.title
        if category_title in menu_data:
            menu_data[category_title]['subcategories'].append(subcategory) 

    context = {'menu': menu_data}
    return render(request, 'home.html', context)

# ----------------------------------------------------------------------
# 2. VIEW CATEGORIA (Implementação do Cenário 3)
# ----------------------------------------------------------------------
def category_articles(request, slug):
    category = get_object_or_404(Category, slug=slug)
    # Filtra os artigos
    articles = Article.objects.filter(category=category).order_by('-published_date') 
    context = {'title': category.title, 'articles': articles}
    return render(request, 'list_page.html', context)


# ----------------------------------------------------------------------
# 3. VIEW SUBCATEGORIA (Navegação)
# ----------------------------------------------------------------------
def subcategory_articles(request, slug):
    subcategory = get_object_or_404(Subcategory, slug=slug)
    # Filtra os artigos (requer que Article tenha FK para Subcategory)
    articles = Article.objects.filter(subcategory=subcategory).order_by('-published_date')
    context = {'title': subcategory.title, 'articles': articles}
    return render(request, 'article/home.html', context)