import { useState } from "react";

import Header from "../components/Header";
import FilterPanel from "../components/FilterPanel";
import RecommendationList from "../components/RecommendationList";

function Home() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] =useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070B17] via-[#111827] to-[#0F172A] text-white">
      <Header />

      <main className="mx-auto w-full max-w-[1700px] px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="self-start lg:sticky lg:top-8">
            <FilterPanel
              setRecommendations={setRecommendations}
              loading={loading}
              setLoading={setLoading}
            />
          </aside>

          {/* Recommendations */}
          <section className="min-w-0">
            <RecommendationList
              recommendations={recommendations}
              loading={loading}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;