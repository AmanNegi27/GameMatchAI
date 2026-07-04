import { FaGamepad } from "react-icons/fa";

function Header() {
  return (
    // Main header section
    <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#0B1020] via-[#111827] to-[#1A1333]">

      {/* Background glow effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Header content */}
      <div className="relative mx-auto flex max-w-[1700px] items-center justify-between px-4 py-10 sm:px-6 lg:px-8 xl:px-10">

        <div className="flex items-center gap-6">

          {/* Logo icon */}
          <div className="group flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500 to-purple-700 shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_55px_rgba(139,92,246,0.55)]">

            <FaGamepad className="text-4xl text-white transition-transform duration-300 group-hover:rotate-6" />

          </div>

          {/* Application title and description */}
          <div>

            {/* Small badge */}
            <div className="mb-3 inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
              AI Powered Game Discovery
            </div>

            {/* Main heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              GameMatch{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                AI
              </span>
            </h1>

            {/* Short description */}
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Discover your next favorite game with intelligent recommendations
              tailored to your preferences across genres, platforms, ratings,
              and gameplay styles.
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;