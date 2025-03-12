from fastapi import FastAPI

from src.routers import healthcheck

app = FastAPI()

app.include_router(healthcheck.router)
