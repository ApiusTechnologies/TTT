#!/bin/bash

printf "Waiting for postgres...\n"
sh -c '/scripts/wait-for.sh postgres:5432'

printf "\nMigrating database...\n"
python manage.py migrate

printf "\nCollecting static files...\n"
python manage.py collectstatic --noinput

printf "\nCreating superuser...\n"
python manage.py createsuperuser --no-input \
    --username "$DJANGO_SUPERUSER_USER" --email "$DJANGO_SUPERUSER_EMAIL"

printf "\nLoading initial sources...\n"
python manage.py loaddata initial_sources

if [ $1 = "prod" ]
then
    gunicorn config.asgi:application \
        -k uvicorn.workers.UvicornWorker \
        --bind 0.0.0.0:8000 \
        --chdir=/app
else
    python manage.py runserver 0.0.0.0:8000
fi
