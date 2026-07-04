import { FaArrowRight, FaGamepad } from "react-icons/fa";

function SearchButton({ onClick, loading }) {
  return (
    // Button to fetch game recommendations
    <button
      onClick={onClick}
      disabled={loading}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        via-purple-600
        to-fuchsia-600
        px-6
        py-4
        font-semibold
        text-white
        shadow-lg
        shadow-violet-900/30
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_40px_rgba(124,58,237,0.45)]
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:hover:translate-y-0
        disabled:hover:shadow-lg
      "
    >
      {/* Shine animation on hover */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      {/* Button content */}
      <span className="relative flex items-center justify-center gap-3">

        {/* Show loading state while recommendations are being fetched */}
        {loading ? (
          <>
            {/* Loading spinner */}
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            <span>Finding Your Perfect Games...</span>
          </>
        ) : (
          <>
            {/* Game icon */}
            <FaGamepad className="text-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

            {/* Button label */}
            <span>Find My Next Game</span>

            {/* Arrow icon */}
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}

      </span>

    </button>
  );
}

export default SearchButton;