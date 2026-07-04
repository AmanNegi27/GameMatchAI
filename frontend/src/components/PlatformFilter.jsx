import { useEffect, useState } from "react";
import { FaGamepad } from "react-icons/fa";
import api from "../api/api";
import AccordionFilter from "./AccordionFilter";

function PlatformFilter({
  selectedPlatforms,
  setSelectedPlatforms,
}) {
  // Stores all available platforms from the backend
  const [platforms, setPlatforms] = useState([]);

  // Fetch platforms when the component is mounted
  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const response = await api.get("/platforms");
        setPlatforms(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPlatforms();
  }, []);

  // Add or remove a platform from the selected list
  function togglePlatform(id) {
    if (selectedPlatforms.includes(id)) {
      setSelectedPlatforms(
        selectedPlatforms.filter(
          (platformId) => platformId !== id
        )
      );
    } else {
      setSelectedPlatforms([
        ...selectedPlatforms,
        id,
      ]);
    }
  }

  return (
    // Reusable accordion for platform selection
    <AccordionFilter
      title="Platforms"
      icon={<FaGamepad />}
    >
      {/* Scrollable platform list */}
      <div className="max-h-72 overflow-y-auto pr-1">
        <div className="grid gap-2">

          {/* Display all available platforms */}
          {platforms.map((platform) => {
            const selected = selectedPlatforms.includes(platform.id);

            return (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
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
                      ? "border-cyan-500/40 bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-lg shadow-cyan-900/30"
                      : "border-white/5 bg-slate-800/60 text-slate-300 hover:border-cyan-500/20 hover:bg-slate-700/70 hover:text-white"
                  }
                `}
              >
                {/* Platform name */}
                <span className="font-medium">
                  {platform.name}
                </span>

                {/* Indicates whether the platform is selected */}
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
                        ? "bg-white text-cyan-600"
                        : "border border-slate-600 text-slate-500 group-hover:border-cyan-400 group-hover:text-cyan-300"
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

export default PlatformFilter;