import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userAuth } from "../stores/authStore";

function Login() {
  const { register, handleSubmit } = useForm();
  const { login, isAuthenticated, currentUser, error } = userAuth();
  const navigate = useNavigate();

  const onUserLogin = async (data) => {
    const user = await login(data);
    if (!user) {
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      return;
    }

    if (currentUser.role === "AUTHOR") {
      navigate("/author-dashboard");
      return;
    }

    navigate("/user-dashboard");
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <form onSubmit={handleSubmit(onUserLogin)} className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-pink-700 mb-6">Login</h1>
        {error && <p className="mb-4 rounded bg-red-100 px-3 py-2 text-red-700">{error}</p>}
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 mb-3 bg-gray-100 border rounded"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full p-2 mb-3 bg-gray-100 border rounded"
        />
        <button className="bg-cyan-500 text-white p-2 w-full rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
