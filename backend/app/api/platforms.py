"""
API endpoints for retrieving game platforms.
"""

from fastapi import APIRouter

from app.services.game_service import get_all_platforms

router = APIRouter()


@router.get("/platforms")
def fetch_platforms():
    """
    Retrieve all gaming platforms available in the database.
    """

    platforms = get_all_platforms()
# Convert database rows into a JSON-friendly response.
    result = []

    for platform in platforms:
        result.append({
            "id": platform[0],
            "name": platform[1]
        })

    return result