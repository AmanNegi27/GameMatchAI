"""
Test PostgreSQL Database Connection

This script tests whether Python can successfully connect
to the GameMatch PostgreSQL database.
"""

from db_connection import get_connection


def test_connection():
    """
    Test the database connection.
    """

    try:
        connection = get_connection()

        print("=" * 60)
        print("POSTGRESQL CONNECTION SUCCESSFUL")
        print("=" * 60)
        print("Connected to GameMatch database successfully!")

        connection.close()

        print("Database connection closed.")

    except Exception as error:

        print("=" * 60)
        print("DATABASE CONNECTION FAILED")
        print("=" * 60)
        print(error)


if __name__ == "__main__":
    test_connection()