import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans p-6">
      <h1 className="text-4xl font-bold mb-2 relative">
        BLOG PLATFORM
        <span className="absolute left-0 w-full "></span>
      </h1>
      <p className="text-gray-500 mt-6 text-xl">
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-[#EAEAEA] p-8 rounded-sm flex flex-col items-center shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Get Started</h2>
          <div className="flex flex-col gap-4 w-full">
            <Link
              to="/login"
              className="bg-[#7BC9F5] text-black text-center py-3 rounded-sm text-xl font-medium hover:bg-[#62b5e6] transition"
            >
              Login to Account
            </Link>
            <Link
              to="/register"
              className="border-2 border-[#7BC9F5] text-black text-center py-3 rounded-sm text-xl font-medium hover:bg-[#7BC9F5] transition"
            >
              Register New User
            </Link>
          </div>
        </div>

      </div>

      <footer className="mt-20 text-gray-400 text-sm italic">
      </footer>
    </div>
  );
};

export default Home;
