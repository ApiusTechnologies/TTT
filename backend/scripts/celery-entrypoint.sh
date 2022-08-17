#!/bin/bash

printf "Waiting for postgres...\n"
sh -c '/scripts/wait-for.sh postgres:5432'

echo -e "\nRunning celery server..."
watchmedo auto-restart --directory=./ --pattern=*.py --recursive -- \
    celery \
        --app config worker \
        --loglevel INFO \
        --hostname=worker@%h \
        --beat # \
        # --uid=nobody \
        # --gid=nogroup
