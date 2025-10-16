from django.shortcuts import render, get_object_or_404
from .models import Article, Category, Subcategory 


def home(request):
    # 1. Carrega todas as categorias
    categories = Category.objects.all().order_by('title')
    
    # 🚨 DEBUG: Se o banco estiver vazio, ele levantará um erro GIGANTE no navegador.
    # Se você vir esta mensagem no navegador (Exception), o problema é no 0002_initial_categories.py
    # if not categories.exists():
    #     raise Exception("ERRO FATAL: O banco de dados está vazio! Categorias não carregadas. Verifique a migração 0002_initial_categories.py.")
        
    # 2. Carrega todas as subcategorias
    subcategories = Subcategory.objects.select_related('category').all()
    
    # 3. Inicializa a estrutura de dados do menu
    menu_data = {}
    
    # 4. Preenche a estrutura principal (Categorias)
    for category in categories:
        menu_data[category.title] = {
            'slug': category.slug,
            'subcategories': []
        }
        
    # 5. Adiciona as subcategorias à sua respectiva categoria
    for subcategory in subcategories:
        category_title = subcategory.category.title
        
        if category_title in menu_data:
            menu_data[category_title]['subcategories'].append(subcategory) 

    # 6. Envia a estrutura completa para o template
    context = {'menu': menu_data}
    return render(request, 'home.html', context)


# Views para listagem de artigos (mantidas como você as tem)
def category_articles(request, slug):
    category = get_object_or_404(Category, slug=slug)
    
    articles = Article.objects.filter(category=category).order_by('-published_date') 
    context = {'title': category.title, 'articles': articles}
    # Atenção: Você tinha um TemplateDoesNotExist aqui, certifique-se de que é list_page.html
    return render(request, 'list_page.html', context)


def subcategory_articles(request, slug):
    subcategory = get_object_or_404(Subcategory, slug=slug)
    
    articles = Article.objects.filter(subcategory=subcategory).order_by('-published_date')
    context = {'title': subcategory.title, 'articles': articles}
    return render(request, 'list_page.html', context)