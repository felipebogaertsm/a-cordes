FROM python:3.13

WORKDIR /usr/app

RUN apt-get update && apt-get install -y \
    libpq-dev gcc build-essential python3-dev

RUN pip install poetry

COPY pyproject.toml poetry.lock /usr/app/
RUN poetry config virtualenvs.create false
RUN poetry install --no-root

COPY . /usr/app

RUN useradd -m appuser && chown -R appuser:appuser /usr/app
RUN chmod +x /usr/app/entrypoint.sh && chown appuser:appuser /usr/app/entrypoint.sh
USER appuser

ENV PYTHONUNBUFFERED=1

EXPOSE 8000

ENTRYPOINT ["/bin/bash", "/usr/app/entrypoint.sh"]
