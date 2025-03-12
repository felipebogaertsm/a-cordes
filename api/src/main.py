from fastapi import FastAPI

app = FastAPI(title="E-Commerce Platform")


@app.get("/health", tags=["Health Check"])
def healthcheck():
    return {"status": "ok", "message": "Service is running"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
