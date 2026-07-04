function SearchButton({ onClick, loading }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {loading ? "Finding Games..." : "🎮 Find My Next Game"}
        </button>
    );
}

export default SearchButton;