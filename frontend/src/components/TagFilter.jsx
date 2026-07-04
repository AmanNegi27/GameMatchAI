import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaTags } from "react-icons/fa";

import api from "../api/api";
import AccordionFilter from "./AccordionFilter";

function TagFilter({
  selectedTags,
  setSelectedTags,
}) {
  // Stores all available tags from the backend
  const [tags, setTags] = useState([]);

  // Stores the user's search input
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch tags when the component loads
  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await api.get("/tags");
        setTags(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTags();
  }, []);

  // Filter tags based on the search input
  const filteredTags = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    // Show a few tags by default when nothing is searched
    if (!query) {
      return tags.slice(0, 15);
    }

    // Return tags that match the search text
    return tags.filter((tag) =>
      tag.name.toLowerCase().includes(query)
    );
  }, [tags, searchTerm]);

  // Add or remove a tag from the selected list
  function toggleTag(id) {
    if (selectedTags.includes(id)) {
      setSelectedTags(
        selectedTags.filter((tagId) => tagId !== id)
      );
    } else {
      setSelectedTags([
        ...selectedTags,
        id,
      ]);
    }
  }

  // Get the full details of the selected tags
  const selectedTagObjects = tags.filter((tag) =>
    selectedTags.includes(tag.id)
  );

  return (
    // Reusable accordion for tag selection
    <AccordionFilter
      title="Tags"
      icon={<FaTags />}
    >
      {/* Search box */}
      <div className="relative mb-4">

        <FaSearch
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Search tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            py-2.5
            pl-10
            pr-4
            text-white
            placeholder:text-slate-500
            focus:border-pink-500
            focus:outline-none
          "
        />
      </div>

      {/* Display selected tags */}
      {selectedTagObjects.length > 0 && (
        <div className="mb-5">

          <p className="mb-2 text-xs uppercase tracking-wider text-slate-400">
            Selected Tags
          </p>

          <div className="flex flex-wrap gap-2">

            {selectedTagObjects.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className="
                  rounded-full
                  bg-pink-600
                  px-3
                  py-1.5
                  text-sm
                  font-medium
                  text-white
                  hover:bg-pink-700
                  transition
                "
              >
                {tag.name} ✕
              </button>
            ))}

          </div>

        </div>
      )}

      {/* Matching tags */}
      <div className="max-h-72 overflow-y-auto pr-2">
        <div className="grid gap-2">

          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => {
              const selected = selectedTags.includes(tag.id);

              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
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
                        ? "border-pink-500/40 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white shadow-lg shadow-pink-900/30"
                        : "border-white/5 bg-slate-800/60 text-slate-300 hover:border-pink-500/20 hover:bg-slate-700/70 hover:text-white"
                    }
                  `}
                >
                  {/* Tag name */}
                  <span className="font-medium">
                    {tag.name}
                  </span>

                  {/* Indicates whether the tag is selected */}
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
                          ? "bg-white text-pink-600"
                          : "border border-slate-600 text-slate-500 group-hover:border-pink-400 group-hover:text-pink-300"
                      }
                    `}
                  >
                    {selected ? "✓" : "+"}
                  </span>
                </button>
              );
            })
          ) : (
            // Message shown when no tags match the search
            <div className="py-6 text-center text-slate-400">
              No matching tags found.
            </div>
          )}

        </div>
      </div>
    </AccordionFilter>
  );
}

export default TagFilter;