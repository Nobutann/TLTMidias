
from django.db import migrations

def populate_categories(apps, schema_editor):
    Category = apps.get_model('article', 'Category')
    
    categories = [
        {'title': 'Política', 'slug': 'politica'},
        {'title': 'Economia', 'slug': 'economia'},
        {'title': 'Esportes', 'slug': 'esportes'},
        {'title': 'Cultura', 'slug': 'cultura'},
        {'title': 'Tecnologia', 'slug': 'tecnologia'},
        {'title': 'Saúde', 'slug': 'saude'},
        {'title': 'Educação', 'slug': 'educacao'},
        {'title': 'Internacional', 'slug': 'internacional'},
        {'title': 'Opinião', 'slug': 'opiniao'},
        {'title': 'Cidades', 'slug': 'cidades'},
    ]
    
    for cat_data in categories:
        Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults={'title': cat_data['title']}
        )

def remove_categories(apps, schema_editor):
    Category = apps.get_model('article', 'Category')
    Category.objects.all().delete()

class Migration(migrations.Migration):

    dependencies = [
        ('article', '0005_alter_article_author'),
    ]

    operations = [
        migrations.RunPython(populate_categories, remove_categories),
    ]
