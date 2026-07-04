from collections import defaultdict

from database.db_connection import get_connection

from app.services.game_service import (
    get_game_platforms,
    get_game_genres,
    get_game_tags,
    get_game_stores,
)


def filter_candidate_games(request):
    """
    This function helps narrow down games based on certain criteria.
    """

    connection = get_connection()
    cursor = connection.cursor()

    # Start building the SQL query to select games.
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

    # The minimum rating is always a required filter.
    parameters = [request.minimum_rating]

    # If a release year is specified, add it to the query.
    if request.release_year is not None:
        query += " AND EXTRACT(YEAR FROM release_date) >= %s"
        parameters.append(request.release_year)

    # If a maximum playtime is specified, add it to the query.
    if request.max_playtime is not None:
        query += " AND playtime <= %s"
        parameters.append(request.max_playtime)

    # Order the results by rating in descending order.
    query += " ORDER BY rating DESC;"

    # Execute the query with the parameters.
    cursor.execute(query, tuple(parameters))

    # Fetch all the game records that match the criteria.
    games = cursor.fetchall()

    # Close the database resources.
    cursor.close()
    connection.close()

    return games

def load_all_metadata():
    """
    This function efficiently loads all game-related metadata like genres,
    platforms, tags, and stores using just a few database queries, avoiding
    repeated queries for each individual game.
    """

    connection = get_connection()
    cursor = connection.cursor()

    # Initialize a dictionary to hold the metadata, using defaultdict for convenience.
    metadata = {
        "genres": defaultdict(list),
        "platforms": defaultdict(list),
        "tags": defaultdict(list),
        "stores": defaultdict(list),
    }

    # Load Genres: Fetch game IDs, genre IDs, and genre names.
    cursor.execute("""
        SELECT
            gg.game_id,
            g.id,
            g.name
        FROM game_genres gg
        JOIN genres g
            ON gg.genre_id = g.id;
    """)

    # Populate the genres section of the metadata dictionary.
    for game_id, genre_id, genre_name in cursor.fetchall():
        metadata["genres"][game_id].append(
            (genre_id, genre_name)
        )

    # Load Platforms: Fetch game IDs, platform IDs, and platform names.
    cursor.execute("""
        SELECT
            gp.game_id,
            p.id,
            p.name
        FROM game_platforms gp
        JOIN platforms p
            ON gp.platform_id = p.id;
    """)

    # Populate the platforms section of the metadata dictionary.
    for game_id, platform_id, platform_name in cursor.fetchall():
        metadata["platforms"][game_id].append(
            (platform_id, platform_name)
        )

    # Load Tags: Fetch game IDs, tag IDs, and tag names.
    cursor.execute("""
        SELECT
            gt.game_id,
            t.id,
            t.name
        FROM game_tags gt
        JOIN tags t
            ON gt.tag_id = t.id;
    """)

    # Populate the tags section of the metadata dictionary.
    for game_id, tag_id, tag_name in cursor.fetchall():
        metadata["tags"][game_id].append(
            (tag_id, tag_name)
        )

    # Load Stores: Fetch game IDs, store IDs, and store names.
    cursor.execute("""
        SELECT
            gs.game_id,
            s.id,
            s.name
        FROM game_stores gs
        JOIN stores s
            ON gs.store_id = s.id;
    """)

    # Populate the stores section of the metadata dictionary.
    for game_id, store_id, store_name in cursor.fetchall():
        metadata["stores"][game_id].append(
            (store_id, store_name)
        )

    # Close the cursor and database connection.
    cursor.close()
    connection.close()

    return metadata

