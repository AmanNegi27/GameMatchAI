from collections import defaultdict

from database.db_connection import get_connection

from app.services.game_service import (
    get_game_platforms,
    get_game_genres,
    get_game_tags,
    get_game_stores
)


def filter_candidate_games(request):
    """
    Returns games after applying the hard filters.
    """

    connection = get_connection()
    cursor = connection.cursor()

    query = """
        SELECT
            id,
            name,
            release_date,
            rating,
            metacritic,
            playtime,
            background_image
        FROM games
        WHERE rating >= %s
    """

    parameters = [request.minimum_rating]

    if request.release_year is not None:
        query += " AND EXTRACT(YEAR FROM release_date) >= %s"
        parameters.append(request.release_year)

    if request.max_playtime is not None:
        query += " AND playtime <= %s"
        parameters.append(request.max_playtime)

    query += " ORDER BY rating DESC;"

    cursor.execute(query, tuple(parameters))

    games = cursor.fetchall()

    cursor.close()
    connection.close()

    return games


def load_all_metadata():
    """
    Load all genres, platforms, tags and stores
    in a few queries instead of querying for every game.
    """

    connection = get_connection()
    cursor = connection.cursor()

    metadata = {
        "genres": defaultdict(list),
        "platforms": defaultdict(list),
        "tags": defaultdict(list),
        "stores": defaultdict(list)
    }

    # ------------------------
    # Genres
    # ------------------------

    cursor.execute("""
        SELECT
            gg.game_id,
            g.id,
            g.name
        FROM game_genres gg
        JOIN genres g
            ON gg.genre_id = g.id;
    """)

    for game_id, genre_id, genre_name in cursor.fetchall():
        metadata["genres"][game_id].append(
            (genre_id, genre_name)
        )

    # ------------------------
    # Platforms
    # ------------------------

    cursor.execute("""
        SELECT
            gp.game_id,
            p.id,
            p.name
        FROM game_platforms gp
        JOIN platforms p
            ON gp.platform_id = p.id;
    """)

    for game_id, platform_id, platform_name in cursor.fetchall():
        metadata["platforms"][game_id].append(
            (platform_id, platform_name)
        )

    # ------------------------
    # Tags
    # ------------------------

    cursor.execute("""
        SELECT
            gt.game_id,
            t.id,
            t.name
        FROM game_tags gt
        JOIN tags t
            ON gt.tag_id = t.id;
    """)

    for game_id, tag_id, tag_name in cursor.fetchall():
        metadata["tags"][game_id].append(
            (tag_id, tag_name)
        )

    # ------------------------
    # Stores
    # ------------------------

    cursor.execute("""
        SELECT
            gs.game_id,
            s.id,
            s.name
        FROM game_stores gs
        JOIN stores s
            ON gs.store_id = s.id;
    """)

    for game_id, store_id, store_name in cursor.fetchall():
        metadata["stores"][game_id].append(
            (store_id, store_name)
        )

    cursor.close()
    connection.close()

    return metadata

def calculate_match_score(request, all_metadata, game):
    """
    Calculate the recommendation score out of 100.
    """

    game_id = game[0]

    genres = all_metadata["genres"][game_id]
    platforms = all_metadata["platforms"][game_id]
    tags = all_metadata["tags"][game_id]
    stores = all_metadata["stores"][game_id]

    score = 0
    matched_on = []

    # =====================================================
    # Genre (35)
    # =====================================================

    game_genres = {genre[0] for genre in genres}

    matched_genres = game_genres.intersection(set(request.genres))

    if request.genres:

        score += (len(matched_genres) / len(request.genres)) * 35

        for genre in genres:
            if genre[0] in matched_genres:
                matched_on.append(genre[1])

    # =====================================================
    # Platform (20)
    # =====================================================

    game_platforms = {platform[0] for platform in platforms}

    matched_platforms = game_platforms.intersection(set(request.platforms))

    if request.platforms:

        score += (len(matched_platforms) / len(request.platforms)) * 20

        for platform in platforms:
            if platform[0] in matched_platforms:
                matched_on.append(platform[1])

    # =====================================================
    # Tags (25)
    # =====================================================

    game_tags = {tag[0] for tag in tags}

    matched_tags = game_tags.intersection(set(request.tags))

    if request.tags:

        score += (len(matched_tags) / len(request.tags)) * 25

        for tag in tags:
            if tag[0] in matched_tags:
                matched_on.append(tag[1])

    # =====================================================
    # Rating (10)
    # =====================================================

    if (
        request.minimum_rating is None
        or game[3] >= request.minimum_rating
    ):
        score += 10

    # =====================================================
    # Release Year (5)
    # =====================================================

    if request.release_year is not None:

        if (
            game[2] is not None
            and game[2].year >= request.release_year
        ):
            score += 5

    else:

        score += 5

    # =====================================================
    # Playtime (3)
    # =====================================================

    if request.max_playtime is not None:

        if (
            game[5] is not None
            and game[5] <= request.max_playtime
        ):
            score += 3

    else:

        score += 3

    # =====================================================
    # Store (2)
    # =====================================================

    if request.stores:

        game_stores = {store[0] for store in stores}

        matched_store = game_stores.intersection(set(request.stores))

        if matched_store:

            score += 2

            for store in stores:
                if store[0] in matched_store:
                    matched_on.append(store[1])

    else:

        score += 2

    return round(score), matched_on

def recommend_games(request):
    """
    Generate game recommendations based on user preferences.
    """

    candidates = filter_candidate_games(request)

    # Load all metadata once
    all_metadata = load_all_metadata()

    recommendations = []

    for game in candidates:

        game_id = game[0]

        match_score, matched_on = calculate_match_score(
            request,
            all_metadata,
            game
        )

        recommendations.append({

            "id": game_id,

            "name": game[1],

            "background_image": game[6],

            "release_year": (
                game[2].year
                if game[2]
                else None
            ),

            "rating": (
                float(game[3])
                if game[3]
                else 0
            ),

            "genres": [
                genre[1]
                for genre in all_metadata["genres"][game_id]
            ],

            "platforms": [
                platform[1]
                for platform in all_metadata["platforms"][game_id]
            ],

            "tags": [
                tag[1]
                for tag in all_metadata["tags"][game_id][:5]
            ],

            "stores": [
                store[1]
                for store in all_metadata["stores"][game_id]
            ],

            "match_score": match_score,

            "matched_on": matched_on

        })

    recommendations.sort(

        key=lambda game: (
            game["match_score"],
            game["rating"]
        ),

        reverse=True

    )

    return recommendations[:10] 