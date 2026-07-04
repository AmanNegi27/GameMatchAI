import { useEffect, useState } from "react";
import api from "../api/api";
import AccordionFilter from "./AccordionFilter";

function TagFilter({
    selectedTags,
    setSelectedTags
}) {

    const [tags, setTags] = useState([]);

    useEffect(() => {

        async function fetchTags() {

            try {

                const response = await api.get("/tags");

                setTags(response.data);

            }

            catch (error) {

                console.error(error);

            }

        }

        fetchTags();

    }, []);

    function toggleTag(id) {

        if (selectedTags.includes(id)) {

            setSelectedTags(
                selectedTags.filter(
                    tagId => tagId !== id
                )
            );

        }

        else {

            setSelectedTags([
                ...selectedTags,
                id
            ]);

        }

    }

    return (

        <AccordionFilter title="🏷️ Tags">

            <div className="space-y-2 max-h-56 overflow-y-auto">

                {

                    tags.map((tag) => (

                        <button
                            key={tag.id}
                            onClick={() => toggleTag(tag.id)}
                            className={`
                                w-full
                                text-left
                                px-4
                                py-2
                                rounded-lg
                                transition
                                duration-200
                                ${
                                    selectedTags.includes(tag.id)
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-800 text-slate-300 hover:bg-slate-600"
                                }
                            `}
                        >

                            {tag.name}

                        </button>

                    ))

                }

            </div>

        </AccordionFilter>

    );

}

export default TagFilter;