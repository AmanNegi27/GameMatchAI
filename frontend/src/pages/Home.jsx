import { useState } from "react";

import Header from "../components/Header";
import FilterPanel from "../components/FilterPanel";
import RecommendationList from "../components/RecommendationList";

function Home() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070B17] via-[#111827] to-[#0F172A] text-white">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="mx-auto w-full max-w-[1700px] px-4 py-10 sm:px-6 lg:px-8 xl:px-10">

        {/* Preferences Panel */}
        <section className="mb-10">
          <FilterPanel
            setRecommendations={setRecommendations}
            loading={loading}
            setLoading={setLoading}
          />
        </section>

        {/* Recommendation Section */}
        <section>
          <RecommendationList
            recommendations={recommendations}
            loading={loading}
          />
        </section>

      </main>

    </div>
  );
}

export default Home;