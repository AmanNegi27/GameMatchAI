from database.db_connection import get_connection


def get_all_games():
    """
    Fetch all games from the database.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            name,
            release_date,
            rating
        FROM games
        ORDER BY name;
    """)

    games = cursor.fetchall()

    cursor.close()
    connection.close()

    return games

def get_game_by_id(game_id):
    """
    Fetch a single game by its ID.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            name,
            release_date,
            rating,
            metacritic,
            playtime,
            background_image,
            esrb_rating
        FROM games
        WHERE id = %s;
    """, (game_id,))

    game = cursor.fetchone()

    cursor.close()
    connection.close()

    return game

def get_game_genres(game_id):
    """
    Fetch all genres for a game.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT g.name
        FROM genres g
        JOIN game_genres gg
            ON g.id = gg.genre_id
        WHERE gg.game_id = %s
        ORDER BY g.name;
    """, (game_id,))

    genres = [row[0] for row in cursor.fetchall()]

    cursor.close()
    connection.close()

    return genres

def get_game_platforms(game_id):
    """
    Fetch all platforms for a game.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT p.name
        FROM platforms p
        JOIN game_platforms gp
            ON p.id = gp.platform_id
        WHERE gp.game_id = %s
        ORDER BY p.name;
    """, (game_id,))

    platforms = [row[0] for row in cursor.fetchall()]

    cursor.close()
    connection.close()

    return platforms

def get_game_tags(game_id):
    """
    Fetch all tags for a game.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT t.name
        FROM tags t
        JOIN game_tags gt
            ON t.id = gt.tag_id
        WHERE gt.game_id = %s
        ORDER BY t.name;
    """, (game_id,))

    tags = [row[0] for row in cursor.fetchall()]

    cursor.close()
    connection.close()

    return tags

def get_game_stores(game_id):
    """
    Fetch all stores for a game.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT s.name
        FROM stores s
        JOIN game_stores gs
            ON s.id = gs.store_id
        WHERE gs.game_id = %s
        ORDER BY s.name;
    """, (game_id,))

    stores = [row[0] for row in cursor.fetchall()]

    cursor.close()
    connection.close()

    return stores

def get_game_screenshots(game_id):
    """
    Fetch all screenshots for a game.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT image_url
        FROM screenshots
        WHERE game_id = %s
        ORDER BY id;
    """, (game_id,))

    screenshots = [row[0] for row in cursor.fetchall()]

    cursor.close()
    connection.close()

    return screenshots

def get_all_genres():
    """
    Fetch all genres from the database.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            name
        FROM genres
        ORDER BY name;
    """)

    genres = cursor.fetchall()

    cursor.close()
    connection.close()

    return genres

def get_all_platforms():
    """
    Fetch all platforms from the database.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            name
        FROM platforms
        ORDER BY name;
    """)

    platforms = cursor.fetchall()

    cursor.close()
    connection.close()

    return platforms

def get_all_tags():
    """
    Fetch all tags from the database.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            name
        FROM tags
        ORDER BY name;
    """)

    tags = cursor.fetchall()

    cursor.close()
    connection.close()

    return tags

def get_all_stores():
    """
    Fetch all stores from the database.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            name
        FROM stores
        ORDER BY name;
    """)

    stores = cursor.fetchall()

    cursor.close()
    connection.close()

    return stores