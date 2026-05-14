import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  formatIST,
  getArticleById,
  getAuthorName,
  getErrorMessage,
  getImageUrl,
} from "../services/api";

function ArticleByID() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setArticle(await getArticleById(id));
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not fetch article"));
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center text-slate-600">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <p className="rounded-lg bg-white p-8 text-slate-600 shadow-sm ring-1 ring-slate-200">
          Article not found.
        </p>
      </div>
    );
  }

  const imageUrl = getImageUrl(article);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/user-profile" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
        Back to articles
      </Link>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={article.title}
          className="mt-6 h-72 w-full rounded-lg object-cover shadow-sm"
        />
      )}
      <div className="mt-6 rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
          {article.category}
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
          {article.title}
        </h1>
        <div className="mt-5 grid gap-2 text-sm text-slate-500 sm:grid-cols-3">
          <p>By {getAuthorName(article.author)}</p>
          <p>Created: {formatIST(article.createdAt)}</p>
          <p>Updated: {formatIST(article.updatedAt)}</p>
        </div>
        <div className="mt-8 whitespace-pre-wrap text-lg leading-9 text-slate-700">
          {article.content}
        </div>
      </div>
    </article>
  );
}

export default ArticleByID;
