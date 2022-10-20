import os
import json
import environ

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env(
    # DJANGO CONFIG
    DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, ['localhost', '127.0.0.1', '[::1]']),
    CSRF_TRUSTED_ORIGINS=(
        list, ['https://*.threattrendstracker.tk', 'https://*.127.0.0.1']),
    SECRET_KEY=(str),

    # DATA SOURCES
    TWITTER_BEARER_TOKEN=(str, None),

    # DATABASE
    POSTGRES_DB=(str, 'postgres'),
    POSTGRES_USER=(str, 'postgres'),
    POSTGRES_PASSWORD=(str, 'postgres'),
    POSTGRES_HOST=(str, 'postgres'),
    POSTGRES_PORT=(str, '5432'),

    # CELERY
    RABBITMQ_DEFAULT_USER=(str, 'admin'),
    RABBITMQ_DEFAULT_PASS=(str, 'pass'),
    RABBITMQ_URL=(str, 'rabbit:5672'),
)

environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

#
# Config variables
#

DEBUG = env("DEBUG")
ALLOWED_HOSTS = env("ALLOWED_HOSTS")
TWITTER_BEARER_TOKEN = env("TWITTER_BEARER_TOKEN")
SECRET_KEY = env('SECRET_KEY')

#
# Application definition
#

DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

INSTALLED_APPS = [
    # Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.messages',
    'django.contrib.sessions',
    'django.contrib.staticfiles',

    # Internal
    'api.apps.ApiConfig',
    'authentication.apps.AuthenticationConfig',
    'parsers.apps.ParsersConfig',
    'utils.apps.UtilsConfig',

    # External
    'corsheaders',
    'django_filters',
    'rest_framework.authtoken',
    'rest_framework',
    'polymorphic',
]

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_PAGINATION_CLASS': 'utils.pagination.NoHostnameLimitOffsetPagination',
    'DEFAULT_THROTTLE_CLASSES': ['rest_framework.throttling.AnonRateThrottle'],
    'DEFAULT_THROTTLE_RATES': {'anon': '1000/day'},
    'DEFAULT_PERMISSION_CLASSES': (),
    'DEFAULT_AUTHENTICATION_CLASSES': (),

}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'WARNING',
    },
}

ROOT_URLCONF = 'config.urls'

ASGI_APPLICATION = 'config.asgi.application'

RABBITMQ_USER = env('RABBITMQ_DEFAULT_USER')
RABBITMQ_PASS = env('RABBITMQ_DEFAULT_PASS')
RABBITMQ_URL = env('RABBITMQ_URL')

CELERY_BROKER_URL = f'amqp://{RABBITMQ_USER}:{RABBITMQ_PASS}@{RABBITMQ_URL}//'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('POSTGRES_DB'),
        'USER': env('POSTGRES_USER'),
        'PASSWORD': env('POSTGRES_PASSWORD'),
        'HOST': env('POSTGRES_HOST'),
        'PORT': env('POSTGRES_PORT'),
    }
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

CORS_ORIGIN_ALLOW_ALL = True
CSRF_TRUSTED_ORIGINS = env('CSRF_TRUSTED_ORIGINS')

STATIC_URL = '/static/' if DEBUG else '/backendstaticdata/'
STATIC_ROOT = '/static/'
