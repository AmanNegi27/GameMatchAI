import { useEffect, useState } from "react";
import api from "../api/api";
import AccordionFilter from "./AccordionFilter";

function StoreFilter({
    selectedStores,
    setSelectedStores
}) {

    const [stores, setStores] = useState([]);

    useEffect(() => {

        async function fetchStores() {

            try {

                const response = await api.get("/stores");

                setStores(response.data);

            }

            catch (error) {

                console.error(error);

            }

        }

        fetchStores();

    }, []);

    function toggleStore(id) {

        if (selectedStores.includes(id)) {

            setSelectedStores(
                selectedStores.filter(
                    storeId => storeId !== id
                )
            );

        }

        else {

            setSelectedStores([
                ...selectedStores,
                id
            ]);

        }

    }

    return (

        <AccordionFilter title="🛒 Store">

            <div className="space-y-2">

                {

                    stores.map((store) => (

                        <button
                            key={store.id}
                            onClick={() => toggleStore(store.id)}
                            className={`
                                w-full
                                text-left
                                px-4
                                py-2
                                rounded-lg
                                transition
                                duration-200
                                ${
                                    selectedStores.includes(store.id)
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-800 text-slate-300 hover:bg-slate-600"
                                }
                            `}
                        >

                            {store.name}

                        </button>

                    ))

                }

            </div>

        </AccordionFilter>

    );

}

export default StoreFilter;