from django import forms
from .models import Comments, Responses

class CommentsForm(forms.ModelForm):
    class Meta:
        model = Comments
        fields = ['author', 'content',]

class ResponsesForm(forms.ModelForm):
    class Meta: 
        model = Responses
        fields = ['author', 'content']