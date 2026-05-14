import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../stores/authStore";

function AuthorDashboard() {
  const navigate = useNavigate();
  const { currentUser, authChecked, articles, readAuthorArticles, logout, loading, error } =
    userAuth();

  useEffect(() => {
    if (!authChecked) {
      return;
    }

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.role !== "AUTHOR") {
      navigate("/user-dashboard");
      return;
    }

    readAuthorArticles(currentUser._id || currentUser.userId);
  }, [authChecked, currentUser, navigate, readAuthorArticles]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome, {currentUser?.firstName || "Author"}
            </h1>
            <p className="text-slate-600">
              Your articles are loaded from the backend, so refresh keeps them visible.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/add-article"
              className="rounded bg-sky-500 px-4 py-2 font-semibold text-white"
            >
              Create Article
            </Link>
            <button
              onClick={logout}
              className="rounded bg-slate-900 px-4 py-2 font-semibold text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {error && <p className="mb-4 rounded bg-red-100 px-4 py-3 text-red-700">{error}</p>}
        {loading && <p className="mb-4 text-slate-600">Loading articles...</p>}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article._id}
              className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
                {article.category}
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{article.title}</h2>
              <p className="mt-3 line-clamp-5 text-slate-600">{article.content}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorDashboard;
