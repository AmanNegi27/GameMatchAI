"""
Fetch game data from the RAWG API and save the raw response as a JSON file.
"""

import json
import os
from pathlib import Path

import requests
from dotenv import load_dotenv


# Project directories.
PROJECT_ROOT = Path(__file__).resolve().parents[2]
BACKEND_DIR = PROJECT_ROOT / "backend"
RAW_DATA_DIR = BACKEND_DIR / "data" / "raw"

RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)


# Load the API key from the .env file.
load_dotenv(BACKEND_DIR / ".env")

API_KEY = os.getenv("RAWG_API_KEY")

if not API_KEY:
    raise ValueError("RAWG_API_KEY not found in backend/.env")


# RAWG API configuration.
BASE_URL = "https://api.rawg.io/api/games"

PAGE = int(os.getenv("RAWG_PAGE", "1"))
PAGE_SIZE = 40

params = {
    "key": API_KEY,
    "page": PAGE,
    "page_size": PAGE_SIZE,
}


print("=" * 60)
print("Fetching games from RAWG...")
print("=" * 60)

try:
    # Request game data from the RAWG API.
    response = requests.get(BASE_URL, params=params, timeout=30)
    response.raise_for_status()

except requests.exceptions.RequestException as error:
    print("Request failed.")
    print(error)
    raise SystemExit()


# Convert the API response into a Python dictionary.
data = response.json()
results = data.get("results", [])


# Save the raw API response for later processing.
output_file = RAW_DATA_DIR / "sample_games.json"

with open(output_file, "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4, ensure_ascii=False)


print(f"\nTotal Games Available : {data.get('count')}")
print(f"Games Downloaded      : {len(results)}")

print("\nDownloaded Games\n")

print("\nRaw JSON saved to:")
print(output_file)

print("\nRAWG connection successful!")