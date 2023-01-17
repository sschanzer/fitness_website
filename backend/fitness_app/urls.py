from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home),
    path('sign_in/', views.sign_in),
    path('sign_up/', views.sign_up),
    path('sign_out/', views.sign_out),
    path('current_user/', views.curr_user),
    path('profile_pic/', views.profile_pic),
    path('save_workout/', views.save_workout),
    path('save_set/', views.save_set),
    path('delete_set/<int:id>/', views.delete_set),
    path('delete_workout/<int:id>/', views.delete_workout), 
    path('delete_exercise/<int:id>/', views.delete_exercise),
    path('workout_history/', views.workout_history),
    path('new_exercise/', views.new_exercise),
    path('display_workout_history/<int:id>/', views.display_workout_history),
    path('exercise_db/<str:name>/', views.exercise_db),
    path('search_exercise_db/<str:name>/', views.search_exercise_db),
    path('get_quote/', views.get_quote),
    # path('get_quote/', views.get_quote),
    # path('delete_exercise', views.delete_exercise),
]