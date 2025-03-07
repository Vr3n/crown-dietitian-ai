from fastapi import FastAPI

from app.customers.routes import router as customer_router


app = FastAPI()

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
