"""
Game-related API endpoints.

These routes provide game information for the frontend, including
basic game details and additional data such as genres, platforms,
tags, stores, and screenshots.
"""

from fastapi import APIRouter, HTTPException

from app.services.game_service import (
    get_all_games,
    get_game_by_id,
    get_game_genres,
    get_game_platforms,
    get_game_tags,
    get_game_stores,
    get_game_screenshots,
)

router = APIRouter()


@router.get("/games")
def fetch_games():
    """
    Retrieve all games available in the database.
    """

    games = get_all_games()
    result = []

    # Convert each database record into a format suitable for the API response.
    for game in games:
        result.append(
            {
                "id": game[0],
                "name": game[1],
                "release_date": game[2],
                "rating": float(game[3]) if game[3] is not None else None,
            }
        )

    return result


@router.get("/games/{game_id}")
def fetch_game(game_id: int):
    """
    Retrieve detailed information for a single game.
    """

    # Fetch the game using its unique ID.
    game = get_game_by_id(game_id)

    if game is None:
        raise HTTPException(
            status_code=404,
            detail="Game not found",
        )

    # Combine the main game details with related information.
    return {
        "id": game[0],
        "name": game[1],
        "release_date": game[2],
        "rating": float(game[3]) if game[3] is not None else None,
        "metacritic": game[4],
        "playtime": game[5],
        "background_image": game[6],
        "esrb_rating": game[7],
        "genres": get_game_genres(game_id),
        "platforms": get_game_platforms(game_id),
        "tags": get_game_tags(game_id),
        "stores": get_game_stores(game_id),
        "screenshots": get_game_screenshots(game_id),
    }