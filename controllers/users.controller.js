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

      res.json(createUser);
    } catch (err) {
      return next(err);
    }
  };

  // 닉네임 변경 [PUT] /user/nicknamechange
  changeNick = async (req, res, next) => {
    try {
      const { nickname } = res.locals.user;
      const { nicknamechange } = req.body;

      const changeNick = await this.userService.changeNick(
        nickname,
        nicknamechange
      );

      res.json(changeNick);
    } catch (err) {
      return next(err);
    }
  };

  // 회원탈퇴 [DELETE] /user/delete
  deleteUser = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { password } = req.body;

      const deleteUser = await this.userService.deleteUser(userId, password);

      res.json(deleteUser);
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = UserController;
