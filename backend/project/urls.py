from django.contrib import admin
from django.urls import path, include
from app.views import ReactView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ReactView.as_view(), name="anything"),
]
