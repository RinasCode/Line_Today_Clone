const { comparePassword } = require("../helpers/bcrypt");
const { token } = require("../helpers/jwt");
const { Category, Article, User } = require("../models");


class UserController {
  static async addUser(req, res, next) {
    try {
      // res.send("test")
      const { username, email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        message: "Success Create New User",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "Bad Request" };

      const login = await User.findOne({
        where: {
          email,
        },
      });
      // console.log(login);
      if (!login) throw { name: "Login Error" };

      const isPasswordValid = comparePassword(password, login.password);
      if (!isPasswordValid) throw { name: "Login Error" };

      // let data = await compare(password, login.password)
      // console.log(data);
      const payload = {
        id: login.id,
        email: login.email,
        role: login.role,
      };
      const access_token = token(payload);

      res.status(200).json({
        access_token,
        message: `Success Login with ${email}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
