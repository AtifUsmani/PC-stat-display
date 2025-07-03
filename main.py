from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import psutil
import GPUtil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static assets like CSS/JS separately
app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static")

@app.get("/")
def serve_index():
    return FileResponse(os.path.join("frontend", "build", "index.html"))

@app.get("/stats")
def get_stats():
    cpu = psutil.cpu_percent(interval=1, percpu=True)
    ram = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    gpus = GPUtil.getGPUs()

    gpu_info = {
        "name": gpus[0].name if gpus else "No GPU",
        "load": round(gpus[0].load * 100, 1) if gpus else 0,
        "temperature": gpus[0].temperature if gpus else 0
    }

    stats = {
        "cpu": cpu,
        "ram": {
            "percent": ram.percent,
            "used": ram.used // (1024 ** 2),
            "total": ram.total // (1024 ** 2)
        },
        "disk": {
            "percent": disk.percent,
            "used": disk.used // (1024 ** 3),
            "total": disk.total // (1024 ** 3)
        },
        "gpu": gpu_info
    }

    print("Sending stats:", stats)
    return stats

# Print registered routes
print("Registered routes:")
for route in app.routes:
    print(route.path)
