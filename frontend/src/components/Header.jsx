import { FaGamepad } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-slate-950 border-b border-slate-800 shadow-lg">

      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        <div className="flex items-center gap-4">

          <div className="bg-violet-600 p-3 rounded-xl shadow-lg">
            <FaGamepad className="text-3xl text-white" />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-white tracking-wide">
              GameMatch
            </h1>

            <p className="text-slate-400">
              Discover your next favorite game.
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;