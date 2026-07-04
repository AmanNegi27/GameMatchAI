"""
API endpoints for retrieving game genres.
"""

from fastapi import APIRouter

from app.services.game_service import get_all_genres

router = APIRouter()


@router.get("/genres")
def fetch_genres():
    """
    Returns all available genres in the database.
    """

    genres = get_all_genres()

    result = []
# Convert database rows into a JSON-friendly response.
    for genre in genres:
        result.append({
            "id": genre[0],
            "name": genre[1]
        })

    return result