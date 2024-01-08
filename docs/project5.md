# Project 5 - Age verification with fastAPI


For project 5 the plan was to make an application that where you can upload an image to and than it checks if the person is 18 years or older.

---
The first thing I did was to learn more about `Docker` and how to use it. For that I used this [link](https://www.docker.com/resources/what-container/).
<br>
Than I leaned a bit about how to use `fastAPI` using this [tutorial](https://fastapi.tiangolo.com/tutorial/first-steps/). And I added an endpoint, the code looks like this in Python:
```Python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/hello")
def read_hello():
    return {"message": "Hello!"}
```
I also used this [tutorial](https://medium.com/@alidu143/containerizing-fastapi-app-with-docker-a-comprehensive-guide-416521b2457c) to learn more about fastAPI, but also how to create a dockerfile, an image and a container in Docker.
