from fastapi import FastAPI, File, UploadFile, Query
from fastapi.responses import HTMLResponse, RedirectResponse
from starlette.staticfiles import StaticFiles
from pathlib import Path
import shutil
import uuid
from typing import List
from PIL import Image
import cv2
import numpy as np

app = FastAPI()

upload_dir = Path("uploads")
upload_dir.mkdir(exist_ok=True)

app.mount("/uploads", StaticFiles(directory=upload_dir), name="uploads")

uploaded_files = {}


def get_dominant_color(image_path):
    image = Image.open(image_path)
    image.thumbnail((100, 100))
    image = image.convert("RGB")
    pixels = list(image.getdata())
    color_count = {}
    for pixel in pixels:
        color_count[pixel] = color_count.get(pixel, 0) + 1
    dominant_color = max(color_count, key=color_count.get)
    return dominant_color


def apply_effect(image_path):
    image = cv2.imread(str(image_path))
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    edges = cv2.Canny(gray, 50, 150, apertureSize=3)

    lines = cv2.HoughLines(edges, 1, np.pi / 180, 100)

    for line in lines:
        rho, theta = line[0]
        a = np.cos(theta)
        b = np.sin(theta)
        x0 = a * rho
        y0 = b * rho
        x1 = int(x0 + 10 * (-b))
        y1 = int(y0 + 10 * (a))
        x2 = int(x0 - 10 * (-b))
        y2 = int(y0 - 10 * (a))

        cv2.line(image, (x1, y1), (x2, y2), (255, 255, 255), 2)

    output_path = upload_dir / f"effect_{image_path.name}"
    cv2.imwrite(str(output_path), image)
    return output_path


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}


@app.post("/uploadfile/", response_class=HTMLResponse)
async def create_upload_file(files: List[UploadFile] = File(...)):
    try:
        for file in files:
            unique_filename = str(uuid.uuid4()) + "_" + file.filename
            file_path = upload_dir / unique_filename
            with file_path.open("wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            uploaded_files[unique_filename] = file.filename

        return RedirectResponse(url="/showfile")
    except Exception as e:
        return {"error": f"An error occurred: {e}"}


@app.get("/showfile", response_class=HTMLResponse, description="View all uploaded images.")
async def show_uploaded_files(remove: str = Query(None, title="Remove Photo"),
                              expand: str = Query(None, title="Expand Photo")):
    if remove:
        if remove == "all":
            uploaded_files.clear()
            for file_to_remove in upload_dir.iterdir():
                file_to_remove.unlink(missing_ok=True)
        else:
            filename_to_remove = uploaded_files.get(remove)
            if filename_to_remove:
                file_to_remove = upload_dir / filename_to_remove
                file_to_remove.unlink(missing_ok=True)
                uploaded_files.pop(remove, None)
        return RedirectResponse(url="/showfile")

    images = []
    for unique_filename, display_filename in uploaded_files.items():
        dominant_color = get_dominant_color(upload_dir / unique_filename)
        hex_color = "#{:02x}{:02x}{:02x}".format(*dominant_color)
        images.append(
            f"""
            <div style="display: inline-block; margin: 10px;">
                <img src="/uploads/{unique_filename}" alt="{display_filename}" style="max-width: 300px; max-height:
                300px; cursor: pointer;"
                     onclick="toggleImageSize(this)">
                <br>
                <span style="color: {hex_color}; font-size: 1vw;">Dominant Color: {hex_color}</span>
                <br>
                <a style="color: red; text-decoration-line: none;" href="/showfile?remove={unique_filename}"
                onmouseover="this.style.color='white'" onmouseout="this.style.color='red'">Remove</a>
                <br>
                <button style="background: none; border: none; font-size: 1vw; cursor: pointer; color: red;"
                        onclick="applyEffect('{unique_filename}')" onmouseover="this.style.color='white'"
                        onmouseout="this.style.color='red'">Apply Effect
                </button>
            </div>
            """
        )

    return f"""
    <html>
        <head>
            <title>Uploaded Images</title>
            <script>
                function toggleImageSize(img) {{
                    if (img.style.maxWidth === '70%') {{
                        img.style.maxWidth = '300px';
                        img.style.maxHeight = '300px';
                    }} else {{
                        img.style.maxWidth = '70%';
                        img.style.maxHeight = '70%';
                    }}
                }}

                function applyEffect(filename) {{
                    window.location.href = `/applyeffect?filename=${{filename}}`;
                }}
            </script>
            <style>
                body {{
                    background: gray;
                    color: white;
                }}
                img {{
                    cursor: pointer;
                }}
                a, button {{
                    color: red;
                    text-decoration-line: none;
                }}
            </style>
        </head>
        <body>
            <h1>Uploaded Images</h1>
            <h2>
                <a href="http://127.0.0.1:8000/docs" style="color: red; text-decoration-line: none;"onmouseover="this.style.color='white'"
                        onmouseout="this.style.color='red'">Docs</a>
                <button style="background: none; border: none; font-size: 1.3vw; cursor: pointer; color: red;"
                        onclick="removeAllImages()" onmouseover="this.style.color='white'"
                        onmouseout="this.style.color='red'">Remove All Images
                </button>
            </h2>
            {''.join(images)}
            <script>
                function removeAllImages() {{
                    if (confirm("Are you sure you want to remove all images?")) {{
                        window.location.href = "/showfile?remove=all";
                    }}
                }}
            </script>
        </body>
    </html>
    """


@app.get("/applyeffect", response_class=HTMLResponse, description="Apply effect to an image.")
async def apply_effect_endpoint(filename: str):
    try:
        image_path = upload_dir / filename
        output_path = apply_effect(image_path)
        return HTMLResponse(content=f"""
        <html>
            <head>
                <title>Effect Applied</title>
                <style>
                    body {{
                        background: gray;
                        color: white;
                    }}
                    h1 {{
                        text-align: center;
                        padding: 50px;
                    }}
                    a {{
                        color: red;
                        text-decoration-line: none;
                    }}
                </style>
            </head>
            <body>
                <h1>Effect Applied Successfully</h1>
                <a href="/showfile">Back to Images</a>
                <br>
                <img src="/uploads/{output_path.name}" alt="Effect Applied" style="max-width: 70%;">
            </body>
        </html>
        """)
    except Exception as e:
        return HTMLResponse(content=f"""
        <html>
            <head>
                <title>Error</title>
                <style>
                    body {{
                        background: gray;
                        color: white;
                    }}
                    h1 {{
                        text-align: center;
                        padding: 50px;
                    }}
                    a {{
                        color: red;
                        text-decoration-line: none;
                    }}
                </style>
            </head>
            <body>
                <h1>Error Applying Effect: {e}</h1>
                <a href="/showfile">Back to Images</a>
            </body>
        </html>
        """)
