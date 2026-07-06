# Installation Guide

## Overview

This document provides step-by-step instructions for installing and running **GameMatch AI**, a full-stack video game recommendation system built using FastAPI, React, PostgreSQL, and Docker.

The project supports two installation methods:

- **Docker Installation (Recommended)** – The quickest and easiest way to run the application using Docker Compose.
- **Local Installation** – Install and configure the frontend, backend, and PostgreSQL database manually.

Docker is the recommended installation method because it provides a consistent environment across different operating systems and eliminates dependency and version conflicts.

---

## Obtain the Project

Before installing the project, download the source code using one of the following methods.

### Option 1: Clone the Repository Using Git

Install Git if it is not already available on your system.

| Software | Download |
|----------|----------|
| **Git** | https://git-scm.com/downloads |

Clone the repository:

```bash
git clone https://github.com/AmanNegi27/GameMatchAI.git
```

Navigate to the project directory:

```bash
cd GameMatchAI
```

---

### Option 2: Download the Repository as a ZIP File

If Git is not installed, download the project directly from GitHub.

1. Open:

```
https://github.com/AmanNegi27/GameMatchAI
```

2. Click **Code**.
3. Select **Download ZIP**.
4. Extract the downloaded ZIP file.
5. Open the extracted **GameMatchAI** folder.

---

## Project Structure

After downloading the project, the directory should look similar to the following:

```text
GameMatchAI/
│
├── backend/
├── frontend/
├── database/
├── docker-compose.yml
├── README.md
├── INSTALL.md
└── USAGE.md
```

Ensure all commands in this guide are executed from the project root directory unless stated otherwise.

## Prerequisites

### Docker Installation

If you are installing the project using Docker, install the following software.

| Software | Purpose | Download |
|----------|---------|----------|
| Docker Desktop | Build and run the application using Docker Compose. | https://www.docker.com/products/docker-desktop/ |
| Visual Studio Code *(Optional)* | Recommended IDE for viewing or modifying the project source code. | https://code.visualstudio.com/ |

Verify the installation.

```bash
docker --version
```

```bash
docker compose version
```

---

### Additional Requirements for Local Installation

If you choose to install the project locally, install the following software in addition to Docker prerequisites.

| Software | Version | Purpose | Download |
|----------|---------|---------|----------|
| Python | 3.11 or later | Run the FastAPI backend and ETL pipeline. | https://www.python.org/downloads/ |
| Node.js | 20 or later | Run the React frontend (includes npm). | https://nodejs.org/ |
| PostgreSQL | 16 or later | Store the project database locally. | https://www.postgresql.org/download/ |

Verify the installation.

```bash
python --version
```

```bash
node --version
```

```bash
npm --version
```

```bash
psql --version
```

> **Note:** If you are using Docker, Python, Node.js, npm, and PostgreSQL are already included inside the containers and do not need to be installed separately.
---
##  Method 1: Install and Run Using Docker (Plug and Play)

Docker is the recommended way to run **GameMatch AI** because it automatically builds and starts the frontend, backend, and PostgreSQL database in separate containers. It also initializes the database using the provided SQL dump, eliminating the need for manual configuration.

### Step 1: Open the Project Directory

Open a terminal and navigate to the project root directory. Make sure that Docker Desktop is opened and engine is running.

```bash
cd GameMatchAI
```

---

### Step 2: Build and Start the Containers

Run the following command:

```bash
docker compose up --build
```

During the first execution, Docker will:

- Build the FastAPI backend image.
- Build the React frontend image.
- Download the PostgreSQL image.
- Create a custom Docker bridge network.
- Create persistent Docker volumes.
- Initialize the PostgreSQL database using `database/gamematchai.sql`.
- Start all three containers.

> **Note:** The first build may take several minutes depending on your internet connection and system performance.

---

### Step 3: Verify the Containers

Check that all containers are running successfully.

```bash
docker ps
```

You should see the following containers in the output:

| Container | Purpose |
|-----------|---------|
| **gamematchai_frontend** | Runs the React frontend application. |
| **gamematchai_backend** | Runs the FastAPI backend and recommendation engine. |
| **gamematchai_postgres** | Runs the PostgreSQL database and stores all game data. |

A successful `docker ps` output indicates that all three services are running correctly and are ready to communicate through the Docker bridge network.

### Step 4: Access the Application

Once all containers are running, open the following URLs in your browser.

| Service | URL |
|----------|-----|
| React Frontend | http://localhost:5173 |
| FastAPI Backend | http://localhost:8000 |
| Swagger API Documentation | http://localhost:8000/docs |

---

### Stop the Application

To stop all running containers:

```bash
docker compose down
```

To stop the containers while preserving the database volume:

```bash
docker compose stop
```

To restart the containers:

```bash
docker compose start
```

##  Method 2: Install and Run Locally

If you prefer not to use Docker, you can run GameMatch AI locally by installing and configuring the backend, frontend, and PostgreSQL database manually.

---

### Step 1: Set Up PostgreSQL

Install PostgreSQL if it is not already installed.

Create a new database named **gamematch**.

```sql
CREATE DATABASE gamematch;
```

Alternatively, using the PostgreSQL command line:

```bash
createdb gamematch
```

Import the provided SQL dump into the database.

```bash
psql -U postgres -d gamematch -f database/gamematchai.sql
```

This command creates all required tables and imports the game dataset into PostgreSQL.

