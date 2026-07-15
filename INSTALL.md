# Installation Guide

Follow the steps below to run **GameMatch AI** using Docker.

---

## Prerequisites

Before running the project, install the following software:

- **Git**: https://git-scm.com/downloads
- **Docker Desktop**: https://www.docker.com/products/docker-desktop/

> **Note:** Make sure Docker Desktop is installed and the Docker Engine is running before proceeding.

---

## Step 1: Open a Terminal

Open one of the following:

- Command Prompt (Windows)
- PowerShell (Windows)
- Terminal (Linux/macOS)

---

## Step 2: Clone the Repository

Run the following command:

```bash
git clone https://github.com/AmanNegi27/GameMatchAI.git
```

---

## Step 3: Navigate to the Project Directory

```bash
cd GameMatchAI
```

---

## Step 4: Build and Run the Application

Run the following command:

```bash
docker compose up --build
```

During the first run, Docker will automatically:

- Build the frontend and backend images.
- Download the PostgreSQL image.
- Initialize the database using `database/gamematchai.sql`.
- Start all required containers.

> **Note:** The first build may take a few minutes depending on your internet connection.

---

## Step 5: Open the Application

Once all containers are running successfully, open the following URLs in your browser:

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Swagger API Documentation | http://localhost:8000/docs |

---

## Stop the Application

To stop all running containers:

```bash
docker compose down
```

## Troubleshooting

If you encounter any issues while running the project, try the following:

- Ensure that **Docker Desktop** is running before executing any Docker commands.
- Verify that you are inside the project directory (`GameMatchAI`) before running `docker compose up --build`.
- If the containers fail to start, restart Docker Desktop and try again.
- If Docker images fail to download, check your internet connection and run the command again.
- If ports **5173**, **8000**, or **5432** are already in use, stop the conflicting application or container and restart the project.
- If you have made changes to the project, rebuild the containers using:

```bash
docker compose up --build
```

- To stop all running containers:

```bash
docker compose down
```

- To start the application again after stopping it:

```bash
docker compose up
```