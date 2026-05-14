import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import ArticleCard from "../components/ArticleCard";
import { deleteArticle, getAuthorArticles, getErrorMessage } from "../services/api";

function AuthorProfile({ currentUser }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadArticles = useCallback(async () => {
    try {
      setLoading(true);
      setArticles(await getAuthorArticles(currentUser._id));
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not fetch your articles"));
    } finally {
      setLoading(false);
    }
  }, [currentUser._id]);

  useEffect(() => {
    if (currentUser?._id) {
      loadArticles();
    }
  }, [currentUser?._id, loadArticles]);

  const handleDelete = async (article) => {
    const confirmed = window.confirm(`Delete "${article.title}"?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteArticle(article._id);
      toast.success("Article deleted successfully");
      setArticles((current) => current.filter((item) => item._id !== article._id));
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete article"));
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
            Author Profile
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
            Welcome, {currentUser?.firstName || "Author"}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Manage your published articles and keep your content current.
          </p>
        </div>
        <Link
          to="/add-article"
          className="w-fit rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Add Article
        </Link>
      </div>

      {loading ? (
        <p className="rounded-lg bg-white p-6 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
          Loading your articles...
        </p>
      ) : articles.length === 0 ? (
        <p className="rounded-lg bg-white p-8 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
          You have not created any articles yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              showActions
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default AuthorProfile;
