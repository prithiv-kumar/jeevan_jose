from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ProjectSerializer, TaskSerializer, CommentSerializer,MemberListingSerializer
from .models import Project, Task, Comment
from accounts.models import User
from django.core.mail import send_mail

class ProjectListCreateView(generics.ListCreateAPIView):

    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(members=self.request.user)

    def perform_create(self, serializer):
        project = serializer.save(created_user=self.request.user)
        members = project.members.all()

        subject = 'New Project Assigned'
        message = f'You have been assigned to a new project: {project.name}'
        from_email = "jeevanjose2016@gmail.com"
        recipient_list = [user.email for user in members]

        send_mail(
            subject,
            message,
            from_email,
            recipient_list,
            fail_silently=False,
        )

    def list(self,request):
        instance = self.get_queryset()
        serializer = ProjectSerializer(instance,many=True)
        data = serializer.data
        print("jhggjhs")

       
        for index, item in enumerate(data):
            print(index)
            print(item['members'])
            updated_members = []
            for member_id in item['members']:
                member_details = User.objects.get(id=member_id)
                member_serializer = MemberListingSerializer(member_details)
                updated_members.append(member_serializer.data)
            item['members'] = updated_members

        return Response(data)

class ProjectListCreateViewCreated(generics.ListCreateAPIView):

    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(created_user=self.request.user)

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        members = instance.members.all()
        member_serializer = MemberListingSerializer(members, many=True)
        data['members'] = member_serializer.data
        
        createduserdetails=MemberListingSerializer(instance.created_user)
        data['created_user']=createduserdetails.data

        return Response(data)

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(project__members=self.request.user)

    def perform_create(self, serializer):
        project = Project.objects.get(pk=self.request.data['project'])
        if self.request.user in project.members.all():
            serializer.save()
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(project__members=self.request.user)

    

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(task__project__members=self.request.user)

    def perform_create(self, serializer):
        task = Task.objects.get(pk=self.request.data['task'])
        if self.request.user in task.project.members.all():
            serializer.save(user=self.request.user)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)



class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(user=self.request.user)




class MembersListingView(generics.ListCreateAPIView):
    serializer_class = MemberListingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.all()


class ProjectListWithTasksView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(members=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        for project_data in data:
            project_id = project_data['id']
            tasks = Task.objects.filter(project_id=project_id, assigned_to=self.request.user)
            task_serializer = TaskSerializer(tasks, many=True)
            project_data['tasks'] = task_serializer.data
        return Response(data)


