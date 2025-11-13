from django.urls import path, include

urlpatterns = [
    path('api/sympy/', include('apps.sympy_utils.urls')),
    path('api/plot/', include('apps.plotter.urls')),
    path('api/ml/', include('apps.ml_demo.urls')),
    path('api/astro/', include('apps.astro_utils.urls')),
]
from django.urls import path, include
from django.http import HttpResponse

def index(request):
    return HttpResponse('Scientific Insights Hub')

urlpatterns = [
    path('', index),
    path('api/', include('apps.urls')),
]
