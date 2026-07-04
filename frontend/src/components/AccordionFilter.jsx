import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function AccordionFilter({
  title,
  icon,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          group
          flex
          w-full
          items-center
          justify-between
          px-5
          py-4
          transition-all
          duration-300
          hover:bg-white/5
        "
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-lg shadow-violet-900/30">
              {icon}
            </div>
          )}

          <div className="text-left">
            <h3 className="font-semibold tracking-wide text-white">
              {title}
            </h3>

            <p className="text-xs text-slate-400">
              Click to {isOpen ? "collapse" : "expand"}
            </p>
          </div>
        </div>

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-slate-800
            text-slate-300
            transition-all
            duration-300
            group-hover:bg-violet-600
            group-hover:text-white
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          <FaChevronDown />
        </div>
      </button>

      <div
        className={`
          grid
          transition-all
          duration-300
          ease-in-out
          ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/5 px-5 pb-5 pt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccordionFilter;