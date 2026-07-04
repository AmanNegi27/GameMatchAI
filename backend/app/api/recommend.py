"""
API endpoint for generating personalized game recommendations.
"""

from fastapi import APIRouter

from app.models.schemas import RecommendationRequest
from app.services.recommendation_service import recommend_games

router = APIRouter()


@router.post("/recommend")
def recommend(request: RecommendationRequest):
    """
    Generate game recommendations based on the user's preferences.
    """

    # Pass the user's preferences to the recommendation service.
    recommendations = recommend_games(request)

    return recommendations