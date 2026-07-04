"""
API endpoints for retrieving game tags.
"""

from fastapi import APIRouter

from app.services.game_service import get_all_tags

router = APIRouter()


@router.get("/tags")
def fetch_tags():
    """
    Retrieve all game tags available in the database.
    """

    tags = get_all_tags()
    result = []

    # Convert database records into a JSON-friendly response.
    for tag in tags:
        result.append(
            {
                "id": tag[0],
                "name": tag[1],
            }
        )

    return result