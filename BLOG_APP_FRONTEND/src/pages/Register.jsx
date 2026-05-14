import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getErrorMessage, registerUser } from "../services/api";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "USER",
  profilePic: null,
};

function Register() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((current) => ({ ...current, [name]: files || value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await registerUser(formData);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(getErrorMessage(error, "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-145px)] items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
      >
        <h1 className="text-3xl font-bold text-slate-950">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">
          Register as a reader or author and start using the blog.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
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
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
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
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="block text-sm font-semibold text-slate-700">Role</p>
            <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
              {["USER", "AUTHOR"].map((role) => (
                <label
                  key={role}
                  className={`cursor-pointer rounded-md px-4 py-2 text-center text-sm font-semibold transition ${
                    formData.role === role ? "bg-white text-slate-950 shadow-sm" : "text-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {role === "USER" ? "Reader" : "Author"}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700" htmlFor="profilePic">
              Profile Image
            </label>
            <input
              id="profilePic"
              name="profilePic"
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-sky-700 hover:text-sky-800">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
