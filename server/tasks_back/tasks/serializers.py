from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Project, Task, Comment
from accounts.models import User
from accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model



class ProjectSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all(), many=True, required=False)

    class Meta:
        model = Project
        fields = ('id', 'name', 'description', 'start_date', 'end_date', 'members',"created_user")
    

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class MemberListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username')