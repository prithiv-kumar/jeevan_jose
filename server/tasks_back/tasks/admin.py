from django.contrib import admin
from .models import Comment,Task,Project

# Register your models here.
admin.site.register(Comment)
admin.site.register(Task)
admin.site.register(Project)
