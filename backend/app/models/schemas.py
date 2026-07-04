"""
Pydantic schemas used for validating recommendation requests
and formatting recommendation responses.
"""

from typing import List, Optional

from pydantic import BaseModel


class RecommendationRequest(BaseModel):
    """
    Data received from the frontend to generate game recommendations.
    """

    # Required preferences selected by the user.
    genres: List[int]
    platforms: List[int]
    tags: List[int]

    # Optional filters that further refine the recommendations.
    minimum_rating: float = 0.0
    release_year: Optional[int] = None
    max_playtime: Optional[int] = None
    stores: Optional[List[int]] = None


class RecommendationResponse(BaseModel):
    """
    Structure of the recommendation returned to the frontend.
    """

    # Basic game information.
    id: int
    name: str
    background_image: str

    # Game details.
    release_year: int
    rating: float

    # Metadata shown to the user.
    platforms: List[str]
    genres: List[str]
    tags: List[str]
    stores: List[str]

    # Recommendation result.
    match_score: int
    matched_on: List[str]