import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  withCredentials: true,
});

export const userAuth = create((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  authChecked: false,
  loading: false,
  error: null,
  articles: [],

  login: async (userCredWithRole) => {
    try {
      set({ loading: true, error: null });

      const { data } = await api.post("/common-api/login", {
        email: userCredWithRole.email,
        password: userCredWithRole.password,
      });

      set({
        loading: false,
        isAuthenticated: true,
        authChecked: true,
        currentUser: data.payload,
        error: null,
      });

      if (data.payload?.role === "AUTHOR") {
        await get().readAuthorArticles(data.payload._id);
      } else {
        await get().readArticles();
      }

      return data.payload;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.error || err.response?.data?.message || "Login failed",
        isAuthenticated: false,
        authChecked: true,
        currentUser: null,
      });
      return null;
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await api.post("/common-api/logout");
    } finally {
      set({
        loading: false,
        isAuthenticated: false,
        authChecked: true,
        currentUser: null,
        articles: [],
      });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.get("/common-api/check-auth");

      set({
        loading: false,
        isAuthenticated: true,
        authChecked: true,
        currentUser: data.payload,
      });

      if (data.payload?.role === "AUTHOR") {
        await get().readAuthorArticles(data.payload._id || data.payload.userId);
      } else {
        await get().readArticles();
      }
    } catch {
      set({
        loading: false,
        authChecked: true,
        isAuthenticated: false,
        currentUser: null,
        articles: [],
        error: null,
      });
    }
  },

  readArticles: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.get("/user-api/articles");
      set({ loading: false, articles: data.payload || [] });
    } catch (err) {
      set({
        loading: false,
        error:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Could not fetch articles",
      });
    }
  },

  readAuthorArticles: async (authorId) => {
    try {
      if (!authorId) {
        set({ articles: [] });
        return;
      }

      set({ loading: true, error: null });
      const { data } = await api.get(`/author-api/articles/${authorId}`);
      set({ loading: false, articles: data.payload || [] });
    } catch (err) {
      set({
        loading: false,
        error:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Could not fetch author articles",
      });
    }
  },

  createArticle: async (article) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.post("/author-api/articles", article);
      set((state) => ({
        loading: false,
        articles: [data.payload, ...state.articles],
      }));
      return { ok: true, article: data.payload };
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Could not create article";

      set({ loading: false, error: message });
      return { ok: false, error: message };
    }
  },
}));
