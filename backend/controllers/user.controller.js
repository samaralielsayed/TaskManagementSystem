const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserService = require("../services/user.service");
const BadRequestError = require("../handleErrors/badRequestError");
const NotFoundError = require("../handleErrors/notFoundError");
const AuthError = require("../handleErrors/authError");
const JWT_SECRET = "your_jwt_secret";

exports.register = async (req, res) => {
  try {
    const { password, firstname, lastname, email } = req.body;

    const existingUser = await UserService.getByEmail(email);
    if (existingUser) {
      throw new BadRequestError("Email already exists");
    }

    await UserService.register({
      password,
      firstname,
      lastname,
      email,
    });
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password && !email) {
      throw new BadRequestError("must write your email and your password");
    }

    if (!password) {
      throw new BadRequestError("must write your password");
    }

    if (!email) {
      throw new BadRequestError("must write your email");
    }

    // Find user by email
    const user = await UserService.getByEmail(email);
    if (!user) {
      throw new NotFoundError("This email is not registered. Please sign up");
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new AuthError("invalid email or password");
      // return res.status(401).json({ message: "invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ status: "success", token: token });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const updatedUser = req.body;

    await UserService.updateUser(id, updatedUser);
    const userUpdate = await UserService.getById(id);
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: userUpdate.recordset[0],
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
exports.findUseProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await UserService.getById(id);
    res.status(200).json({ status: "success", data: user.recordset[0] });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
