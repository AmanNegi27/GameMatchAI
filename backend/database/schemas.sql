-- GameMatch AI Database Schema
-- PostgreSQL

-- Optional: Remove existing tables before recreating the schema.
-- Comment out these statements if you want to keep the existing data.

DROP TABLE IF EXISTS screenshots CASCADE;
DROP TABLE IF EXISTS game_stores CASCADE;
DROP TABLE IF EXISTS stores CASCADE;
DROP TABLE IF EXISTS game_tags CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS game_platforms CASCADE;
DROP TABLE IF EXISTS platforms CASCADE;
DROP TABLE IF EXISTS game_genres CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS games CASCADE;


-- Main table that stores game information.
CREATE TABLE games (

    id INTEGER PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    release_date DATE,

    rating DECIMAL(2,1),

    metacritic INTEGER,

    playtime INTEGER,

    background_image TEXT,

    esrb_rating VARCHAR(30)

);


-- Stores all unique game genres.
CREATE TABLE genres (

    id INTEGER PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE

);


-- Stores all supported gaming platforms.
CREATE TABLE platforms (

    id INTEGER PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE

);


-- Stores gameplay tags used by the recommendation system.
CREATE TABLE tags (

    id INTEGER PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE

);


-- Stores digital game stores and their URLs.
CREATE TABLE stores (

    id INTEGER PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    url TEXT

);

-- Maps games to their genres (many-to-many relationship).
CREATE TABLE game_genres (

    game_id INTEGER NOT NULL,

    genre_id INTEGER NOT NULL,

    PRIMARY KEY (game_id, genre_id),

    FOREIGN KEY (game_id)
        REFERENCES games(id)
        ON DELETE CASCADE,

    FOREIGN KEY (genre_id)
        REFERENCES genres(id)
        ON DELETE CASCADE

);


-- Maps games to their supported platforms (many-to-many relationship).
CREATE TABLE game_platforms (

    game_id INTEGER NOT NULL,

    platform_id INTEGER NOT NULL,

    PRIMARY KEY (game_id, platform_id),

    FOREIGN KEY (game_id)
        REFERENCES games(id)
        ON DELETE CASCADE,

    FOREIGN KEY (platform_id)
        REFERENCES platforms(id)
        ON DELETE CASCADE

);


-- Maps games to their gameplay tags (many-to-many relationship).
CREATE TABLE game_tags (

    game_id INTEGER NOT NULL,

    tag_id INTEGER NOT NULL,

    PRIMARY KEY (game_id, tag_id),

    FOREIGN KEY (game_id)
        REFERENCES games(id)
        ON DELETE CASCADE,

    FOREIGN KEY (tag_id)
        REFERENCES tags(id)
        ON DELETE CASCADE

);


-- Maps games to the stores where they are available (many-to-many relationship).
CREATE TABLE game_stores (

    game_id INTEGER NOT NULL,

    store_id INTEGER NOT NULL,

    PRIMARY KEY (game_id, store_id),

    FOREIGN KEY (game_id)
        REFERENCES games(id)
        ON DELETE CASCADE,

    FOREIGN KEY (store_id)
        REFERENCES stores(id)
        ON DELETE CASCADE

);


-- Stores screenshots associated with each game.
CREATE TABLE screenshots (

    id SERIAL PRIMARY KEY,

    game_id INTEGER NOT NULL,

    image_url TEXT NOT NULL,

    FOREIGN KEY (game_id)
        REFERENCES games(id)
        ON DELETE CASCADE

);