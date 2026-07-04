"""
Load processed JSON data into the PostgreSQL database.

This script imports games and related metadata from the processed
JSON files into their respective database tables.
"""

import json
import sys
from pathlib import Path

# Allow importing backend modules when running this script directly.
PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.append(str(PROJECT_ROOT))

from backend.database.db_connection import get_connection


# Project directories.
PROCESSED_DATA_DIR = (
    PROJECT_ROOT
    / "backend"
    / "data"
    / "processed"
)


def load_json(filename: str):
    """
    Load a processed JSON file from the data directory.
    """

    file_path = PROCESSED_DATA_DIR / filename

    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)


def load_games(cursor):
    """
    Insert game records into the database.
    """

    games = load_json("games.json")

    # Insert each game while skipping records that already exist.
    query = """
        INSERT INTO games
        (
            id,
            name,
            release_date,
            rating,
            metacritic,
            playtime,
            background_image,
            esrb_rating
        )
        VALUES
        (%s,%s,%s,%s,%s,%s,%s,%s)
        ON CONFLICT (id) DO NOTHING;
    """

    for game in games:

        cursor.execute(
            query,
            (
                game["id"],
                game["name"],
                game["release_date"],
                game["rating"],
                game["metacritic"],
                game["playtime"],
                game["background_image"],
                game["esrb_rating"],
            ),
        )

    print(f"Games Loaded : {len(games)}")
    
def load_genres(cursor):
    """
    Insert genre records into the database.
    """

    genres = load_json("genres.json")

    # Insert each genre while skipping existing records.
    query = """
        INSERT INTO genres
        (id, name)
        VALUES
        (%s, %s)
        ON CONFLICT (id) DO NOTHING;
    """

    for genre in genres:

        cursor.execute(
            query,
            (
                genre["id"],
                genre["name"],
            ),
        )

    print(f"Genres Loaded : {len(genres)}")

def load_platforms(cursor):
    """
    Insert platform records into the database.
    """

    platforms = load_json("platforms.json")

    # Insert each platform while skipping existing records.
    query = """
        INSERT INTO platforms
        (id, name)
        VALUES
        (%s, %s)
        ON CONFLICT (id) DO NOTHING;
    """

    for platform in platforms:

        cursor.execute(
            query,
            (
                platform["id"],
                platform["name"],
            ),
        )

    print(f"Platforms Loaded : {len(platforms)}")


def load_tags(cursor):
    """
    Insert tag records into the database.
    """

    tags = load_json("tags.json")

    # Insert each tag while skipping existing records.
    query = """
        INSERT INTO tags
        (id, name)
        VALUES
        (%s, %s)
        ON CONFLICT (id) DO NOTHING;
    """

    for tag in tags:

        cursor.execute(
            query,
            (
                tag["id"],
                tag["name"],
            ),
        )

    print(f"Tags Loaded : {len(tags)}")


def load_stores(cursor):
    """
    Insert store records into the database.
    """

    stores = load_json("stores.json")

    # Insert each store while skipping existing records.
    query = """
        INSERT INTO stores
        (id, name, url)
        VALUES
        (%s, %s, %s)
        ON CONFLICT (id) DO NOTHING;
    """

    for store in stores:

        cursor.execute(
            query,
            (
                store["id"],
                store["name"],
                store["url"],
            ),
        )

    print(f"Stores Loaded : {len(stores)}")
    
def load_game_genres(cursor):
    """
    Insert game and genre relationships into the database.
    """

    relations = load_json("game_genres.json")

    # Insert each game-genre relationship while skipping duplicates.
    query = """
        INSERT INTO game_genres
        (game_id, genre_id)
        VALUES
        (%s, %s)
        ON CONFLICT DO NOTHING;
    """

    for relation in relations:

        cursor.execute(
            query,
            (
                relation["game_id"],
                relation["genre_id"],
            ),
        )

    print(f"Game Genres Loaded : {len(relations)}")

def load_game_platforms(cursor):
    """
    Insert game and platform relationships into the database.
    """

    relations = load_json("game_platforms.json")

    # Insert each game-platform relationship while skipping duplicates.
    query = """
        INSERT INTO game_platforms
        (game_id, platform_id)
        VALUES
        (%s, %s)
        ON CONFLICT DO NOTHING;
    """

    for relation in relations:

        cursor.execute(
            query,
            (
                relation["game_id"],
                relation["platform_id"],
            ),
        )

    print(f"Game Platforms Loaded : {len(relations)}")


def load_game_tags(cursor):
    """
    Insert game and tag relationships into the database.
    """

    relations = load_json("game_tags.json")

    # Insert each game-tag relationship while skipping duplicates.
    query = """
        INSERT INTO game_tags
        (game_id, tag_id)
        VALUES
        (%s, %s)
        ON CONFLICT DO NOTHING;
    """

    for relation in relations:

        cursor.execute(
            query,
            (
                relation["game_id"],
                relation["tag_id"],
            ),
        )

    print(f"Game Tags Loaded : {len(relations)}")


def load_game_stores(cursor):
    """
    Insert game and store relationships into the database.
    """

    relations = load_json("game_stores.json")

    # Insert each game-store relationship while skipping duplicates.
    query = """
        INSERT INTO game_stores
        (game_id, store_id)
        VALUES
        (%s, %s)
        ON CONFLICT DO NOTHING;
    """

    for relation in relations:

        cursor.execute(
            query,
            (
                relation["game_id"],
                relation["store_id"],
            ),
        )

    print(f"Game Stores Loaded : {len(relations)}")


def load_screenshots(cursor):
    """
    Insert game screenshots into the database.
    """

    screenshots = load_json("screenshots.json")

    # Insert each screenshot while skipping existing records.
    query = """
        INSERT INTO screenshots
        (id, game_id, image_url)
        VALUES
        (%s, %s, %s)
        ON CONFLICT (id) DO NOTHING;
    """

    for screenshot in screenshots:

        cursor.execute(
            query,
            (
                screenshot["id"],
                screenshot["game_id"],
                screenshot["image_url"],
            ),
        )

    print(f"Screenshots Loaded : {len(screenshots)}")
    
def main():
    """
    Import all processed JSON data into the database.
    """

    connection = get_connection()
    cursor = connection.cursor()

    try:
        # Import data in an order that maintains table relationships.
        load_games(cursor)

        load_genres(cursor)
        load_platforms(cursor)
        load_tags(cursor)
        load_stores(cursor)

        load_game_genres(cursor)
        load_game_platforms(cursor)
        load_game_tags(cursor)
        load_game_stores(cursor)

        load_screenshots(cursor)

        # Save all changes once every import has completed successfully.
        connection.commit()

        print()
        print("=" * 60)
        print("DATABASE IMPORT COMPLETED SUCCESSFULLY")
        print("=" * 60)

    except Exception as error:
        # Roll back all changes if any step fails.
        connection.rollback()

        print("\nDatabase import failed.")
        print(error)

    finally:
        # Always release database resources.
        cursor.close()
        connection.close()


if __name__ == "__main__":
    main()