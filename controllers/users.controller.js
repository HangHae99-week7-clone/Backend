const UserService = require("../services/users.service");

class UserController {
  userService = new UserService();

  // 회원가입 [POST] /user/signup
  createUser = async (req, res, next) => {
    try {
      const { email, nickname, password, confirm } = req.body;

      const createUser = await this.userService.createUser(
        email,
        nickname,
        password,
        confirm
      );

      if (createUser.error) {
        return res.status(400).json(createUser);
      }

      res.status(201).json({ result: true, email, nickname });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  };
}

module.exports = UserController;
