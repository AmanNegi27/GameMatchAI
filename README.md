# GameMatch AI

A video game recommendation engine to help users find games according to their preferences through a specially designed weighted recommendation algorithm. The project serves as an illustration of full-stack software engineering by incorporating elements of data engineering, backend API engineering, databases, frontend engineering, and containerization.

## Table of Contents

- [Introduction](#introduction-of-project)
- [Why I Chose This Project](#why-i-chose-this-project)
- [What Makes This Project Special?](#what-makes-this-project-special)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [ETL Pipeline](#etl-pipeline)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Recommendation Engine](#recommendation-engine)
- [Match Score Calculation](#match-score-calculation)
- [Frontend Architecture](#frontend-architecture)
- [Docker Architecture](#docker-architecture)
- [Future Scope](#future-scope)
- [Data Source](#data-source)
- [Acknowledgements](#acknowledgements)
- [AI Assistance Declaration](#ai-assistance-declaration)
- [Additional Documentation](#additional-documentation)
- [Cross-Platform Testing](#cross-platform-testing)
## Introduction of Project

GameMatch AI is a full stack web application that recommends video games according to preferences such as genre, platform, tags, store, rating, release year, and average playtime of the user. As opposed to returning a straightforward list of games, this application takes into account multiple criteria chosen by the user via a weighted recommendation algorithm.

The project adheres to the data pipeline process fully. Game data is first gathered via the RAWG Video Games Database API by using the ETL process (Extract, Transform, Load). Following the cleaning and transformation process, the data is saved into a normalized PostgreSQL database. The FastAPI backend fetches data directly from the PostgreSQL during the runtime, computes recommendation request and sends its response to the React frontend application.

In addition to developing a recommendation engine, this project showcases several software engineering principles in practice such as REST API development, database normalization, modularity of applications, Dockerized deployment, and frontend components.


## Why I Chose This Project?

Nowadays video games is the number 1 form of entertainment for every generation from the very young to the older. With thousands of games for many different genres and platforms, you as player, can be overwhelmed with choices and the time to choose a game can last hours by surfing through reviews, recommendations or the stores’ websites. Inspired by the recommendation system for Netflix or Spotify, I want to build a recommender system for video games that suggests a game based on user's preferences for certain genres, platforms, tags, ratings, release year, playtime or stores where games can be found. I also want to go beyond the typical CRUD project by creating a fully functional application and have the opportunity to practice all the aspects from data preparation using ETL processes to building RESTful APIs with FastAPI, creating a React responsive front-end and storing data on a PostgreSQL database, all of it deployed via Docker.


## What makes this project special?

Unlike most other game recommendation websites that rely solely on the “top popular” list or need the user to fill in the endless pages of questionnaire to start giving some recommendations, GameMatch AI aims at offering a simple, personalized and human-friendly game recommendation system. The mission here was to deliver quick, smart and personalized recommendation of games in a way which makes the entire game discovery experience efficient and enjoyable for everyone.

The following are some features that differentiate this project:

### 1. Personalized recommendations

Instead of recommending same bunch of popular games to everyone, GameMatch AI provides individualized recommendations based on various preferences such as genres, platforms, tags, rating, release year, playtime, stores selected by the user. This ensure that different users get different recommendations even when some of their selections are same.

### 2. Simple and user-friendly interface
Majority of recommendation platforms prompt users to answer several pages of questionnaires or work with a very complex interface before giving any recommendations. However, GameMatch AI reduces complexity to a great extent, letting user select only preferences they care about and see the results in seconds.

### 3. Transparent recommendation algorithm

GameMatch AI uses its custom weighted scoring based on the user's preferences and their predefined weights. So unlike black-box recommendation algorithms, you can clearly understand why a particular recommendation is being suggested to you.

### 4. Free from external APIs during runtime

While the game information is extracted and transformed using the RAWG API using ETL process initially, the application works fully based on the local PostgreSQL database, which helps in removing dependencies on the external sources, avoiding rate limits and delivering recommendations very fast.

### 5. End-to-end Full-Stack Software Engineering Project

This is not a project with just a front-end or back-end APIs but a full-stack implementation of a web application starting from data collection (ETL), storing data into a database, creating a RESTful API using FastAPI and finally building a client-side interface using React and deploying it using Docker.

### 6. Modular and scalable architecture

The project follows modular architecture design with separate components for ETL process, database, backend services, APIs, and front-end. This improves maintainability and makes it easy to scale the application in future to include more functionalities.

### 7. Real-world Engineering practices

The project implements the standard software engineering practices, such as database normalization, reusable React components, service based backend architecture, deployment using Docker, environment variables handling, version control with Git and much more.

---
## Key Features

### Personalized game recommendations

* Find game suggestions that match your individual taste.
* A weighted algorithm is used to rank recommendations by score.
* For each game, you can see a match score percentage.

### Smart Preference-Based Filtering

* Search for games by any genre.
* Pick your favored game platforms.
* Filter games by your chosen game tag.
* Look for games in specified stores.
* Filter out games below a specific user rating.
* Only find games released in a specific year and after.
* Filter out games based on recommended gameplay time.

### Detailed Recommendation Cards

Each game listed includes:

* Cover image.
* Recommendation match score.
* Average user rating.
* Release year.
* genres.
* Supported Platforms.
* Tags.
* Stores where the game can be bought.
* Matched user preferences.

### Modern User Experience

* A clear and easy-to-use interface.
* Responsive layout, adapts well to most screen sizes.
* Filters neatly collapse into accordion style panels.
* Interactive sliders help to quickly set your criteria for rating, year, and playtime.
* One click game recommendations!

### Fast Recommendation Results

* Discover games in seconds, just based on your selection of preferences.
* You don't need to answer long questions, or have an account.
* Simple workflow for instant game discovery.

##  Technology Stack

The following technologies were used to build **GameMatch AI**. Each technology was selected based on the project's functional and architectural requirements.

| Technology | Purpose | Justification for Choosing It |
|------------|---------|-------------------------------|
| **Python** | Backend Development & ETL Pipeline | Simple yet powerful programming language widely used for backend development, automation, and data processing. |
| **FastAPI** | REST API Development | High-performance web framework with automatic API documentation, type validation, and excellent support for building scalable REST APIs. |
| **React + Vite** | Frontend Development | Component-based frontend framework with Vite providing fast development, hot module replacement, and optimized production builds. |
| **Tailwind CSS** | User Interface Styling | Utility-first CSS framework that enables rapid development of responsive and modern user interfaces. |
| **PostgreSQL** | Database | Robust open-source relational database well suited for normalized data structures, complex SQL queries, and reliable data management. |
| **RAWG Video Games API** | Data Source | Provides comprehensive video game data used by the ETL pipeline to populate the application's PostgreSQL database. |
| **Docker** | Containerization | Ensures a consistent and isolated runtime environment, making the application portable across different systems. |
| **Docker Compose** | Container Orchestration | Manages and coordinates the frontend, backend, and PostgreSQL containers through a single configuration file. |
| **Axios** | API Communication | Simplifies HTTP requests between the React frontend and FastAPI backend for efficient client-server communication. |

##  System Architecture

The GameMatch AI application follows a layered architecture where each component has a specific responsibility. Game data is first collected from the RAWG Video Games Database API through an ETL pipeline, processed and stored in a PostgreSQL database. During runtime, the FastAPI backend retrieves data from the database, processes user preferences using the recommendation engine, and returns personalized recommendations to the React frontend.

The following diagram illustrates the overall system architecture:

```text
                    RAWG API
                        │
                        ▼
          ETL Pipeline (Python Scripts)
             (Fetch → Transform → Load)
                        │
                        ▼
              PostgreSQL Database
                        │
                  SQL Queries
                        │
                        ▼
               FastAPI REST API
                        │
                JSON Responses
                        │
                        ▼
            React + Vite Frontend
                        │
                        ▼
                     End User
```

### Architecture Workflow

1. **Data Collection** – Video game information is fetched from the RAWG Video Games Database API using a custom ETL pipeline.

2. **Data Processing** – The extracted data is cleaned, transformed, and organized into a normalized structure before being loaded into the PostgreSQL database.

3. **Data Storage** – PostgreSQL stores all processed game data, including genres, platforms, tags, stores, screenshots, and their relationships.

4. **Backend Processing** – The FastAPI backend retrieves data from PostgreSQL and executes the weighted recommendation algorithm based on the user's selected preferences.

5. **Frontend Interaction** – The React frontend communicates with the backend through REST APIs, allowing users to apply filters and view personalized game recommendations.

6. **Recommendation Results** – The application displays ranked game recommendations with detailed information such as recommendation score, rating, genres, platforms, release year, tags, stores, and matched preferences.


##  Project Structure

The project is organized into separate backend, frontend, and database modules to maintain a clean and modular architecture. Each directory is responsible for a specific part of the application.

```text
GameMatchAI/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── games.py
│   │   │   ├── genres.py
│   │   │   ├── platforms.py
│   │   │   ├── recommend.py
│   │   │   ├── stores.py
│   │   │   └── tags.py
│   │   │
│   │   ├── models/
│   │   │   └── schemas.py
│   │   │
│   │   ├── services/
│   │   │   ├── game_service.py
│   │   │   └── recommendation_service.py
│   │   │
│   │   └── main.py
│   │
│   ├── data/
│   │
│   ├── database/
│   │   ├── db_connection.py
│   │   ├── schemas.sql
│   │   └── test_connection.py
│   │
│   ├── scripts/
│   │   ├── fetch_games.py
│   │   ├── transform_games.py
│   │   ├── load_games.py
│   │   └── run_etl.py
│   │
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env.example
│   └── .dockerignore
│
├── database/
│   └── gamematchai.sql
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   ├── AccordionFilter.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── GameCard.jsx
│   │   │   ├── GenreFilter.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── HeroCarousel.jsx
│   │   │   ├── PlatformFilter.jsx
│   │   │   ├── PlaytimeSlider.jsx
│   │   │   ├── RatingSlider.jsx
│   │   │   ├── RecommendationList.jsx
│   │   │   ├── ReleaseYearSlider.jsx
│   │   │   ├── SearchButton.jsx
│   │   │   ├── StoreFilter.jsx
│   │   │   └── TagFilter.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   │
│   │   |
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── docker-compose.yml
└── README.md
└── INSTALL.md
└── USAGE.md
```

### Directory Overview

| Directory / File | Description |
|------------------|-------------|
| **backend/app/api/** | Contains all FastAPI endpoints responsible for handling HTTP requests and responses. |
| **backend/app/models/** | Defines the Pydantic schemas used for request validation and API responses. |
| **backend/app/services/** | Contains the application's business logic. `game_service.py` manages game retrieval and filtering, while `recommendation_service.py` implements the weighted recommendation algorithm. |
| **backend/database/** | Handles PostgreSQL connectivity, database schema creation, and connection testing. |
| **backend/scripts/** | Contains the ETL pipeline scripts responsible for extracting, transforming, and loading game data into PostgreSQL. |
| **frontend/src/components/** | Reusable React components for filters, recommendation cards, sliders, and the user interface. |
| **frontend/src/pages/** | Defines the main application pages, including the Home page. |
| **frontend/src/api/** | Centralizes communication between the React frontend and FastAPI backend using Axios. |
| **database/** | Stores the PostgreSQL database dump (`gamematchai.sql`) used for automatic database initialization. |
| **docker-compose.yml** | Orchestrates the PostgreSQL, FastAPI, and React containers using Docker Compose. |
| **README.md** | Main project documentation, including setup instructions, architecture, and implementation details. |


##  ETL Pipeline

GameMatch AI uses an **ETL (Extract, Transform, Load)** pipeline to prepare the game dataset before it is used by the recommendation system. Instead of requesting data from the RAWG API every time a user searches for recommendations, the application fetches the data once, processes it, and stores it in a local PostgreSQL database. This approach improves performance, reduces external API dependency, and provides a more reliable user experience.

The ETL workflow is illustrated below:

```text
                  RAWG API
                      │
                      ▼
          fetch_games.py (Extract)
                      │
                      ▼
      transform_games.py (Transform)
                      │
                      ▼
           load_games.py (Load)
                      │
                      ▼
           PostgreSQL Database
```

### ETL Pipeline Components

| File | Purpose |
|------|---------|
| **fetch_games.py** | Connects to the RAWG Video Games API and retrieves game information such as genres, platforms, tags, stores, ratings, release dates, screenshots, and other metadata. The extracted data is stored as raw JSON files for further processing. |
| **transform_games.py** | Cleans and transforms the raw JSON data into a structured format suitable for the database. This includes removing unnecessary fields, standardizing values, organizing relationships, and preparing the data for insertion into PostgreSQL. |
| **load_games.py** | Loads the transformed data into PostgreSQL by inserting records into the main tables and relationship tables while maintaining referential integrity. |
| **run_etl.py** | Acts as the entry point for the ETL pipeline by executing the Extract, Transform, and Load stages in sequence, allowing the complete dataset to be prepared with a single command. |

### Why an ETL Pipeline?

The ETL pipeline separates data collection from the main application, allowing the recommendation system to operate independently of the RAWG API during runtime.

**Benefits of using an ETL pipeline:**

- Faster recommendations by retrieving data directly from the local PostgreSQL database.
- Eliminates dependency on external API availability during application runtime.
- Avoids API rate limits imposed by the RAWG API.
- Simplifies data cleaning, transformation, and maintenance.
- Allows the database to be refreshed whenever updated game data is required.

##  Database Design

GameMatch AI uses **PostgreSQL** as its relational database to store and manage game information. The database follows **normalization principles**, reducing data redundancy while maintaining efficient relationships between different entities.

Instead of storing all information in a single table, related data such as genres, platforms, tags, stores, and screenshots are organized into separate tables and connected using many-to-many relationship tables. This design improves data consistency, scalability, and query performance.

### Entity Relationship Overview

```text
                           games
                             │
     ┌──────────────┬────────┼────────┬──────────────┬
     ▼              ▼        ▼        ▼              ▼
game_genres  game_platforms  game_tags  game_stores  screenshots
     │              │        │        │
     ▼              ▼        ▼        ▼
  genres       platforms    tags     stores
```

### Database Tables

The GameMatch AI database contains **15,680 video games** collected from the **RAWG Video Games Database API** through the ETL pipeline. During the transformation process, the data is cleaned, normalized, and organized into multiple relational tables to eliminate redundancy and improve query performance.

In addition to basic game information such as titles, ratings, release dates, and playtime, the database stores genres, platforms, gameplay tags, digital stores, screenshots, and the relationships between them. This structured design enables the recommendation engine to efficiently retrieve and compare game metadata when generating personalized recommendations.

The following tables make up the GameMatch AI database.

| Table | Purpose |
|--------|---------|
| **games** | Stores the primary information for each game, including its name, release date, rating, Metacritic score, playtime, ESRB rating, and cover image. |
| **genres** | Stores the list of unique game genres. |
| **platforms** | Stores all supported gaming platforms. |
| **tags** | Stores gameplay tags used by the recommendation engine. |
| **stores** | Stores digital game stores where games are available along with their URLs. |
| **screenshots** | Stores screenshots associated with each game. |
| **game_genres** | Junction table that maps games to one or more genres. |
| **game_platforms** | Junction table that maps games to their supported platforms. |
| **game_tags** | Junction table that maps games to gameplay tags. |
| **game_stores** | Junction table that maps games to the stores where they are available. |

### Database Design Highlights

- Uses a normalized relational database structure to eliminate data redundancy.
- Implements many-to-many relationships using junction tables.
- Uses primary keys to uniquely identify each record.
- Maintains referential integrity through foreign key constraints.
- Uses **ON DELETE CASCADE** to automatically remove dependent records when a game is deleted.
- Separates master data (genres, platforms, tags, and stores) from game data, making the database easier to maintain and extend.

### Why PostgreSQL?

PostgreSQL was chosen because it is a powerful open-source relational database that efficiently handles structured data and complex relationships. Its support for foreign keys, indexing, and advanced SQL queries makes it well suited for applications like GameMatch AI, where recommendation logic relies on querying multiple related tables efficiently.

##  API Endpoints

The backend is built using **FastAPI** and exposes RESTful endpoints that allow the frontend to retrieve game data and generate personalized recommendations. All communication between the React frontend and PostgreSQL database is handled through these APIs.

### Available Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| **GET** | `/games` | Retrieves the complete list of available games from the database. |
| **GET** | `/genres` | Returns all available game genres. |
| **GET** | `/platforms` | Returns all supported gaming platforms. |
| **GET** | `/tags` | Returns all available game tags. |
| **GET** | `/stores` | Returns all available game stores. |
| **POST** | `/recommend` | Generates personalized game recommendations based on the user's selected preferences. |

### API Workflow

```text
           React Frontend
                 │
         HTTP Request (Axios)
                 │
                 ▼
         FastAPI API Endpoint
                 │
                 ▼
           Service Layer
                 │
                 ▼
        PostgreSQL Database
                 │
                 ▼
           JSON Response
                 │
                 ▼
           React Frontend
```

### API Response Format

All API endpoints return data in **JSON** format, making it easy for the React frontend to process and display information. FastAPI uses **Pydantic models** to validate incoming requests and ensure that all API responses follow a consistent structure.

The `/recommend` endpoint accepts the user's selected preferences and returns a ranked list of recommended games, including details such as the recommendation score, matched preferences, genres, platforms, tags, stores, rating, and release year.

##  Recommendation Engine

The recommendation engine is the core component of GameMatch AI. It uses a **custom weighted scoring algorithm** to rank games according to how closely they match the user's preferences. Instead of relying on machine learning, the system follows a transparent rule-based approach where each preference contributes a predefined number of points to the final recommendation score.

```text
          User Preferences
                 │
                 ▼
      Apply Hard Filters
  (Rating • Release Year • Playtime)
                 │
                 ▼
     Retrieve Candidate Games
          from PostgreSQL
                 │
                 ▼
        Load Game Metadata
  (Genres • Platforms • Tags • Stores)
                 │
                 ▼
      Calculate Match Score
                 │
                 ▼
            Sort Games by
         Recommendation Score
    (Tie-breaker: Higher Rating)
                 │
                 ▼
            Return Top 20
    Personalized Recommendations
```
### Recommendation Workflow

1. **Candidate Filtering**
   - Games are first filtered using the user's minimum rating, release year, and maximum playtime preferences.
   - This reduces the number of games that need to be scored and improves performance.

2. **Metadata Loading**
   - Genres, platforms, tags, and stores are loaded in advance using optimized database queries.
   - This avoids repeated database queries for every game and improves efficiency.

3. **Weighted Score Calculation**
   - Each candidate game is compared against the user's selected preferences.
   - A weighted score is calculated based on how closely the game matches those preferences.

4. **Ranking**
   - Games are sorted by their matching score.
   - If two games receive the same score, the game with the higher user rating is ranked first.

5. **Recommendation Results**
   - The application returns the highest-ranked games along with their recommendation score and the preferences that contributed to the match.

### Scoring Criteria

| Criteria | Weight | Description |
|----------|-------:|-------------|
| Genre | **35** | Highest priority because genres best represent a player's interests. |
| Platform | **25** | Rewards games available on the user's preferred gaming platforms. |
| Tags | **20** | Matches gameplay characteristics such as Multiplayer, Open World, Story Rich, etc. |
| Rating | **5** | Rewards games that satisfy the user's minimum rating preference. |
| Release Year | **5** | Gives preference to games released within the selected time period. |
| Playtime | **3** | Matches games based on the user's preferred maximum playtime. |
| Store | **7** | Rewards games available on the user's preferred digital stores. |

**Maximum Recommendation Score: 100**

### Why a Weighted Recommendation Algorithm?

A weighted recommendation algorithm was chosen because it provides a simple, transparent, and easily explainable recommendation process.

This approach also makes the recommendation engine easy to modify. Individual weights can be adjusted in the future to improve recommendation quality without changing the overall architecture.

##  Match Score Calculation

Each candidate game is assigned a **Recommendation Match Score** out of **100 points**. The score is calculated by comparing the game's attributes with the user's selected preferences using a custom weighted scoring algorithm.

### Scoring Criteria

| Criteria | Maximum Score | Calculation |
|----------|--------------:|-------------|
| **Genre** | 35 | Awarded proportionally based on the number of matched genres. |
| **Platform** | 25 | Awarded proportionally based on the number of matched platforms. |
| **Tags** | 20 | Awarded proportionally based on the number of matched tags. |
| **Minimum Rating** | 5 | Awarded if the game's rating is greater than or equal to the user's selected minimum rating. |
| **Release Year** | 5 | Awarded if the game was released in or after the selected year. |
| **Playtime** | 3 | Awarded if the game's playtime is within the user's preferred maximum playtime. |
| **Store** | 7 | Awarded if the game is available on at least one of the user's selected stores. |

**Maximum Recommendation Score = 100**

---

### Example Match Score Calculation

Suppose a user selects the following preferences:

- Genres: **Action, RPG, Adventure, Shooter**
- Platforms: **PC, PlayStation 5**
- Tags: **Open World, Multiplayer, Fantasy, Story Rich**
- Minimum Rating: **4**
- Release Year: **2020**
- Maximum Playtime: **40 Hours**
- Preferred Store: **Steam**

A candidate game has the following attributes:

- Genres: **Action, RPG, Puzzle**
- Platforms: **PC, Xbox**
- Tags: **Open World, Fantasy, Survival, Multiplayer**
- Rating: **4.5**
- Release Year: **2022**
- Playtime: **30 Hours**
- Available Stores: **Steam, Epic Games**

### Match Score Breakdown

| Criteria | Explanation | Calculation | Score |
|----------|-------------|-------------|------:|
| **Genre** | The user selected **4 genres**, and the game matches **2** of them (**Action** and **RPG**). | (2 ÷ 4) × 35 | 17.5 |
| **Platform** | The user selected **2 platforms**, and the game matches **1** (**PC**). | (1 ÷ 2) × 25 | 12.5 |
| **Tags** | The user selected **4 tags**, and the game matches **2** (**Open World** and **Fantasy**). | (2 ÷ 4) × 20 | 10 |
| **Rating** | The game's rating (**4.5**) is greater than the user's minimum rating (**4**). | Full Score | 5 |
| **Release Year** | The game was released in **2022**, which satisfies the minimum release year (**2020**). | Full Score | 5 |
| **Playtime** | The game's playtime (**30 hours**) is within the user's preferred maximum (**40 hours**). | Full Score | 3 |
| **Store** | The game is available on the user's preferred store (**Steam**). | Full Score | 7 |


### Final Recommendation Score

```text
17.5 + 12.5 + 10 + 5 + 5 + 3 + 7 = 60
```

The final score is rounded to the nearest whole number and displayed as the **Recommendation Match Score**.

---

The recommendation engine first filters games using the user's **minimum rating**, **release year**, and **maximum playtime** preferences. It then compares each candidate game's genres, platforms, tags, and stores with the user's selected preferences to calculate a weighted recommendation score.

After scoring all candidate games, they are sorted in descending order based on their recommendation score. If two games receive the same score, the game with the higher user rating is ranked first. Finally, the top 20 highest-ranked games are returned to the frontend as personalized recommendations.


##  Frontend Architecture

The frontend is built using **React** and follows a **component-based architecture**, where each component is responsible for a specific part of the user interface. This approach improves code readability, reusability, and maintainability.

### Frontend File Structure
| File | Purpose |
|------|---------|
| **main.jsx** | Entry point of the React application. It renders the root component and mounts the application to the browser using ReactDOM. |
| **App.jsx** | Serves as the root component of the application. It loads the main `Home` page and initializes the frontend. |
| **Home.jsx** | Acts as the main page of the application by combining the header, filter panel, and recommendation section into a single user interface. |
| **Header.jsx** | Displays the application title, introduction, and hero section that welcomes users to the recommendation system. |
| **HeroCarousel.jsx** | Displays a carousel of featured game banners to create an engaging landing experience. |
| **FilterPanel.jsx** | Acts as the central container for all user preference filters and organizes them into a clean layout. |
| **AccordionFilter.jsx** | Creates expandable and collapsible filter sections to improve usability and reduce screen clutter. |
| **GenreFilter.jsx** | Allows users to select one or more preferred game genres. |
| **PlatformFilter.jsx** | Allows users to choose their preferred gaming platforms. |
| **TagFilter.jsx** | Enables users to select gameplay tags such as Open World, Multiplayer, RPG, etc. |
| **StoreFilter.jsx** | Allows users to filter games available on selected digital stores. |
| **RatingSlider.jsx** | Lets users specify the minimum acceptable game rating. |
| **ReleaseYearSlider.jsx** | Allows users to filter games released after a selected year. |
| **PlaytimeSlider.jsx** | Lets users define the maximum preferred game completion time. |
| **SearchButton.jsx** | Collects all selected preferences and sends the recommendation request to the FastAPI backend. |
| **RecommendationList.jsx** | Receives the recommendation results from the backend and displays the list of recommended games. |
| **GameCard.jsx** | Displays detailed information for each recommended game, including cover image, rating, release year, genres, platforms, tags, stores, recommendation score, and matched preferences. |
| **api.js** | Contains all Axios functions responsible for communication between the React frontend and the FastAPI backend. |
| **index.css** | Contains global styles such as the application theme, custom scrollbar, slider styling, game card animations, hover effects, and hero carousel animations, ensuring a consistent look and feel throughout the application.|
| **App.css** | Default Vite stylesheet. It was retained for project compatibility but is not used for the application's custom user interface.|
| **index.html** | The main HTML entry file of the application. sets the page title, favicon, and viewport configuration, and loads the main.jsx entry point.|

---

### Frontend Workflow

The frontend follows a simple user interaction flow:

```text
 User Opens Application
          │
          ▼
      Home Page
          │
          ▼
    Select Preferences
 (Genres, Platforms, Tags,
   Rating, Release Year,
    Playtime, Stores)
          │
          ▼
 Click "Find My Next Game"
          │
          ▼
  Axios sends request
  to FastAPI Backend
          │
          ▼
   Backend returns
   recommended games
          │
          ▼
  RecommendationList
   renders multiple
  GameCard components
```

##  Docker Architecture

GameMatch AI is fully containerized using **Docker** and **Docker Compose**. Instead of running the frontend, backend, and database separately, each service runs inside its own isolated Docker container. This provides a consistent development environment and simplifies deployment across different systems.

---

### Docker Architecture

```text
                    Docker Compose
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
   PostgreSQL       FastAPI Backend    React Frontend
   Container           Container         Container
 (Database Layer)    (REST API)        (User Interface)
        ▲                 │
        └────── Docker Bridge Network ───────┘
                          │
                          ▼
                        User
```

---

### Docker Containers

| Container | Purpose |
|-----------|---------|
| **PostgreSQL** | Stores all game data and serves as the application's primary database. The database is automatically initialized using the provided `gamematchai.sql` dump. |
| **FastAPI Backend** | Exposes RESTful APIs, processes recommendation requests, communicates with PostgreSQL, and returns recommendation results to the frontend. |
| **React Frontend** | Provides the user interface where users select their preferences and view personalized game recommendations. |

---

### Container Communication

The three containers communicate through a **custom Docker bridge network** created automatically by Docker Compose.

Communication flow:

```text
User
 │
 ▼
React Frontend
 │
HTTP Requests (Axios)
 ▼
FastAPI Backend
 │
SQL Queries
 ▼
PostgreSQL Database
 │
 ▼
Recommendation Results
 │
 ▼
React Frontend
 │
 ▼
User
```

---

### Automatic Database Initialization

The PostgreSQL container is automatically initialized during the first startup.

```text
database/
└── gamematchai.sql
```

When the PostgreSQL container is created, Docker automatically imports the SQL dump into the database. As a result, no manual database setup is required before running the application.

---

### Why Docker?

Docker was used to simplify the development and deployment process by packaging each application component into its own isolated container.

### Advantages

- Consistent environment across different operating systems.
- Eliminates dependency and version conflicts.
- Simplifies project setup with a single Docker Compose command.
- Keeps the frontend, backend, and database independent while allowing them to communicate seamlessly.
- Makes the application easier to deploy and maintain.

---

### Docker Workflow

```text
docker compose up --build
            │
            ▼
    Build Images
            │
            ▼
Start PostgreSQL Container
            │
            ▼
Import gamematchai.sql
            │
            ▼
Start FastAPI Backend
            │
            ▼
Connect Backend to PostgreSQL
            │
            ▼
Start React Frontend
            │
            ▼
Application Ready
```

---

### Runtime Data Flow

```text
RAWG API
    │
    ▼
ETL Pipeline
(Fetch → Transform → Load)
    │
    ▼
PostgreSQL Database
    │
    ▼
FastAPI Backend
    │
    ▼
React Frontend
    │
    ▼
   User
```

> **Note:** The RAWG API is only used during the ETL process to populate the PostgreSQL database. During normal application runtime, all recommendations are generated using the locally stored PostgreSQL data, so no external API calls are required.

# Future Scope

Although GameMatch AI provides personalized recommendations using a weighted scoring algorithm, there are several ways the project can be improved in the future.

- **Machine Learning-Based Recommendations**  
  Replace or enhance the current scoring algorithm with a machine learning model that learns from user behavior and provides more personalized recommendations over time.

- **Similar Game Search**  
  Allow users to enter the name of a game and receive recommendations for similar games based on genres, gameplay, tags, ratings, and other features.

- **Larger Game Database**  
  Expand the database by importing more games from the RAWG API to provide a wider variety of recommendations.

- **Store Links**  
  Add direct links to digital stores such as Steam, PlayStation Store, Xbox Store, and Epic Games Store so users can easily access the recommended games.

- **Game Prices**  
  Display the latest prices and discounts available on different digital stores to help users compare purchase options.

- **More Game Information**  
  Include additional details such as trailers, screenshots, game descriptions, system requirements, developers, publishers, and user reviews.

- **User Accounts and Favorites**  
  Allow users to create accounts, save favorite games, and maintain a recommendation history.

- **Advanced Search and Filters**  
  Introduce additional filters such as multiplayer support, ESRB rating, game engine, developer, publisher, and supported languages.

- **Performance Improvements**  
  Optimize the recommendation engine and database queries to improve response time as the dataset continues to grow.
- **Enhanced User Interface and User Experience (UI/UX)**  
  Improve the overall user interface by adding more animations, smoother transitions, better navigation, additional themes, and interactive features to make the application more attractive and user-friendly.

## Data Source

The game dataset used in this project was collected from the **RAWG Video Games Database API**.

The API was used during the ETL (Extract, Transform, Load) process to retrieve publicly available video game information, including game titles, genres, platforms, tags, stores, ratings, release dates, playtime, and screenshots.

The extracted data was then cleaned, transformed, and loaded into a local PostgreSQL database. During normal application usage, all recommendations are generated from the local database, and no external API calls are made.

**Source:** https://rawg.io/apidocs

## Acknowledgements

This project uses publicly available game data provided by the **RAWG Video Games Database API** for educational purposes.

Special thanks to the RAWG team for providing a comprehensive video game database and API that made this project possible.

## AI Assistance Declaration

Artificial Intelligence tools (ChatGPT) were used as a development assistant during this project.

AI assistance was primarily used for:

- Discussing software architecture and project structure.
- Exploring different recommendation system approaches before implementing the final weighted scoring algorithm.
- Debugging programming issues and understanding error messages.
- Explaining programming concepts and suggesting possible solutions.
- Improving code readability, comments, docstrings, and project documentation.

All implementation decisions, project integration, testing, customization, and final modifications were completed by the project author. The recommendation logic, database design, ETL pipeline integration, frontend customization, and overall system behavior were reviewed, modified, and validated throughout the development process.

##  Additional Documentation

To keep this README concise and focused on the project's architecture and implementation, the installation and usage instructions have been provided in separate documentation files.

-  **INSTALL.md** – Step-by-step guide for setting up and running the project locally or using Docker.
-  **USAGE.md** – Instructions on using the application, accessing the API documentation, and generating personalized game recommendations.

Please refer to these documents for detailed setup and usage information.

## Cross-Platform Testing

GameMatch AI has been tested on multiple operating systems to verify that the Dockerized application runs successfully in different environments.

| Operating System | Status |
|------------------|--------|
| Windows 10/11 | ✅ Tested |
| macOS | ✅ Tested |

During testing, a compatibility issue was identified with the `node:22-alpine` Docker image on macOS. The frontend Docker image was updated to `node:22-slim`, and the application was successfully built and executed on both Windows and macOS using Docker Compose.