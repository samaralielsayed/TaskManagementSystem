const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const NotFoundError = require("../handleErrors/notFoundError");
const AuthError = require("../handleErrors/authError");
const ForbiddenError = require("../handleErrors/forbiddenError");

exports.protect = async (req, res, next) => {
  try {
    let token;
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      token = auth.split(" ")[1];

      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

      const currentUser = await User.getById(decoded.id);
      if (!currentUser) {
        throw new NotFoundError("this user not found");
      }
      req.user = currentUser.recordset[0];
      next();
    } else {
      throw new AuthError(
        "You are not logged in! Please log in to get access."
      );
    }
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};
