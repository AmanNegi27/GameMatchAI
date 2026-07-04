"""
Run the complete ETL pipeline for a range of RAWG API pages.

For each page, the script:
1. Downloads game data from the RAWG API.
2. Transforms the raw data into structured JSON files.
3. Loads the processed data into the PostgreSQL database.
"""

import os
import subprocess
import sys
from pathlib import Path


# Configure the range of RAWG pages to import.
START_PAGE = 270
END_PAGE = 300


# Project directories.
PROJECT_ROOT = Path(__file__).resolve().parents[2]

SCRIPTS_DIR = (
    PROJECT_ROOT
    / "backend"
    / "scripts"
)

FETCH_SCRIPT = SCRIPTS_DIR / "fetch_games.py"
TRANSFORM_SCRIPT = SCRIPTS_DIR / "transform_games.py"
LOAD_SCRIPT = SCRIPTS_DIR / "load_games.py"


print("=" * 70)
print("GAME MATCH AI - AUTOMATED ETL")
print("=" * 70)

# Process each RAWG page one at a time.
for page in range(START_PAGE, END_PAGE + 1):

    print("\n" + "=" * 70)
    print(f"Processing RAWG Page {page}")
    print("=" * 70)

    # Pass the current page number to fetch_games.py.
    env = os.environ.copy()
    env["RAWG_PAGE"] = str(page)

    # Step 1: Download game data from the RAWG API.
    subprocess.run(
        [
            sys.executable,
            str(FETCH_SCRIPT),
        ],
        check=True,
        env=env,
    )

    # Step 2: Transform the downloaded data into structured JSON files.
    subprocess.run(
        [
            sys.executable,
            str(TRANSFORM_SCRIPT),
        ],
        check=True,
    )

    # Step 3: Import the processed data into the database.
    subprocess.run(
        [
            sys.executable,
            str(LOAD_SCRIPT),
        ],
        check=True,
    )

print("\n" + "=" * 70)
print("ALL PAGES IMPORTED SUCCESSFULLY!")
print("=" * 70)