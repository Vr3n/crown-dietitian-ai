from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.customers.routes import router as customer_router

origins = [
    "http://localhost:3001"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=["*"]
)

app.include_router(customer_router)


@app.get("/")
def root():
    return {
        "message": "Hello, Friend!",
    }


@app.get("/{name}")
def read_name(name: str):
    return {
        "message": f"Hello, {name}",
    }
