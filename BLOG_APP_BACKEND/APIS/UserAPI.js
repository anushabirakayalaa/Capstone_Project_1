import exp from "express";
import { register } from "../services/authService.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { ArticleModel } from "../models/articleModel.js";
import upload from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const userRoute = exp.Router();

userRoute.post("/users", upload.single("profilePic"), async (req, res, next) => {
  try {
    const userObj = { ...req.body, role: "USER" };

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(req.file.buffer);
      userObj.profileImageUrl = uploadedImage.secure_url;
    }

    const newUserObj = await register(userObj);
    res.status(201).json({ message: "User created", payload: newUserObj });
  } catch (error) {
    next(error);
  }
});

userRoute.get("/articles", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res, next) => {
  try {
    const articles = await ArticleModel.find({ isArticleActive: true })
      .populate("author", "firstName lastName email profileImageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "All articles", payload: articles });
  } catch (error) {
    next(error);
  }
});

userRoute.get("/articles/:id", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res, next) => {
  try {
    const article = await ArticleModel.findOne({
      _id: req.params.id,
      isArticleActive: true,
    }).populate("author", "firstName lastName email profileImageUrl");

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article", payload: article });
  } catch (error) {
    next(error);
  }
});

userRoute.put("/articles", verifyToken("USER"), async (req, res, next) => {
  try {
    const { user, articleId, comment } = req.body;

    if (user !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const articleWithComment = await ArticleModel.findOneAndUpdate(
      { _id: articleId, isArticleActive: true },
      { $push: { comments: { user, comment } } },
      { new: true, runValidators: true }
    );

    if (!articleWithComment) {
      return res.status(404).json({ message: "Article not available" });
    }

    return res
      .status(200)
      .json({ message: "Comment added successfully", payload: articleWithComment });
  } catch (error) {
    next(error);
  }
});
