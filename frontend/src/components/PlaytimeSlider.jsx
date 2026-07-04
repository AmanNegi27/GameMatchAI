function PlaytimeSlider({
    playtime,
    setPlaytime
}) {

    return (

        <div className="bg-slate-700 rounded-xl p-4">

            <h3 className="text-white font-semibold mb-4">
                ⏱️ Maximum Playtime
            </h3>

            <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={playtime}
                onChange={(e) => setPlaytime(Number(e.target.value))}
                className="w-full cursor-pointer"
            />

            <div className="mt-3 text-center text-violet-300 font-semibold">
                {playtime} Hours
            </div>

        </div>

    );

}

export default PlaytimeSlider;