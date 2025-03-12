#!/bin/bash

# Exit on error
set -e

# Wait for the database to be ready
sleep 2

# Run Alembic migrations
poetry run alembic -c src/alembic.ini upgrade head

# Start FastAPI application
exec poetry run uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
