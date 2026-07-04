import { FaCalendarAlt } from "react-icons/fa";

function ReleaseYearSlider({
  releaseYear,
  setReleaseYear,
}) {
  return (
    // Release year filter card
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-sm">

      {/* Filter title and selected year */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* Release year icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-900/30">
            <FaCalendarAlt />
          </div>

          {/* Filter heading */}
          <div>

            <h3 className="font-semibold text-white">
              Released After
            </h3>

            <p className="text-xs text-slate-400">
              Discover modern games
            </p>

          </div>

        </div>

        {/* Display the selected release year */}
        <div className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow-md">
          {releaseYear}+
        </div>

      </div>

      {/* Slider to choose the minimum release year */}
      <input
        type="range"
        min="1990"
        max="2025"
        step="1"
        value={releaseYear}
        onChange={(e) => setReleaseYear(Number(e.target.value))}
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

      {/* Minimum and maximum year labels */}
      <div className="mt-3 flex justify-between text-xs font-medium text-slate-500">
        <span>1990</span>
        <span>2025</span>
      </div>

    </div>
  );
}

export default ReleaseYearSlider;