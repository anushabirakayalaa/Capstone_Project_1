import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getArticleById, getErrorMessage, updateArticle } from "../services/api";

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const article = await getArticleById(id);
        setFormData({
          title: article.title || "",
          category: article.category || "",
          content: article.content || "",
          imageUrl: article.imageUrl || "",
        });
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not load article"));
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await updateArticle(id, formData);
      toast.success("Article updated successfully");
      navigate("/author-profile");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not update article"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="px-4 py-12 text-center text-slate-600">Loading article...</div>;
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-sky-700">Edit Article</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
          Update Article
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>
        </div>

        <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="imageUrl">
          Image URL
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        />

        <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows="10"
          value={formData.content}
          onChange={handleChange}
          className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        />

        <button
          type="submit"
          disabled={saving}
          className="mt-6 rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Update Article"}
        </button>
      </form>
    </section>
  );
}

export default EditArticle;
