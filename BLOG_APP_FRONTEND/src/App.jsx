import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AddArticle from "./pages/AddArticle";
import ArticleByID from "./pages/ArticleByID";
import AuthorProfile from "./pages/AuthorProfile";
import EditArticle from "./pages/EditArticle";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import { checkAuth } from "./services/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const user = await checkAuth();
        if (isMounted) {
          setCurrentUser(user);
        }
      } catch {
        if (isMounted) {
          setCurrentUser(null);
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    };

    loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-slate-50 text-slate-950">
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <main>
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route
              path="/login"
              element={<Login setCurrentUser={setCurrentUser} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/user-profile"
              element={
                <ProtectedRoute currentUser={currentUser} authLoading={authLoading}>
                  <UserProfile currentUser={currentUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/author-profile"
              element={
                <ProtectedRoute
                  currentUser={currentUser}
                  authLoading={authLoading}
                  allowedRoles={["AUTHOR"]}
                >
                  <AuthorProfile currentUser={currentUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/article/:id"
              element={
                <ProtectedRoute currentUser={currentUser} authLoading={authLoading}>
                  <ArticleByID />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-article"
              element={
                <ProtectedRoute
                  currentUser={currentUser}
                  authLoading={authLoading}
                  allowedRoles={["AUTHOR"]}
                >
                  <AddArticle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-article/:id"
              element={
                <ProtectedRoute
                  currentUser={currentUser}
                  authLoading={authLoading}
                  allowedRoles={["AUTHOR"]}
                >
                  <EditArticle />
                </ProtectedRoute>
              }
            />
            <Route path="/user-dashboard" element={<Navigate to="/user-profile" replace />} />
            <Route
              path="/author-dashboard"
              element={<Navigate to="/author-profile" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
