FROM python:3.9.1-slim AS base

WORKDIR /app

FROM base AS builder

ENV PIP_DEFAULT_TIMEOUT=100 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_VERSION=1.1.13

RUN pip install "poetry==$POETRY_VERSION"
COPY pyproject.toml poetry.lock ./
RUN poetry export --output requirements.txt --without-hashes --dev \
    && pip install \
    --target /root/.local/lib/python3.9/site-packages \
    --requirement requirements.txt

FROM base AS final

ENV PYTHONUNBUFFERED=1 \
    PATH="${PATH}:/root/.local/lib/python3.9/site-packages/bin/"

RUN apt-get update -y \
    && apt-get install --no-install-recommends -y netcat=1.10-41.1 \
    && apt-get clean \
    && rm -r /var/lib/apt/lists/*

COPY --from=builder /root/.local /root/.local
COPY ./scripts /scripts
COPY ./src .
