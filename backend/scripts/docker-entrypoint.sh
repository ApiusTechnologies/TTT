#!/bin/bash

printf "Waiting for postgres...\n"
sh -c '/scripts/wait-for.sh postgres:5432'

printf "\nMigrating database...\n"
python manage.py migrate

printf "\nCreating superuser...\n"
python manage.py createsuperuser --no-input \
    --username "$DJANGO_SUPERUSER_USER" --email "$DJANGO_SUPERUSER_EMAIL"

printf "\nRunning development server...\n"
python manage.py runserver 0.0.0.0:8000
