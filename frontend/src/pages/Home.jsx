import { useState } from "react";

import Header from "../components/Header";
import FilterPanel from "../components/FilterPanel";
import RecommendationList from "../components/RecommendationList";

function Home() {

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    return (

        <div className="min-h-screen bg-slate-900">

            <Header />

            <main className="max-w-7xl mx-auto px-8 py-8">

                <div className="grid grid-cols-12 gap-8">

                    <aside className="col-span-3">

                        <FilterPanel
                            setRecommendations={setRecommendations}
                            loading={loading}
                            setLoading={setLoading}
                        />

                    </aside>

                    <section className="col-span-9">

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