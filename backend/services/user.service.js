const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

class UserService {
  static async register(newUser) {
    const { password, firstname, lastname, email } = newUser;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({
      password: hashedPassword,
      firstname,
      lastname,
      email,
    });
  }

  static async getByEmail(email) {
    return User.getByEmail(email);
  }
  static async getById(id) {
    return User.getById(id);
  }

  static async updateUser(id, userData) {
    return User.update(id, userData);
  }
}

module.exports = UserService;
