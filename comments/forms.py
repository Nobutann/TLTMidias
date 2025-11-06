from django import forms
from .models import Comments, Responses

class CommentsForm(forms.ModelForm):
    class Meta:
        model = Comments
        fields = ['author', 'content',]
        labels = {
            'author': 'Autor',
            'content': 'Seu comentário',
        }
        widgets = {
            'author': forms.TextInput(attrs={'placeholder': 'Seu nome...'}),
            'content': forms.Textarea(attrs={'placeholder': 'Escreva seu comentário...'}),
        }

class ResponsesForm(forms.ModelForm):
    class Meta: 
        model = Responses
        fields = ['author', 'content']
        labels = {
            'author': 'Autor',
            'content': 'Resposta',
        }
        widgets = {
            'author': forms.TextInput(attrs={'placeholder': 'Seu nome...'}),
            'content': forms.Textarea(attrs={'placeholder': 'Escreva sua resposta aqui...'}),
        }