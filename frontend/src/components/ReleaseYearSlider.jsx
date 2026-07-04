function ReleaseYearSlider({
    releaseYear,
    setReleaseYear
}) {

    return (

        <div className="bg-slate-700 rounded-xl p-4">

            <h3 className="text-white font-semibold mb-4">
                📅 Released After
            </h3>

            <input
                type="range"
                min="1990"
                max="2025"
                step="1"
                value={releaseYear}
                onChange={(e) => setReleaseYear(Number(e.target.value))}
                className="w-full cursor-pointer"
            />

            <div className="mt-3 text-center text-violet-300 font-semibold">
                {releaseYear}+
            </div>

            <p className="text-center text-slate-400 text-sm mt-2">
                Games released in {releaseYear} or later
            </p>

        </div>

    );

}

export default ReleaseYearSlider;