import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ArticleCard from "../components/ArticleCard";
import { getAllArticles, getErrorMessage } from "../services/api";

function UserProfile({ currentUser }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setArticles(await getAllArticles());
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not fetch articles"));
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-sky-700">Reader Profile</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
          Welcome, {currentUser?.firstName || "Reader"}
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Browse active articles from every author.
        </p>
      </div>

      {loading ? (
        <p className="rounded-lg bg-white p-6 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
          Loading articles...
        </p>
      ) : articles.length === 0 ? (
        <p className="rounded-lg bg-white p-8 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
          No articles are available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}

export default UserProfile;
