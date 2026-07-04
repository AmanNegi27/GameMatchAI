"""
API endpoints for retrieving game stores.
"""

from fastapi import APIRouter

from app.services.game_service import get_all_stores

router = APIRouter()


@router.get("/stores")
def fetch_stores():
    """
    Retrieve all game stores available in the database.
    """
    stores = get_all_stores()

    # Convert database rows into a JSON-friendly response.
    result = []

    for store in stores:
        result.append(
            {
                "id": store[0],
                "name": store[1],
            }
        )

    return result