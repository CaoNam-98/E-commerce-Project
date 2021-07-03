from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="getProducts"),
    path('top/', views.getTopProducts, name="topProducts"),
    path('<str:pk>', views.getProduct, name="getProduct"),
    path('create/', views.createProduct, name="createProduct"),
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('update/<str:pk>/', views.updateProduct, name="updateProduct"),
    path('delete/<str:pk>/', views.deleteProduct, name="deleteProduct")
]
