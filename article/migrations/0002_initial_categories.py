from django.db import migrations

def create_initial_categories(apps, schema_editor):
    # Obtém os modelos (Note: usando Category e Subcategory, não Categories no plural)
    Category = apps.get_model('article', 'Category') 
    Subcategory = apps.get_model('article', 'Subcategory')

    # 1. CRIA A CATEGORIA ESPORTES
    esportes, created = Category.objects.get_or_create(
        title='Esportes',
        slug='esportes'
    )
    
    # 2. CRIA A CATEGORIA POLÍTICA
    politica, created = Category.objects.get_or_create(
        title='Política',
        slug='politica'
    )

    # 3. CRIA AS SUBCATEGORIAS
    Subcategory.objects.get_or_create(
        category=esportes,
        title='Futebol',
        slug='futebol'
    )
    
    Subcategory.objects.get_or_create(
        category=politica,
        title='Notícias Locais',
        slug='noticias-locais'
    )


def delete_initial_categories(apps, schema_editor):
    """
    Reverte a criação das categorias e subcategorias.
    """
    Category = apps.get_model('article', 'Category')
    Subcategory = apps.get_model('article', 'Subcategory')
    
    # Deleta as subcategorias (opcional, mas limpa o banco)
    Subcategory.objects.filter(slug__in=['futebol', 'noticias-locais']).delete()
    
    # Deleta as categorias pelo slug
    Category.objects.filter(slug__in=['esportes', 'politica']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0001_initial'), 
    ]
    operations = [
        # O RunPython agora tem a função de reversão (delete_initial_categories)
        migrations.RunPython(create_initial_categories, delete_initial_categories),
    ]