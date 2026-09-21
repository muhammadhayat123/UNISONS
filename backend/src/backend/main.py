from pathlib import Path
from dotenv import load_dotenv

# Load .env before anything else — db.py reads DATABASE_URL at import time
_env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=_env_path)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.backend.routes.user_route import user_route

app = FastAPI(title="Form API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(user_route, prefix="/user", tags=["user"])