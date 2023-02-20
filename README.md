# Fitness Tracking Website 

This Fitness Tracking application will allow users to `create` new workouts, `read` existing workouts created, `update` sets/reps/weight of exercises within a workout, and `delete` sets/reps/weight of exercises in a workout, or entire workouts.

## Documentation

## Run Locally

Clone the project

`git clone https://github.com/sschanzer/fitness_website.git`

Open a second terminal on the same directory

Create and run a virtual environment 

```bash
# CREATE
python -m venv <env>
# RUN
source <env>/bin/activate
```
cd into project directory

`cd backend`

Install Dependencies

`pip install -r requirements.txt`

Create .env file with `SECRET_KEY` from backend/settings.py
and copy/paste your Django key from backend/backend/settings.py

Create your postgreSQL database
`createdb fitness_db`

Make migrations and migrate the models into the database

```bash
# Makes migrations
python manage.py makemigrations
# Migrates
python manage.py migrate
```

Run the server
`python manage.py runserver`

Switch to second terminal window opened at the beginning

cd into the frontend directory

`cd frontend`

Build the frontend

'npm run watch'

Then go to local host

`http://127.0.0.1:8000/`


### Environment Variables

To run this project, be sure to add your secret key in .env

`SECRET_KEY = your django SECRET_KEY` from backend/settings.py
