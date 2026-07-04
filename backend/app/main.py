from fastapi import FastAPI

from app.api.games import router as games_router
from app.api.genres import router as genres_router
from app.api.platforms import router as platforms_router
from app.api.tags import router as tags_router
from app.api.stores import router as stores_router
from app.api.recommend import router as recommend_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="GameMatch API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(games_router)
app.include_router(genres_router)
app.include_router(platforms_router)
app.include_router(tags_router)
app.include_router(stores_router)
app.include_router(recommend_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to GameMatch API!"
    }
