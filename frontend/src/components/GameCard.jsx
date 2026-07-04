import {
  FaStar,
  FaCalendarAlt,
  FaStore,
  FaBolt,
} from "react-icons/fa";

function GameCard({ game }) {
  return (
    <div className="game-card group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_30px_70px_rgba(124,58,237,0.35)]">

      {/* Animated Border */}

      <span className="line-top"></span>
      <span className="line-right"></span>
      <span className="line-bottom"></span>
      <span className="line-left"></span>

      {/* IMAGE */}

      <div className="relative h-80 overflow-hidden">

        <img
          src={game.background_image}
          alt={game.name}
          className="h-full w-full object-cover object-contain transition-all duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Match Badge */}

        <div className="match-badge absolute right-4 top-4">

          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-violet-400/40 bg-slate-900/80 backdrop-blur-lg shadow-lg shadow-violet-500/20">

            <span className="text-lg font-bold leading-none text-white">
              {game.match_score}%
            </span>

            <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              MATCH
            </span>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-2">

        {/* TITLE */}

        <h2 className="text-2xl font-bold leading-tight text-white transition-all duration-300 group-hover:text-violet-300">

          {game.name}

        </h2>

        {/* META */}

        <div className="mt-4 flex flex-wrap gap-3">

          <div className="chip flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-sm text-yellow-300">

            <FaStar className="text-xs" />

            <span className="font-semibold">

              {game.rating}

            </span>

          </div>

          <div className="chip flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-sm text-sky-300">

            <FaCalendarAlt className="text-xs" />

            {game.release_year}

          </div>

        </div>

        {/* GENRES */}

        <div className="mt-5 flex gap-4">

          <div className="w-20 shrink-0">

            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-300">

              Genres

            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            {game.genres.map((genre) => (

              <span
                key={genre}
                className="chip rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200"
              >
                {genre}
              </span>

            ))}

          </div>

        </div>

        {/* PLATFORMS */}

        <div className="mt-4 flex gap-4">

          <div className="w-20 shrink-0">

            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">

              Platforms

            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            {game.platforms.map((platform) => (

              <span
                key={platform}
                className="chip rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200"
              >
                {platform}
              </span>

            ))}

          </div>

        </div>

                {/* TAGS */}

        <div className="mt-4 flex gap-4">

          <div className="w-20 shrink-0">

            <span className="rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pink-300">

              Tags

            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            {game.tags.map((tag) => (

              <span
                key={tag}
                className="chip rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-200"
              >

                #{tag}

              </span>

            ))}

          </div>

        </div>

        {/* STORES */}

        <div className="mt-4 flex gap-4">

          <div className="w-20 shrink-0">

            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">

              Stores

            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            {game.stores.map((store) => (

              <span
                key={store}
                className="chip flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200"
              >

                <FaStore className="text-[10px]" />

                {store}

              </span>

            ))}

          </div>

        </div>

        {/* MATCHED ON */}

        <div className="mt-6 rounded-2xl border border-violet-500/10 bg-gradient-to-r from-slate-800/60 to-slate-900/70 p-4">

          <div className="mb-3 flex items-center gap-2 font-semibold text-violet-300">

            <FaBolt />

            Matched On

          </div>

          <div className="flex flex-wrap gap-2">

            {game.matched_on.map((item) => (

              <span
                key={item}
                className="chip rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-violet-900/30"
              >

                {item}

              </span>

            ))}

          </div>

        </div>
              </div>

    </div>
  );
}

export default GameCard;