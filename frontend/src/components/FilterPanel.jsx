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
    setLoading
}) {

    // Multi-select filters
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedStores, setSelectedStores] = useState([]);

    // Slider filters
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
                stores: selectedStores
            };

            console.log("Sending Request:", requestBody);

            const response = await api.post(
                "/recommend",
                requestBody
            );

            console.log("Recommendations:", response.data);

            setRecommendations(response.data);

        }

        catch (error) {

            console.error("Recommendation Error:", error);

            alert("Failed to fetch recommendations.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 sticky top-6">

            <h2 className="text-2xl font-bold text-white mb-2">
                🎯 Your Preferences
            </h2>

            <p className="text-slate-400 mb-8">
                Select your gaming preferences.
            </p>

            <div className="space-y-6">

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

                <SearchButton
                    onClick={handleSearch}
                    loading={loading}
                />

            </div>

        </div>

    );

}

export default FilterPanel;