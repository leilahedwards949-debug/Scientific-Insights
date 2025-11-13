from django.urls import path
from .views import PlotFunctionView

urlpatterns = [
    path('function/', PlotFunctionView.as_view(), name='plot-function')
]