After importing the database, configure the database connection in the backend `.env` file.

Example:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gamematch
DB_USER=postgres
DB_PASSWORD=your_password
```

---

### Step 2: Set Up the Backend

Navigate to the backend directory.

```bash
cd backend
```

Create a Python virtual environment.

```bash
python -m venv .venv
```

Activate the virtual environment.

**Windows (PowerShell)**

```powershell
.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt)**

```cmd
.venv\Scripts\activate.bat
```

**Linux / macOS**

```bash
source .venv/bin/activate
```

Install the required Python dependencies.

```bash
pip install -r requirements.txt
```

Start the FastAPI backend server.

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

Interactive API documentation (Swagger UI):

```text
http://localhost:8000/docs
```

---

### Step 3: Set Up the Frontend

Open a new terminal and navigate to the frontend directory.

```bash
cd frontend
```

Install all frontend dependencies.

```bash
npm install
```

Start the React development server.

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

### Step 4: Verify the Installation

Open your browser and visit:

| Service | URL |
|----------|-----|
| React Frontend | http://localhost:5173 |
| FastAPI Backend | http://localhost:8000 |
| Swagger API Documentation | http://localhost:8000/docs |

If the installation was successful:

- The React application should load successfully.
- The filter panel should display all available genres, platforms, tags, and stores.
- Personalized game recommendations should be generated correctly.
- The backend should successfully retrieve data from the local PostgreSQL database.
- Swagger UI should display all available REST API endpoints.

##  Environment Variables

GameMatch AI uses environment variables to configure the database connection and external services. These variables should be defined in a `.env` file inside the **backend** directory.

### Backend Environment Variables

Create a file named `.env` inside the `backend` folder with the following configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gamematch
DB_USER=postgres
DB_PASSWORD=your_password

RAWG_API_KEY=your_rawg_api_key
```

### Environment Variable Description

| Variable | Description |
|----------|-------------|
| **DB_HOST** | Hostname of the PostgreSQL server. |
| **DB_PORT** | Port used by PostgreSQL (default: 5432). |
| **DB_NAME** | Name of the PostgreSQL database (`gamematch`). |
| **DB_USER** | PostgreSQL username. |
| **DB_PASSWORD** | PostgreSQL user password. |
| **RAWG_API_KEY** | API key used by the ETL pipeline to fetch game data from the RAWG API. This key is **only required when running the ETL pipeline**. The application itself does not use the RAWG API during normal operation. |

> **Note:** Once the database has been populated using the ETL pipeline or the provided SQL dump (`gamematchai.sql`), the application retrieves all data directly from PostgreSQL and no longer depends on the RAWG API at runtime.

# Troubleshooting

If you encounter any issues while installing or running **GameMatch AI**, try the solutions below.

---

## Make Sure You Are in the Correct Directory

Many commands in this guide must be executed from a specific folder.

Before running any command, verify that you are in the correct directory.

Project root:

```text
GameMatchAI/
```

Backend:

```text
GameMatchAI/backend/
```

Frontend:

```text
GameMatchAI/frontend/
```

You can check your current directory using:

**Windows**

```bash
cd
```

**Linux / macOS**

```bash
pwd
```

---

## Docker Is Not Running

If Docker commands are not working, make sure **Docker Desktop** is running.

Verify the installation:

```bash
docker --version
docker compose version
```

---

## Docker Containers Failed to Start

If one or more containers fail to start, stop the existing containers and rebuild the project.

```bash
docker compose down
docker compose up --build
```

---

## Backend Is Not Starting

Before starting the backend, make sure you are inside the **backend** folder.

```text
GameMatchAI/backend/
```

Also ensure that:

- The Python virtual environment is activated.
- All required Python packages are installed.

If necessary, install the dependencies again.

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

---

## Frontend Is Not Starting

Before starting the frontend, make sure you are inside the **frontend** folder.

```text
GameMatchAI/frontend/
```

Install the required packages:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

---

## Unable to Connect to PostgreSQL

If the backend cannot connect to PostgreSQL, check the following:

- PostgreSQL is running.
- The database **gamematch** exists.
- The SQL dump (`gamematchai.sql`) has been imported successfully.
- The database credentials in the `.env` file are correct.

---

## Port Already in Use

If you receive an error stating that a port is already in use, another application is already using that port.

Common ports used by this project:

| Service | Port |
|----------|------|
| React Frontend | 5173 |
| FastAPI Backend | 8000 |
| PostgreSQL | 5432 |

Close the application using the port or change the port configuration before starting the project again.

---

## API Is Not Responding

If the frontend cannot communicate with the backend:

- Verify that the FastAPI backend is running.
- Open the following URL in your browser:

```text
http://localhost:8000/docs
```

If the Swagger page opens successfully, the backend is running correctly.

---

## Recommendations Are Not Displayed

If the application opens but no game recommendations are shown:

- Make sure the PostgreSQL database contains the imported game data.
- Verify that the backend is connected to PostgreSQL.
- Ensure all Docker containers (or local services) are running.
- Check the browser console and backend terminal for any error messages.

---

## Still Having Problems?

If the issue still persists:

- Read the error message carefully in the terminal.
- Verify that all installation steps in this guide have been completed.
- Make sure all required software is installed correctly.
- If using Docker, restart Docker Desktop and rebuild the containers:

```bash
docker compose down
docker compose up --build
```