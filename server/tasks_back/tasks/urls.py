from django.urls import path
from .views import ProjectListCreateView,MembersListingView,ProjectListCreateViewCreated, ProjectListWithTasksView,CommentDetailView,ProjectDetailView, TaskListCreateView, TaskDetailView, CommentListCreateView

urlpatterns = [

    path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/created/', ProjectListCreateViewCreated.as_view(), name='project-list-created'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='task-detail'),


    path('members/', MembersListingView.as_view(), name='member-list'),
    path('pros/', ProjectListWithTasksView.as_view(), name='project-list'),

]