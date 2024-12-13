from django.urls import path
from .views import BlogGenerateView


urlpatterns = [
    #path('generate/', blog_generate_page, name='blog-generate-page'),  # 키워드 입력 및 결과 표시 UI
    path('generate/api/', BlogGenerateView.as_view(), name='blog-generate-api'),
]
