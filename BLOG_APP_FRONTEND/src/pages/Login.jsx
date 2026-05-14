import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getErrorMessage, loginUser } from "../services/api";

function Login({ setCurrentUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const user = await loginUser(formData);
      setCurrentUser(user);
      toast.success("Login successful");
      const fallbackPath = user.role === "AUTHOR" ? "/author-profile" : "/user-profile";
      navigate(location.state?.from?.pathname || fallbackPath, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-145px)] items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
      >
        <h1 className="text-3xl font-bold text-slate-950">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600">Login to continue to your blog dashboard.</p>

        <label className="mt-6 block text-sm font-semibold text-slate-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          placeholder="you@example.com"
        />

        <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          placeholder="Enter your password"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          New here?{" "}
          <Link to="/register" className="font-semibold text-sky-700 hover:text-sky-800">
            Create an account
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
