import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../models/articleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const authorRoute = exp.Router();

authorRoute.post("/users", upload.single("profilePic"), async (req, res, next) => {
  try {
    const userObj = { ...req.body, role: "AUTHOR" };

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(req.file.buffer);
      userObj.profileImageUrl = uploadedImage.secure_url;
    }

    const newUserObj = await register(userObj);
    res.status(201).json({ message: "Author created", payload: newUserObj });
  } catch (error) {
    next(error);
  }
});

authorRoute.post("/articles", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    const article = {
      ...req.body,
      author: req.user.userId,
    };

    const createdArticleDoc = await new ArticleModel(article).save();
    res.status(201).json({ message: "Article created", payload: createdArticleDoc });
  } catch (error) {
    next(error);
  }
});

authorRoute.get("/articles/:authorId", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    const { authorId } = req.params;

    if (authorId !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const articles = await ArticleModel.find({
      author: authorId,
      isArticleActive: true,
    })
      .populate("author", "firstName email profileImageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Articles", payload: articles });
  } catch (error) {
    next(error);
  }
});

authorRoute.put("/articles", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    const { articleId, title, category, content, imageUrl } = req.body;

    const articleOfDB = await ArticleModel.findOne({
      _id: articleId,
      author: req.user.userId,
    });

    if (!articleOfDB) {
      return res.status(404).json({ message: "Article not available" });
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      { $set: { title, category, content, imageUrl } },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Article updated", payload: updatedArticle });
  } catch (error) {
    next(error);
  }
});

authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isArticleActive } = req.body;

    const article = await ArticleModel.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Forbidden. You can only modify your own articles",
      });
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      { $set: { isArticleActive } },
      { new: true }
    );

    res.status(200).json({ message: "Article status updated", payload: updatedArticle });
  } catch (error) {
    next(error);
  }
});
