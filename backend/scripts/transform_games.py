"""
Transform the raw RAWG API response into structured JSON files
that can be imported into the database.
"""

import json
from pathlib import Path


# Project directories.
PROJECT_ROOT = Path(__file__).resolve().parents[2]

RAW_DATA_FILE = (
    PROJECT_ROOT
    / "backend"
    / "data"
    / "raw"
    / "sample_games.json"
)

PROCESSED_DATA_DIR = (
    PROJECT_ROOT
    / "backend"
    / "data"
    / "processed"
)

# Create the processed data folder if it doesn't already exist.
PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)


# Load the raw game data downloaded from the RAWG API.
with open(RAW_DATA_FILE, "r", encoding="utf-8") as file:
    raw_data = json.load(file)

games = raw_data["results"]

print("=" * 60)
print("RAWG DATA LOADED")
print("=" * 60)
print(f"Games Found : {len(games)}")


def extract_games(games: list) -> list:
    """
    Extract the main game information needed for the database.
    """

    extracted_games = []

    for game in games:

        extracted_games.append(
            {
                "id": game["id"],
                "name": game["name"],
                "release_date": game["released"],
                "rating": game["rating"],
                "metacritic": game["metacritic"],
                "playtime": game["playtime"],
                "background_image": game["background_image"],

                # Some games do not have an ESRB rating.
                "esrb_rating": (
                    game["esrb_rating"]["name"]
                    if game["esrb_rating"]
                    else None
                ),
            }
        )

    return extracted_games

def extract_genres(games: list) -> tuple[list, list]:
    """
    Extract unique genres and map them to their respective games.
    """

    genres = {}
    game_genres = []

    for game in games:

        game_id = game["id"]

        for genre in game.get("genres", []):

            genre_id = genre["id"]

            # Store each genre only once.
            if genre_id not in genres:

                genres[genre_id] = {
                    "id": genre_id,
                    "name": genre["name"],
                }

            # Create the relationship between the game and the genre.
            game_genres.append(
                {
                    "game_id": game_id,
                    "genre_id": genre_id,
                }
            )

    return list(genres.values()), game_genres


def extract_platforms(games: list) -> tuple[list, list]:
    """
    Extract unique platforms and map them to their respective games.
    """

    platforms = {}
    game_platforms = []

    for game in games:

        game_id = game["id"]

        for platform in game.get("platforms", []):

            platform_info = platform["platform"]
            platform_id = platform_info["id"]

            # Store each platform only once.
            if platform_id not in platforms:

                platforms[platform_id] = {
                    "id": platform_id,
                    "name": platform_info["name"],
                }

            # Create the relationship between the game and the platform.
            game_platforms.append(
                {
                    "game_id": game_id,
                    "platform_id": platform_id,
                }
            )

    return list(platforms.values()), game_platforms

def extract_tags(games: list) -> tuple[list, list]:
    """
    Extract unique tags and map them to their respective games.
    """

    tags = {}
    game_tags = []

    for game in games:

        game_id = game["id"]

        for tag in game.get("tags", []):

            tag_id = tag["id"]

            # Store each tag only once.
            if tag_id not in tags:

                tags[tag_id] = {
                    "id": tag_id,
                    "name": tag["name"],
                }

            # Create the relationship between the game and the tag.
            game_tags.append(
                {
                    "game_id": game_id,
                    "tag_id": tag_id,
                }
            )

    return list(tags.values()), game_tags


def extract_stores(games: list) -> tuple[list, list]:
    """
    Extract unique stores and map them to their respective games.
    """

    stores = {}
    game_stores = []

    for game in games:

        game_id = game["id"]

        for store in game.get("stores", []):

            store_info = store["store"]
            store_id = store_info["id"]

            # Store each store only once.
            if store_id not in stores:

                stores[store_id] = {
                    "id": store_id,
                    "name": store_info["name"],
                    "url": store.get("url"),
                }

            # Create the relationship between the game and the store.
            game_stores.append(
                {
                    "game_id": game_id,
                    "store_id": store_id,
                }
            )

    return list(stores.values()), game_stores


def extract_screenshots(games: list) -> list:
    """
    Extract screenshots associated with each game.
    """

    screenshots = []
    screenshot_id = 1

    for game in games:

        game_id = game["id"]

        for screenshot in game.get("short_screenshots", []):

            screenshots.append(
                {
                    "id": screenshot_id,
                    "game_id": game_id,
                    "image_url": screenshot["image"],
                }
            )

            # Generate a unique ID for the next screenshot.
            screenshot_id += 1

    return screenshots

def save_json(filename: str, data: list) -> None:
    """
    Save the extracted data as a formatted JSON file.
    """

    output_file = PROCESSED_DATA_DIR / filename

    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

    print(f"Saved: {filename}")


# Extract data from the RAWG response.
games_data = extract_games(games)

genres_data, game_genres_data = extract_genres(games)

platforms_data, game_platforms_data = extract_platforms(games)

tags_data, game_tags_data = extract_tags(games)

stores_data, game_stores_data = extract_stores(games)

screenshots_data = extract_screenshots(games)


# Save each dataset as a separate JSON file.
save_json("games.json", games_data)

save_json("genres.json", genres_data)
save_json("game_genres.json", game_genres_data)

save_json("platforms.json", platforms_data)
save_json("game_platforms.json", game_platforms_data)

save_json("tags.json", tags_data)
save_json("game_tags.json", game_tags_data)

save_json("stores.json", stores_data)
save_json("game_stores.json", game_stores_data)

save_json("screenshots.json", screenshots_data)


print()
print("=" * 60)
print("TRANSFORMATION COMPLETED")
print("=" * 60)

# Display a summary of the extracted data.
print(f"Games              : {len(games_data)}")

print(f"Genres             : {len(genres_data)}")
print(f"Game Genres        : {len(game_genres_data)}")

print(f"Platforms          : {len(platforms_data)}")
print(f"Game Platforms     : {len(game_platforms_data)}")

print(f"Tags               : {len(tags_data)}")
print(f"Game Tags          : {len(game_tags_data)}")

print(f"Stores             : {len(stores_data)}")
print(f"Game Stores        : {len(game_stores_data)}")

print(f"Screenshots        : {len(screenshots_data)}")