from fastapi import APIRouter

router = APIRouter(prefix="/api/health", tags=["Health"])


@router.get("/")
def healthcheck():
    return {"status": "ok", "message": "Service is healthy"}
