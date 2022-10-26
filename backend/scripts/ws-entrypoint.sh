#!/bin/bash

daphne config.asgi:ws_application \
    --bind 0.0.0.0 \
    --port 8001 \
    --root-path=/app \
