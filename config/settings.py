from pathlib import Path
import os
from dotenv import load_dotenv
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

# Detect environment
TARGET_ENV = os.getenv('TARGET_ENV', '').lower()
IS_PROD = TARGET_ENV.startswith('prod')

# SECRET_KEY
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')

# Debug mode
DEBUG = os.getenv('DEBUG', '1').lower() in ['true', 't', '1']

# Hosts e CSRF
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '*').split(' ')
trusted_origins = os.getenv('CSRF_TRUSTED_ORIGINS', '')
CSRF_TRUSTED_ORIGINS = [url for url in trusted_origins.split(' ') if url]

# Redirect SSL se configurado
SECURE_SSL_REDIRECT = os.getenv('SECURE_SSL_REDIRECT', '0').lower() in ['true', 't', '1']
if SECURE_SSL_REDIRECT:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Banco de dados
if IS_PROD:
    db_engine = os.getenv('DB_ENGINE', 'django.db.backends.postgresql')
    db_name = os.getenv('DBNAME')
    db_user = os.getenv('DBUSER')
    db_pass = os.getenv('DBPASS')
    db_host = os.getenv('DBHOST')
    db_port = os.getenv('DBPORT', '5432')

    if db_name and db_user and db_pass and db_host:
        DATABASES = {
            'default': {
                'ENGINE': db_engine,
                'NAME': db_name,
                'USER': db_user,
                'PASSWORD': db_pass,
                'HOST': db_host,
                'PORT': db_port,
                'OPTIONS': {'sslmode': 'require'},
            }
        }
    else:
        # fallback pra SQLite se variáveis faltarem
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': BASE_DIR / 'db.sqlite3',
            }
        }
else:
    DEBUG = True
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'article',
    'comments',
    "whitenoise.runserver_nostatic",
    'notifications',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = os.environ.get('DJANGO_STATIC_URL', "/static/")
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_STORAGE = ('whitenoise.storage.CompressedManifestStaticFilesStorage')
STATICFILES_DIRS = [BASE_DIR / 'static']

MEDIA_ROOT = os.path.join(BASE_DIR / 'media')
MEDIA_URL = '/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
