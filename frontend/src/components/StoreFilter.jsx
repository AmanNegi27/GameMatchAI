import { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa";
import api from "../api/api";
import AccordionFilter from "./AccordionFilter";

function StoreFilter({
  selectedStores,
  setSelectedStores,
}) {
  // Stores all available game stores from the backend
  const [stores, setStores] = useState([]);

  // Fetch stores when the component loads
  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await api.get("/stores");
        setStores(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStores();
  }, []);

  // Add or remove a store from the selected list
  function toggleStore(id) {
    if (selectedStores.includes(id)) {
      setSelectedStores(
        selectedStores.filter(
          (storeId) => storeId !== id
        )
      );
    } else {
      setSelectedStores([
        ...selectedStores,
        id,
      ]);
    }
  }

  return (
    // Reusable accordion for store selection
    <AccordionFilter
      title="Stores"
      icon={<FaStore />}
    >
      {/* Scrollable list of stores */}
      <div className="max-h-72 overflow-y-auto pr-1">
        <div className="grid gap-2">

          {/* Display all available stores */}
          {stores.map((store) => {
            const selected = selectedStores.includes(store.id);

            return (
              <button
                key={store.id}
                onClick={() => toggleStore(store.id)}
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
                      ? "border-emerald-500/40 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30"
                      : "border-white/5 bg-slate-800/60 text-slate-300 hover:border-emerald-500/20 hover:bg-slate-700/70 hover:text-white"
                  }
                `}
              >
                {/* Store name */}
                <span className="font-medium">
                  {store.name}
                </span>

                {/* Shows whether the store is selected */}
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
                        ? "bg-white text-emerald-600"
                        : "border border-slate-600 text-slate-500 group-hover:border-emerald-400 group-hover:text-emerald-300"
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

export default StoreFilter;