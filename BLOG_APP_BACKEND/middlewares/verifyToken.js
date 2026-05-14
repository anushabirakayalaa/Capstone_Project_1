import jwt from "jsonwebtoken";

export const verifyToken =
  (...allowedRoles) =>
  async (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;
      const token = req.cookies?.token || bearerToken;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized request. Please login." });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(decodedToken.role)
      ) {
        return res
          .status(403)
          .json({ message: "Forbidden. You do not have access." });
      }

      req.user = decodedToken;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Session expired. Please login again." });
      }

      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token." });
      }

      next(err);
    }
  };