def calculate_match_score(request, all_metadata, game):
    """
    Calculates a recommendation score for a game, aiming for a total of 100 points.
    """

    game_id = game[0]  # Get the ID of the current game.

    # Retrieve metadata for the current game from the pre-loaded data.
    genres = all_metadata["genres"][game_id]
    platforms = all_metadata["platforms"][game_id]
    tags = all_metadata["tags"][game_id]
    stores = all_metadata["stores"][game_id]

    score = 0  # Initialize the score.
    matched_on = []  # Keep track of what matched for the recommendation.

    # Genre Scoring (worth 35 points)
    game_genres = {genre[0] for genre in genres}  # Get a set of genre IDs for the game.

    # Find which of the user's preferred genres match the game's genres.
    matched_genres = game_genres.intersection(set(request.genres))

    if request.genres:
        # Calculate score based on the proportion of matched genres.
        score += (len(matched_genres) / len(request.genres)) * 35

        # Add the names of matched genres to the 'matched_on' list.
        for genre in genres:
            if genre[0] in matched_genres:
                matched_on.append(genre[1])

    # Platform Scoring (worth 25 points)
    game_platforms = {platform[0] for platform in platforms}  # Get a set of platform IDs.

    # Find which of the user's preferred platforms match the game's platforms.
    matched_platforms = game_platforms.intersection(set(request.platforms))

    if request.platforms:
        # Calculate score based on the proportion of matched platforms.
        score += (len(matched_platforms) / len(request.platforms)) * 25

        # Add the names of matched platforms to the 'matched_on' list.
        for platform in platforms:
            if platform[0] in matched_platforms:
                matched_on.append(platform[1])

    # Tag Scoring (worth 20 points)
    game_tags = {tag[0] for tag in tags}  # Get a set of tag IDs.

    # Find which of the user's preferred tags match the game's tags.
    matched_tags = game_tags.intersection(set(request.tags))

    if request.tags:
        # Calculate score based on the proportion of matched tags.
        score += (len(matched_tags) / len(request.tags)) * 20

        # Add the names of matched tags to the 'matched_on' list.
        for tag in tags:
            if tag[0] in matched_tags:
                matched_on.append(tag[1])

    # Rating Score (worth 5 points)
    # Award points if no minimum rating is set or if the game meets the minimum rating.
    if (
        request.minimum_rating is None
        or game[3] >= request.minimum_rating
    ):
        score += 5

    # Release Year Score (worth 5 points)
    if request.release_year is not None:
        # Award points if the game's release date is valid and meets the preferred year.
        if (
            game[2] is not None
            and game[2].year >= request.release_year
        ):
            score += 5
    else:
        # Award full points if no release year preference is provided.
        score += 5

    # Playtime Score (worth 3 points)
    if request.max_playtime is not None:
        # Award points if the game's playtime is within the preferred limit.
        if (
            game[5] is not None
            and game[5] <= request.max_playtime
        ):
            score += 3
    else:
        # Award full points if no maximum playtime is provided.
        score += 3

    # Store Scoring (worth 7 points)
    if request.stores:
        game_stores = {store[0] for store in stores}  # Get a set of store IDs.

        # Find which of the user's preferred stores match the game's stores.
        matched_store = game_stores.intersection(set(request.stores))

        if matched_store:
            score += 7

            # Add the names of matched stores to the 'matched_on' list.
            for store in stores:
                if store[0] in matched_store:
                    matched_on.append(store[1])
    else:
        # Award full points if no preferred stores are provided.
        score += 7

    # Return the final rounded score and the list of matched preferences.
    return round(score), matched_on

def recommend_games(request):
    """
    This function generates game recommendations by first filtering potential
    games and then calculating a match score for each based on user preferences.
    """

    # Get a list of games that pass the initial hard filters.
    candidates = filter_candidate_games(request)

    # Load all necessary metadata from the database just once to be efficient.
    all_metadata = load_all_metadata()

    recommendations = []  # Initialize a list to store the final recommendations.

    # Iterate through each candidate game to calculate its recommendation score.
    for game in candidates:

        game_id = game[0]  # Get the game's ID.

        # Calculate the match score and details of what matched for this game.
        match_score, matched_on = calculate_match_score(
            request,
            all_metadata,
            game
        )

        # Structure the game data for the final recommendation list.
        recommendations.append({

            "id": game_id,  # Game ID.

            "name": game[1],  # Game name.

            "background_image": game[6],  # URL for the game's background image.

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

            # Get the names of the game's genres.
            "genres": [
                genre[1]
                for genre in all_metadata["genres"][game_id]
            ],

            # Get the names of the game's platforms.
            "platforms": [
                platform[1]
                for platform in all_metadata["platforms"][game_id]
            ],

            # Get the names of the game's top 5 tags.
            "tags": [
                tag[1]
                for tag in all_metadata["tags"][game_id][:5]
            ],

            # Get the names of the game's stores.
            "stores": [
                store[1]
                for store in all_metadata["stores"][game_id]
            ],

            "match_score": match_score,

            "matched_on": matched_on,

        })

    # Sort recommendations by match score and use rating as a tie-breaker.
    recommendations.sort(

        key=lambda game: (
            game["match_score"],
            game["rating"]
        ),

        reverse=True

    )

    # Return only the top 10 recommendations.
    return recommendations[:20]