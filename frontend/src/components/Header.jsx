import { FaGamepad } from "react-icons/fa";
import HeroCarousel from "./HeroCarousel";

function Header() {
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#0B1020] via-[#111827] to-[#1A1333]">

      {/* Background Glow */}
      <div className="absolute inset-0">

        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      <div className="relative mx-auto max-w-[1700px] px-4 py-10 sm:px-6 lg:px-8 xl:px-10">

        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

          {/* LEFT CONTENT */}

          <div className="max-w-3xl">

            {/* Badge */}

            <div className="mb-4 inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">

              AI Powered Game Discovery

            </div>

            <div className="flex items-center gap-5">

              {/* Logo */}

              <div className="group flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500 to-purple-700 shadow-[0_0_40px_rgba(139,92,246,.35)] transition-all duration-300 hover:scale-105">

                <FaGamepad className="text-4xl text-white transition-transform duration-300 group-hover:rotate-12" />

              </div>

              {/* Title */}

              <div>

                <h1 className="text-5xl font-extrabold tracking-tight text-white">

                  GameMatch{" "}

                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

                    AI

                  </span>

                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">

                  Discover your next favorite game with intelligent
                  recommendations tailored to your preferences across
                  genres, platforms, ratings and gameplay styles.

                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <HeroCarousel />

        </div>

      </div>

    </header>
  );
}

export default Header;