#!/bin/sh

python manage.py makemigrations registros
python manage.py migrate
#python manage.py collectstatic
#python manage.py createsuperuser
python manage.py runserver 0:8000