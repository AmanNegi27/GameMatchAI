import { FaClock } from "react-icons/fa";

function PlaytimeSlider({
  playtime,
  setPlaytime,
}) {
  return (
    // Playtime filter card
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-sm">

      {/* Filter title and current selected value */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* Playtime icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-900/30">
            <FaClock />
          </div>

          {/* Filter heading */}
          <div>

            <h3 className="font-semibold text-white">
              Maximum Playtime
            </h3>

            <p className="text-xs text-slate-400">
              Filter by estimated completion time
            </p>

          </div>

        </div>

        {/* Display the selected playtime */}
        <div className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-bold text-white shadow-md">
          {playtime} hrs
        </div>

      </div>

      {/* Slider to choose maximum playtime */}
      <input
        type="range"
        min="1"
        max="100"
        step="1"
        value={playtime}
        onChange={(e) => setPlaytime(Number(e.target.value))}
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

      {/* Slider range labels */}
      <div className="mt-3 flex justify-between text-xs font-medium text-slate-500">
        <span>1 hr</span>
        <span>100 hrs</span>
      </div>

    </div>
  );
}

export default PlaytimeSlider;