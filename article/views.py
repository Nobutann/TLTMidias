from django.shortcuts import render, get_object_or_404, redirect
from .models import Article, Category, Subcategory 
from .forms import ArticleForms

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

def article_detail(request, slug):
    """Exibe o artigo pelo slug ou mostra uma página de erro se não for encontrado."""
    try:
        article = Article.objects.get(slug=slug)
        context = {'article': article}
        return render(request, 'article/detail.html', context)

    except Article.DoesNotExist:
        referer = request.META.get('HTTP_REFERER', '/')
        return render(request, 'article/error.html', {
            'message': 'Artigo não encontrado',
            'referer': referer
        })

    except Exception:
        referer = request.META.get('HTTP_REFERER', '/')
        return render(request, 'article/error.html', {
            'message': 'Erro ao carregar o artigo',
            'referer': referer
        })

def publish_articles(request):
    if request.method == 'POST':
        form = ArticleForms(request.POST, request.FILES)
        if form.is_valid():
            article = form.save(commit=True)
            article.save()
            return redirect('') #Lucca, aqui tu redireciona pra página que tu quiser no front
    
    context = {
        'form': form
    }

    return render(request, '', context) #Lucca, denovo, aqui tu renderiza a página html que tu for fazer