from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import *
import json
from django.core import serializers
from django.contrib.auth import authenticate, login, logout 
from datetime import datetime
from django.core.files.storage import FileSystemStorage
import requests 
from datetime import date


# Create your views here.

def home(request):
    file = open('static/index.html')
    return HttpResponse(file)

@api_view(['POST'])
def sign_in(request):
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)
    print(request.data)
    if user is not None and user.is_active:
        try:
            login(request._request, user)
            print(f'{email} is signed in!')
            return JsonResponse({'signIn': True})
        except Exception as e:
            print(e)
            return JsonResponse({'signIn': False})
    else:
            return JsonResponse({'signNNNIn': False})


@api_view(['GET'])
def curr_user(request):
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['first_name', 'last_name', 'email', 'date_created', 'profile_pic'])
        return HttpResponse(data)
    else:
        return JsonResponse({'message': 'User not authenticated'})


@api_view(['POST'])
def sign_up(request):
    email = request.data['email']
    password = request.data['password']
    first_name = request.data['first_name']
    last_name = request.data['last_name']
    new_user = User.objects.create_user(username=email, email=email, first_name=first_name, last_name=last_name, password=password)
    new_user.save()
    return JsonResponse({'message': 'User created'})

def sign_out(request):
    try:
        logout(request)
        print('user signed out')
        return JsonResponse({'signout': True})
    except Exception as e:
            print(e)
            return JsonResponse({'signout': False})


@api_view(['PUT'])
def profile_pic(request):
    if request.FILES:
        fs = FileSystemStorage()
        fs.save(request.FILES['profile_pic'].name, request.FILES['profile_pic'])
        pic_url = fs.url(request.FILES['profile_pic'].name)
        print(pic_url)
        request_user = request.user
        print(request_user)
        user = User.objects.filter(email=request_user.email)
        print(user)
        print(request.FILES['profile_pic'])
        picture_update = user.update(profile_pic = pic_url)
    

    return HttpResponse('alskdfj')

@api_view(['POST', 'GET'])
def save_workout(request):
    if request.method == 'POST':
        print('request.data', request.data)
        name = request.data['name']
        workout = Workouts.objects.create(workout_title=name, user=request.user)
        workout.save() 
        exercises = Exercises.objects.filter(user=request.user, saved=False)
        for exercise in exercises:
            exercise.workouts = workout
            exercise.saved = True
            exercise.save()
        return JsonResponse({'success': True})
    if request.method == 'GET':
        display_workouts = []
        all_workouts = Workouts.objects.filter(user=request.user)
        for workout in all_workouts:
            workout_dictionary = {'workout':workout.workout_title, 'id':workout.id}
            my_exercises = Exercises.objects.filter(workouts=workout)
            exercise_list = []
            for i in range(len(my_exercises)):
                print('line 102')
                print(my_exercises[i].name)
                my_sets = list(Sets.objects.filter(exercises=my_exercises[i].id).values())
                my_dictionary = {f'exercise':my_exercises[i].name, f'sets':my_sets}
                exercise_list.append(my_dictionary)
            workout_dictionary['exercises'] = exercise_list
            display_workouts.append(workout_dictionary)
        print('display_workouts', display_workouts)
        all_workouts = list(all_workouts.values())
        return JsonResponse({'all_workouts': display_workouts}) 

@api_view(['POST', 'PUT'])
def save_set(request):
    if request.method == 'POST':
        id = request.data['id']
        sets = request.data['sets']
        reps = request.data['reps']
        weight = request.data['weight']
        exercise = Exercises.objects.get(id=id)
        create_set = Sets.objects.create(sets=sets, reps=reps, weight=weight, exercises=exercise)
        create_set.save()
        return JsonResponse({'success': True})
    if request.method == 'PUT':
        id = request.data['id']
        sets = request.data['sets']
        reps = request.data['reps']
        weight = request.data['weight']
        set = Sets.objects.get(id=id)
        set.sets = sets
        set.reps = reps
        set.weight = weight
        set.save()
        return JsonResponse({'success': True})

