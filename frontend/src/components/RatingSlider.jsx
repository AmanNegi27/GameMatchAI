function RatingSlider({
    rating,
    setRating
}) {

    return (

        <div className="bg-slate-700 rounded-xl p-4">

            <h3 className="text-white font-semibold mb-4">
                ⭐ Minimum Rating
            </h3>

            <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full cursor-pointer"
            />

            <div className="mt-3 text-center text-violet-300 font-semibold">
                {rating} ⭐ & Above
            </div>

        </div>

    );

}

export default RatingSlider;