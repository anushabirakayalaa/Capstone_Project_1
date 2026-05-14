import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  const hostname = window.location.hostname || "localhost";
  return `http://${hostname}:4000`;
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    }

    return Promise.reject(error);
  }
);

export const getErrorMessage = (error, fallback = "Something went wrong") =>
  error.response?.data?.error || error.response?.data?.message || error.message || fallback;

export const formatIST = (date) => {
  if (!date) {
    return "Not available";
  }

  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export const getAuthorName = (author) => {
  if (!author) {
    return "Unknown author";
  }

  if (typeof author === "string") {
    return "Author";
  }

  return [author.firstName, author.lastName].filter(Boolean).join(" ") || author.email || "Author";
};

export const getPreview = (content = "", length = 140) => {
  if (content.length <= length) {
    return content;
  }

  return `${content.slice(0, length).trim()}...`;
};

export const getImageUrl = (article) =>
  article?.imageUrl || article?.image || article?.coverImage || article?.articleImage || "";

export const registerUser = (payload) => {
  const formData = new FormData();
  const { role, profilePic, ...fields } = payload;

  Object.entries(fields).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  if (profilePic?.[0]) {
    formData.append("profilePic", profilePic[0]);
  }

  const endpoint = role === "AUTHOR" ? "/author-api/users" : "/user-api/users";
  return API.post(endpoint, formData);
};

export const loginUser = async (credentials) => {
  const { data } = await API.post("/common-api/login", credentials);
  const token = data.token || data.payload?.token;

  if (token) {
    localStorage.setItem("token", token);
  }

  localStorage.setItem("currentUser", JSON.stringify(data.payload));
  return data.payload;
};

export const logout = async () => {
  try {
    await API.post("/common-api/logout");
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  }
};

export const checkAuth = async () => {
  const cachedUser = localStorage.getItem("currentUser");

  try {
    const { data } = await API.get("/common-api/check-auth");
    localStorage.setItem("currentUser", JSON.stringify(data.payload));
    return data.payload;
  } catch (error) {
    if (cachedUser && localStorage.getItem("token")) {
      return JSON.parse(cachedUser);
    }

    throw error;
  }
};

export const getAllArticles = async () => {
  const { data } = await API.get("/user-api/articles");
  return data.payload || [];
};

export const getAuthorArticles = async (authorId) => {
  const { data } = await API.get(`/author-api/articles/${authorId}`);
  return data.payload || [];
};

export const getArticleById = async (articleId) => {
  const { data } = await API.get(`/user-api/articles/${articleId}`);
  return data.payload;
};

export const createArticle = async (article) => {
  const { data } = await API.post("/author-api/articles", article);
  return data.payload;
};

export const updateArticle = async (articleId, article) => {
  const { data } = await API.put("/author-api/articles", { articleId, ...article });
  return data.payload;
};

export const deleteArticle = async (articleId) => {
  const { data } = await API.patch(`/author-api/articles/${articleId}/status`, {
    isArticleActive: false,
  });
  return data.payload;
};

export default API;
