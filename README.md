# Threat Trends Tracker

<p align="center">
    An open-source, self hostable application gathering cybersecurity events from various sources.
    </br>
    </br>
    <a href="#codeql" alt="CodeQL">
        <img src="https://github.com/ApiusTechnologies/TTT/actions/workflows/codeql-analysis.yml/badge.svg" /></a>
    <a href="#tests" alt="Tests">
        <img src="https://github.com/ApiusTechnologies/TTT/actions/workflows/tests.yml/badge.svg" /></a>
    <a href="#coverage" alt="Coverage">
        <img src="https://img.shields.io/badge/Code%20Coverage-50%25-critical?style=flat" /></a>
</p>

## Live demo

If you want to see how it works, [check this out](https://threattrendstracker.tk/)! (if it doesn't work, server is overloaded)

## Feedback

If you have a suggestion on how we could improve this app, please let us know by creating [an issue](https://github.com/ApiusTechnologies/TTT/issues/new)!

## Supported parsers

* Feedburner RSS (feedburner) <a href="https://feedburner.google.com/"><img style="width:60px;height:40px" src="https://services.google.com/fh/files/misc/feedburner-logo.png"></a>
* Twitter (twitter) <a href="https://twitter.com/"><img style="width:40px;height:40px" src="https://icon.horse/icon/twitter.com"></a>

## Development guides
### Starting the project

To run a local setup, simply make a copy of .env.example, name it .env and run this command to start the containers

```bash
docker-compose up -d --build
```

### Exposed services

| Service                 | Url         |
|-------------------------|-------------|
| Frontend                | :3000/      |
| API                     | :8000/api   |
| Admin UI                | :8000/admin |
| Flower (celery task UI) | :5555       |

### Fetching news manually

Currently available commands are listed in [supported parsers](#supported-parsers) section.

```bash
docker-compose exec backend python3 manage.py <command>
```

### Adding a new source

To add a new source, go to backend admin panel, click on parsers and add an entry to a given model. If you want to change a default list of sources that we use, consider executing thie following command (from the main folder) - it will create a dump of the database that is being reloaded every time an application is restarted

```bash
docker-compose exec backend python3 manage.py dumpdata parsers --natural-foreign > backend/src/parsers/fixtures/initial_sources.json
```

### Adding a new parser

To add a new parser please add a new file in `backend.src.parsers` folder and create a child class of AbstractParser.
* `__init__` must define a list of sources to use
* `_handle` function must fetch the data and save the News, filling in all necessary fields.

In file `models.py`, in the same folder as mentioned above, create a new class that will represent a database entry will all values necessary to fetch a news. This class should derive from SourceBase class.
