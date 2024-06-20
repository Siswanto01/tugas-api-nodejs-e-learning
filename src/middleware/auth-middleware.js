const jwt = require("jsonwebtoken");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || "";

    if (authHeader.split(" ").length !== 2) {
      return res.status(401).send({
        message: "Invalid token",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).send({
        message: "Invalid token",
        data: null,
      });
    }

    req.user = {
      id_user: user.id_user,
      email: user.email,
      name: user.name
    };

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send({
        message: "Invalid token",
        data: null,
      });
    }

    next(err);
  }
};

module.exports =  authMiddleware