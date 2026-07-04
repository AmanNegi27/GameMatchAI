import { FaStar } from "react-icons/fa";

function RatingSlider({
  rating,
  setRating,
}) {
  return (
    // Rating filter card
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-sm">

      {/* Filter title and selected rating */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* Rating icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-yellow-900/30">
            <FaStar />
          </div>

          {/* Filter heading */}
          <div>

            <h3 className="font-semibold text-white">
              Minimum Rating
            </h3>

            <p className="text-xs text-slate-400">
              Show only highly rated games
            </p>

          </div>

        </div>

        {/* Display the selected rating */}
        <div className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 text-sm font-bold text-slate-900 shadow-md">
          {rating}.0 ★
        </div>

      </div>

      {/* Slider to choose the minimum rating */}
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="
          slider
          h-2
          w-full
          cursor-pointer
          appearance-none
          rounded-full
          bg-slate-700
        "
      />

      {/* Minimum and maximum rating labels */}
      <div className="mt-3 flex justify-between text-xs font-medium text-slate-500">
        <span>1 ★</span>
        <span>5 ★</span>
      </div>

      {/* Short summary of the selected filter */}
      <div className="mt-5 rounded-xl border border-yellow-500/10 bg-yellow-500/5 px-4 py-3">
        <p className="text-center text-sm text-slate-300">
          Showing games rated{" "}
          <span className="font-semibold text-yellow-300">
            {rating}.0 stars
          </span>{" "}
          or higher.
        </p>
      </div>

    </div>
  );
}

export default RatingSlider;