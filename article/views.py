from django.shortcuts import render, get_object_or_404
from .models import Article, Category, Subcategory 


def home(request):
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
    return render(request, 'article/index.html', context)


def category_articles(request, slug):
    category = get_object_or_404(Category, slug=slug)
    
    articles = Article.objects.filter(category=category).order_by('-published_date') 
    context = {'title': category.title, 'articles': articles}
    return render(request, 'article/list_page.html', context)



def subcategory_articles(request, slug):
    subcategory = get_object_or_404(Subcategory, slug=slug)
    
    articles = Article.objects.filter(subcategory=subcategory).order_by('-published_date')
    context = {'title': subcategory.title, 'articles': articles}
    return render(request, 'article/index.html', context)