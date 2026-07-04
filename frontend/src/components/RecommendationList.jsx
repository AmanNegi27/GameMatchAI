import GameCard from "./GameCard";
import { FaGamepad } from "react-icons/fa";

function RecommendationList({
  recommendations,
  loading,
}) {
  return (
    // Main recommendations section
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl min-h-[760px]">

      {/* Section header */}
      <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">

        <div>

          {/* Small section badge */}
          <div className="mb-3 inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            AI Recommendations
          </div>

          {/* Section title */}
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Recommended Games
          </h2>

          {/* Short description */}
          <p className="mt-2 text-slate-400">
            Personalized game recommendations generated from your selected
            preferences.
          </p>

        </div>

        {/* Number of recommendations found */}
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-violet-500/20 bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2 font-semibold text-white shadow-lg shadow-violet-900/30">
          <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse"></span>
          {recommendations.length} Results
        </div>

      </div>

      {/* Display loading skeletons while recommendations are being fetched */}
      {loading && (
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50"
            >
              <div className="h-44 bg-slate-700/40"></div>

              <div className="space-y-4 p-5">
                <div className="h-6 w-3/4 rounded bg-slate-700/40"></div>

                <div className="h-4 w-1/2 rounded bg-slate-700/30"></div>

                <div className="flex gap-2">
                  <div className="h-8 w-20 rounded-full bg-slate-700/40"></div>
                  <div className="h-8 w-24 rounded-full bg-slate-700/40"></div>
                </div>

                <div className="h-4 w-full rounded bg-slate-700/30"></div>

                <div className="h-4 w-5/6 rounded bg-slate-700/30"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message shown before searching or when no games are found */}
      {!loading && recommendations.length === 0 && (
        <div className="flex min-h-[520px] flex-col items-center justify-center px-6 text-center">

          {/* Empty state icon */}
          <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-700 shadow-[0_0_45px_rgba(139,92,246,0.35)]">
            <FaGamepad className="text-5xl text-white" />
          </div>

          {/* Empty state heading */}
          <h3 className="text-3xl font-bold text-white">
            Ready to Discover Your Next Favorite Game?
          </h3>

          {/* Instructions for the user */}
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
            Choose your preferred genres, platforms, ratings, release years,
            and other filters, then click
            <span className="font-semibold text-violet-400">
              {" "}
              Find My Next Game
            </span>{" "}
            to receive personalized AI-powered recommendations.
          </p>

        </div>
      )}

      {/* Display recommended games */}
      {!loading && recommendations.length > 0 && (
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-2">

          {recommendations.map((game) => (
            <GameCard
              key={game.id}
              game={game}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default RecommendationList;