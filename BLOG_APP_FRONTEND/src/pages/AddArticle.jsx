import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createArticle, getErrorMessage } from "../services/api";

const initialForm = {
  title: "",
  category: "",
  content: "",
  imageUrl: "",
};

function AddArticle() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createArticle(formData);
      toast.success("Article created successfully");
      navigate("/author-profile");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not create article"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-sky-700">New Article</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Add Article</h1>
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
          placeholder="https://example.com/image.jpg"
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
          disabled={loading}
          className="mt-6 rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Article"}
        </button>
      </form>
    </section>
  );
}

export default AddArticle;
