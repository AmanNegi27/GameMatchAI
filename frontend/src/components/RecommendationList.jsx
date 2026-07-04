import GameCard from "./GameCard";

function RecommendationList({
    recommendations,
    loading
}) {

    return (

        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 min-h-[750px]">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-2xl font-bold text-white">
                        Recommended Games
                    </h2>

                    <p className="text-slate-400">
                        Your personalized game recommendations.
                    </p>

                </div>

                <span className="bg-violet-600 text-white px-4 py-2 rounded-full">

                    {recommendations.length} Results

                </span>

            </div>

            {/* Loading */}

            {loading && (

                <div className="flex justify-center items-center h-96">

                    <p className="text-slate-300 text-lg">
                        Finding the perfect games...
                    </p>

                </div>

            )}

            {/* Empty State */}

            {!loading && recommendations.length === 0 && (

                <div className="flex flex-col justify-center items-center h-96 text-center">

                    <div className="text-7xl mb-4">
                        🎮
                    </div>

                    <h3 className="text-2xl font-semibold text-white mb-2">
                        No Recommendations Yet
                    </h3>

                    <p className="text-slate-400">
                        Select your preferences and click
                        <span className="text-violet-400 font-semibold">
                            {" "}Find My Next Game
                        </span>
                        .
                    </p>

                </div>

            )}

            {/* Recommendations */}

            {!loading && recommendations.length > 0 && (

                <div className="grid grid-cols-1 gap-6">

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