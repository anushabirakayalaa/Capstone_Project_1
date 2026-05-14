import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logout } from "../services/api";

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-slate-900 text-white"
      : "text-slate-600 hover:bg-white hover:text-slate-950"
  }`;

function Header({ currentUser, setCurrentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const homePath = currentUser?.role === "AUTHOR" ? "/author-profile" : "/user-profile";

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to={currentUser ? homePath : "/"} className="text-xl font-bold text-slate-950">
          MERN Blog
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 sm:hidden"
        >
          Menu
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          {currentUser && (
            <NavLink to="/user-profile" className={navLinkClass}>
              Articles
            </NavLink>
          )}
          {currentUser?.role === "AUTHOR" && (
            <>
              <NavLink to="/author-profile" className={navLinkClass}>
                My Articles
              </NavLink>
              <NavLink to="/add-article" className={navLinkClass}>
                Add Article
              </NavLink>
            </>
          )}
          {!currentUser ? (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-200 px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-2">
            <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            {currentUser && (
              <NavLink
                to="/user-profile"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Articles
              </NavLink>
            )}
            {currentUser?.role === "AUTHOR" && (
              <>
                <NavLink
                  to="/author-profile"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  My Articles
                </NavLink>
                <NavLink
                  to="/add-article"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Add Article
                </NavLink>
              </>
            )}
            {!currentUser ? (
              <>
                <NavLink
                  to="/login"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-rose-600 px-3 py-2 text-left text-sm font-semibold text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
