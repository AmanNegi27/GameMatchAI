function GameCard({ game }) {

    return (

        <div className="bg-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-violet-700/20 transition duration-300">

            {/* Game Image */}

            <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-64 object-cover"
            />

            {/* Content */}

            <div className="p-6">

                {/* Title & Match Score */}

                <div className="flex justify-between items-start">

                    <h2 className="text-2xl font-bold text-white">
                        {game.name}
                    </h2>

                    <span className="bg-violet-600 text-white px-3 py-1 rounded-full font-semibold">

                        {game.match_score}% Match

                    </span>

                </div>

                {/* Rating & Release Year */}

                <div className="flex gap-6 mt-4 text-slate-300">

                    <p>
                        ⭐ <span className="font-semibold">{game.rating}</span>
                    </p>

                    <p>
                        📅 {game.release_year}
                    </p>

                </div>

                {/* Genres */}

                <div className="mt-5">

                    <h3 className="text-violet-400 font-semibold mb-2">
                        Genres
                    </h3>

                    <div className="flex flex-wrap gap-2">

                        {game.genres.map((genre) => (

                            <span
                                key={genre}
                                className="bg-slate-800 text-slate-200 px-3 py-1 rounded-full text-sm"
                            >
                                {genre}
                            </span>

                        ))}

                    </div>

                </div>

                {/* Platforms */}

                <div className="mt-5">

                    <h3 className="text-violet-400 font-semibold mb-2">
                        Platforms
                    </h3>

                    <div className="flex flex-wrap gap-2">

                        {game.platforms.map((platform) => (

                            <span
                                key={platform}
                                className="bg-slate-800 text-slate-200 px-3 py-1 rounded-full text-sm"
                            >
                                {platform}
                            </span>

                        ))}

                    </div>

                </div>

                {/* Tags */}

                <div className="mt-5">

                    <h3 className="text-violet-400 font-semibold mb-2">
                        Tags
                    </h3>

                    <div className="flex flex-wrap gap-2">

                        {game.tags.map((tag) => (

                            <span
                                key={tag}
                                className="bg-slate-800 text-slate-200 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>

                        ))}

                    </div>

                </div>

                {/* Stores */}

                <div className="mt-5">

                    <h3 className="text-violet-400 font-semibold mb-2">
                        Stores
                    </h3>

                    <div className="flex flex-wrap gap-2">

                        {game.stores.map((store) => (

                            <span
                                key={store}
                                className="bg-slate-800 text-slate-200 px-3 py-1 rounded-full text-sm"
                            >
                                {store}
                            </span>

                        ))}

                    </div>

                </div>

                {/* Matched On */}

                <div className="mt-6">

                    <h3 className="text-green-400 font-semibold mb-2">
                        Matched On
                    </h3>

                    <p className="text-slate-300">
                        {game.matched_on.join(", ")}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default GameCard;