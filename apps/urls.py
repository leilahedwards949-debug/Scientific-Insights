from django.urls import path
from . import views

urlpatterns = [
    path('sympy/derive/', views.sympy_derive_view, name='sympy_derive'),
    path('plot/function/', views.plot_function_view, name='plot_function'),
    path('ml/train/', views.ml_train_view, name='ml_train'),
    path('ml/predict/', views.ml_predict_view, name='ml_predict'),
]
