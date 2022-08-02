# BACKEND

## Installation

1. Make a copy of .env.example named .env and fill in empty variables.

2. Run the following commands:

```bash
poetry install
poetry run python3 manage.py migrate
poetry run python3 manage.py runserver
```

## Debug

Attached 2 VSCode launch options, both at this point require installing required packages by hand:

* Run server
* Run manage.py script
