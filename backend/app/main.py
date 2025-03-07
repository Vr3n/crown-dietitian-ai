from fastapi import FastAPI


app = FastAPI()


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
