const LoginService = require("../services/login.service");

class LoginController {
  loginService = new LoginService();

  // 로그인 [POST] /user/login
  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.loginService.loginUser(email, password);

      res.json(token);
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = LoginController;