@api_view(['DELETE'])
def delete_set(request, id):
    print('Request data from delete: ', request.data)
    Sets.objects.get(id=id).delete()    
    return JsonResponse({'success': True})

@api_view(['DELETE'])
def delete_workout(request, id):
    Workouts.objects.get(id=id).delete()
    return JsonResponse({'success': True})

@api_view(['DELETE'])
def delete_exercise(request, id):
    Exercises.objects.get(id=id).delete()    
    return JsonResponse({'success': True})


@api_view(['GET'])
def workout_history(request):
    workout_finished = Workouts.objects.filter(user=request.user, finished=True)
    workout_info = []
    workout_finished_list = list(workout_finished.values())
    for workout in workout_finished_list:
        exercises = Exercises.objects.filter(workouts=workout['id'])
        if workout['date_completed'] == None:
            workout['date_completed'] = date.today()
        workout_dict = {'workout':workout}
        exercises_list = list(exercises.values())
        list_of_exercises = []
        for exercise in exercises_list:
            sets = Sets.objects.filter(exercises=exercise['id'])
            list_of_exercises.append({'exercise': exercise, 'sets':list(sets.values())})
        workout_dict['exercises_list'] = list_of_exercises
        workout_info.append(workout_dict)
            

    return JsonResponse({'workout_finished':list(workout_finished.values()), 'workout_info': workout_info})


@api_view(["POST", "GET"])
def new_exercise(request):
    print('request.data new_exercise: ', request.data)
    if request.method == 'POST':
        name = request.data['name']
        new_exercise = Exercises.objects.create(name=name, user=request.user)
        new_exercise.save()
        return JsonResponse({'success': True})
    if request.method == 'GET':
        set_list = []
        exercises = list(Exercises.objects.filter(user=request.user, saved=False).values())
        for exercise in exercises:
            list_of_sets = list(Sets.objects.filter(exercises=exercise['id']).values())
            set_list.append(list_of_sets)
        # print('set_list: ', set_list)
        return JsonResponse({'success': True, 'exercises': exercises, 'set_list': set_list})

@api_view(['PUT'])
def  display_workout_history(request, id):
    if request.method == 'PUT':
        print('workout_id : ', id)
        print('request.data: ', request.data)
        workout = Workouts.objects.get(id=id)
        print('workout: ', workout)
        workout.finished = True
        workout.date_completed = date.today()
        workout.save()
        print('workout finished: ', workout.finished)
        # display_workouts = []
        # all_workouts = Workouts.objects.filiter(user=request.user)
        # for workout in all_workouts:
        #     workout_dictionary = {'workout':workout.workout_title, 'id':workout.id}
        #     my_exercises = Exercises.objects.filter(workouts=workout)
        #     exercise_list = []
        #     for i in range(len(my_exercises)):
        #         print('line 195')
        #         print(my_exercises[i].name)
        return JsonResponse({'success': True})
       
        
#     if request.method == 'GET':
#         display_workouts = []
#         all_workouts = Workouts.objects.filter(user=request.user)
#         for workout in all_workouts:
#             workout_dictionary = {'workout':workout.workout_title, 'id':workout.id}
#             my_exercises = Exercises.objects.filter(workouts=workout)
#             exercise_list = []
#             for i in range(len(my_exercises)):
#                 print('line 102')
#                 print(my_exercises[i].name)
#                 my_sets = list(Sets.objects.filter(exercises=my_exercises[i].id).values())
#                 my_dictionary = {f'exercise':my_exercises[i].name, f'sets':my_sets}
#                 exercise_list.append(my_dictionary)
#             workout_dictionary['exercises'] = exercise_list
#             display_workouts.append(workout_dictionary)
#         print('display_workouts', display_workouts)
#         all_workouts = list(all_workouts.values())
#         return JsonResponse({'all_workouts': display_workouts}) 
