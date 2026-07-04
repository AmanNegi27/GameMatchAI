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

function FilterPanel({
  setRecommendations,
  loading,
  setLoading,
}) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);

  const [rating, setRating] = useState(4);
  const [releaseYear, setReleaseYear] = useState(2018);
  const [playtime, setPlaytime] = useState(20);

  async function handleSearch() {
    setLoading(true);

    try {
      const requestBody = {
        genres: selectedGenres,
        platforms: selectedPlatforms,
        tags: selectedTags,
        minimum_rating: rating,
        release_year: releaseYear,
        max_playtime: playtime,
        stores: selectedStores,
      };

      const response = await api.post("/recommend", requestBody);

      setRecommendations(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 shadow-[0_20px_60px_rgba(0,0,0,.45)]">

      {/* Background Glow */}

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

      </div>

      <div className="relative p-8 lg:p-10">

        {/* Header */}

        <div className="mb-10 border-b border-white/10 pb-8">

          <div className="mb-3 inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">

            Recommendation Engine

          </div>

          <h2 className="text-4xl font-bold text-white">

            Your Preferences

          </h2>

          <p className="mt-3 max-w-4xl text-slate-400 leading-7">

            Customize your gaming profile by selecting genres,
            platforms, tags, ratings, release years,
            playtime and stores to receive personalized
            AI recommendations.

          </p>

        </div>

        {/* FILTER AREA */}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                    {/* LEFT COLUMN */}

          <div className="space-y-16">

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

            <StoreFilter
              selectedStores={selectedStores}
              setSelectedStores={setSelectedStores}
            />

          </div>

          {/* RIGHT COLUMN */}

          <div className="flex flex-col gap-6">

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

          </div>

        </div>

        {/* SEARCH BUTTON */}

        <div className="mt-10 border-t border-white/10 pt-8">

          <div className="mx-auto max-w-md">

            <SearchButton
              onClick={handleSearch}
              loading={loading}
            />

          </div>

        </div>
              </div>

    </section>
  );
}

export default FilterPanel;