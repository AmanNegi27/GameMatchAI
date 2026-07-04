import { useEffect, useState } from "react";
import api from "../api/api";
import AccordionFilter from "./AccordionFilter";

function GenreFilter({
    selectedGenres,
    setSelectedGenres
}) {

    const [genres, setGenres] = useState([]);

    useEffect(() => {

        async function fetchGenres() {

            try {

                const response = await api.get("/genres");

                setGenres(response.data);

            }

            catch (error) {

                console.error(error);

            }

        }

        fetchGenres();

    }, []);

    function toggleGenre(id) {

        if (selectedGenres.includes(id)) {

            setSelectedGenres(
                selectedGenres.filter(
                    genreId => genreId !== id
                )
            );

        }

        else {

            setSelectedGenres([
                ...selectedGenres,
                id
            ]);

        }

    }

    return (

        <AccordionFilter title="🎭 Genre">

            <div className="space-y-3">

                {

                    genres.map((genre) => (

                        <button
                            key={genre.id}
                            onClick={() => toggleGenre(genre.id)}
                            className={`
                                w-full
                                text-left
                                px-4
                                py-2
                                rounded-lg
                                transition
                                duration-200
                                ${
                                    selectedGenres.includes(genre.id)
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-800 text-slate-300 hover:bg-slate-600"
                                }
                            `}
                        >

                            {genre.name}

                        </button>

                    ))

                }

            </div>

        </AccordionFilter>

    );

}

export default GenreFilter;