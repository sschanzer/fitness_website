from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    # username = models.CharField(max_length=100, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_pic = models.TextField(default='')


class Workouts(models.Model):
    workout_title = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    finished = models.BooleanField(default=False)
    date_completed = models.DateField(null=True)


class Exercises(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default='unknown', related_name='exercises')
    workouts = models.ForeignKey(Workouts, null=True, on_delete=models.CASCADE)
    saved = models.BooleanField(default=False)
    

class Sets(models.Model):
    sets = models.IntegerField()
    reps = models.IntegerField()
    weight = models.CharField(max_length=25)
    exercises = models.ForeignKey(Exercises, on_delete=models.CASCADE)