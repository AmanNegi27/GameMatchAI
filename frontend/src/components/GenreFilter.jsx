import { useEffect, useState } from "react";
import { FaMasksTheater } from "react-icons/fa6";
import api from "../api/api";
import AccordionFilter from "./AccordionFilter";

function GenreFilter({
  selectedGenres,
  setSelectedGenres,
}) {
  // Stores all available genres fetched from the backend
  const [genres, setGenres] = useState([]);

  // Fetch genres once when the component loads
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await api.get("/genres");
        setGenres(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchGenres();
  }, []);

  // Add or remove a genre from the selected list
  function toggleGenre(id) {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(
        selectedGenres.filter((genreId) => genreId !== id)
      );
    } else {
      setSelectedGenres([
        ...selectedGenres,
        id,
      ]);
    }
  }

  return (
    // Reusable accordion container for genre filters
    <AccordionFilter
      title="Genres"
      icon={<FaMasksTheater />}
    >
      {/* Scrollable list of available genres */}
      <div className="max-h-72 overflow-y-auto pr-1">
        <div className="grid gap-2">

          {/* Display all genres as selectable buttons */}
          {genres.map((genre) => {
            const selected = selectedGenres.includes(genre.id);

            return (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`
                  group
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-left
                  transition-all
                  duration-200
                  ${
                    selected
                      ? "border-violet-500/40 bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-900/30"
                      : "border-white/5 bg-slate-800/60 text-slate-300 hover:border-violet-500/20 hover:bg-slate-700/70 hover:text-white"
                  }
                `}
              >
                {/* Genre name */}
                <span className="font-medium">
                  {genre.name}
                </span>

                {/* Shows whether the genre is selected */}
                <span
                  className={`
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    text-xs
                    font-bold
                    transition-all
                    ${
                      selected
                        ? "bg-white text-violet-700"
                        : "border border-slate-600 text-slate-500 group-hover:border-violet-400 group-hover:text-violet-300"
                    }
                  `}
                >
                  {selected ? "✓" : "+"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </AccordionFilter>
  );
}

export default GenreFilter;