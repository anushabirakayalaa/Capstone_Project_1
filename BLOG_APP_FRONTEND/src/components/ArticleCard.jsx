import { Link } from "react-router-dom";

import { formatIST, getAuthorName, getImageUrl, getPreview } from "../services/api";

function ArticleCard({ article, showActions = false, onDelete }) {
  const imageUrl = getImageUrl(article);

  return (
    <article className="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
    
      <div className="flex min-h-72 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
          {article.category}
        </p>
        <h2 className="mt-2 line-clamp-2 text-xl font-bold leading-snug text-slate-950">
          {article.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {getPreview(article.content)}
        </p>
        <div className="mt-4 space-y-1 text-xs text-slate-500">
          <p>By {getAuthorName(article.author)}</p>
          <p>{formatIST(article.createdAt)}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link
            to={`/article/${article._id}`}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Read More
          </Link>
          {showActions && (
            <>
              <Link
                to={`/edit-article/${article._id}`}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => onDelete(article)}
                className="rounded-md border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
