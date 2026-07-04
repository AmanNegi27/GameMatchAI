import { useState } from "react";
import api from "../api/api";

import GenreFilter from "./GenreFilter";
import PlatformFilter from "./PlatformFilter";
import TagFilter from "./TagFilter";
import RatingSlider from "./RatingSlider";
import ReleaseYearSlider from "./ReleaseYearSlider";
import PlaytimeSlider from "./PlaytimeSlider";
import StoreFilter from "./StoreFilter";
import SearchButton from "./SearchButton";

/**
 * Displays the recommendation filters and sends the selected
 * preferences to the backend to fetch matching games.
 */
function FilterPanel({
  setRecommendations,
  loading,
  setLoading,
}) {
  // Store the selected values for multi-select filters.
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);

  // Store the values for slider-based filters.
  const [rating, setRating] = useState(4);
  const [releaseYear, setReleaseYear] = useState(2018);
  const [playtime, setPlaytime] = useState(20);

  /**
   * Sends the selected filters to the backend
   * and updates the recommendation list.
   */
  async function handleSearch() {
    setLoading(true);

    try {
      // Build the request body expected by the recommendation API.
      const requestBody = {
        genres: selectedGenres,
        platforms: selectedPlatforms,
        tags: selectedTags,
        minimum_rating: rating,
        release_year: releaseYear,
        max_playtime: playtime,
        stores: selectedStores,
      };

      console.log("Sending Request:", requestBody);

      const response = await api.post("/recommend", requestBody);

      console.log("Recommendations:", response.data);

      setRecommendations(response.data);
    } catch (error) {
      console.error("Recommendation Error:", error);

      alert("Failed to fetch recommendations.");
    } finally {
      // Reset the loading state regardless of the request result.
      setLoading(false);
    }
  }

  return (
<div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">      {/* Decorative background glow. */}
      <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative p-7">
        {/* Panel heading and description. */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="mb-3 inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            Recommendation Engine
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white">
            Your Preferences
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Customize your gaming profile by selecting genres, platforms,
            ratings, release years, playtime, and stores to receive personalized
            recommendations.
          </p>
        </div>

        {/* Individual filter components. */}
        <div className="space-y-7">
          <GenreFilter
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />

          <PlatformFilter
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
          />

          <TagFilter
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />

          <RatingSlider
            rating={rating}
            setRating={setRating}
          />

          <ReleaseYearSlider
            releaseYear={releaseYear}
            setReleaseYear={setReleaseYear}
          />

          <PlaytimeSlider
            playtime={playtime}
            setPlaytime={setPlaytime}
          />

          <StoreFilter
            selectedStores={selectedStores}
            setSelectedStores={setSelectedStores}
          />

          <div className="pt-3">
            <SearchButton
              onClick={handleSearch}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;