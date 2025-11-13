from django.urls import path, include
from django.http import HttpResponse

def index(request):
    return HttpResponse('Scientific Insights Hub')

urlpatterns = [
    path('', index),
    path('api/', include('apps.urls')),
]
