# Threat Trends Tracker



<p align="center">
    Application gathering cybersecurity events from various sources
    </br>
    </br>
    <a href="#codeql" alt="CodeQL">
        <img src="https://github.com/ApiusTechnologies/TTT/actions/workflows/codeql-analysis.yml/badge.svg" /></a>
    <a href="#tests" alt="Tests">
        <img src="https://github.com/ApiusTechnologies/TTT/actions/workflows/tests.yml/badge.svg" /></a>
    <a href="#coverage" alt="Coverage">
        <img src="https://img.shields.io/badge/Code%20Coverage-50%25-critical?style=flat" /></a>
</p>

## Exposed services

| Service                 | Url         |
|-------------------------|-------------|
| Frontend                | :3000/      |
| API                     | :8000/api   |
| Admin UI                | :8000/admin |
| Flower (celery task UI) | :5555       |

## Development guides
### Starting the project

To run a local setup, simply make a copy of .env.example, name it .env and run this command to start the containers

```bash
docker-compose up -d --build
```

### Fetching news manually

Currently available commands: 
* parseRSS
* scrapTweets

```bash
docker-compose exec backend python3 manage.py <command>
```

### Replacing initial data sources

In case you want to change initial source configuration, do the following:

1. Add sources to your local database (for example through an admin UI)
2. Execute the following command from the main project folder

```bash
docker-compose exec backend python3 manage.py dumpdata parsers > backend/src/parsers/fixtures/initial_sources.json
```
