import { useEffect, useState } from "react";
import api from "../api/api";
import AccordionFilter from "./AccordionFilter";

function PlatformFilter({
    selectedPlatforms,
    setSelectedPlatforms
}) {

    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {

        async function fetchPlatforms() {

            try {

                const response = await api.get("/platforms");

                setPlatforms(response.data);

            }

            catch (error) {

                console.error(error);

            }

        }

        fetchPlatforms();

    }, []);

    function togglePlatform(id) {

        if (selectedPlatforms.includes(id)) {

            setSelectedPlatforms(
                selectedPlatforms.filter(
                    platformId => platformId !== id
                )
            );

        }

        else {

            setSelectedPlatforms([
                ...selectedPlatforms,
                id
            ]);

        }

    }

    return (

        <AccordionFilter title="🎮 Platform">

            <div className="space-y-3">

                {

                    platforms.map((platform) => (

                        <button
                            key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            className={`
                                w-full
                                text-left
                                px-4
                                py-2
                                rounded-lg
                                transition
                                duration-200
                                ${
                                    selectedPlatforms.includes(platform.id)
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-800 text-slate-300 hover:bg-slate-600"
                                }
                            `}
                        >

                            {platform.name}

                        </button>

                    ))

                }

            </div>

        </AccordionFilter>

    );

}

export default PlatformFilter;