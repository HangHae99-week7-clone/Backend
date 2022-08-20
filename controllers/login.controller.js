const LoginService = require("../services/login.service");

class LoginController {
  loginService = new LoginService();

  // 로그인 [POST] /user/login
  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.loginService.loginUser(email, password);

      if (token.error) {
        res.status(200).json({ result: false, token });
      }

      res.status(200).json({ result: true, token });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  };
}

module.exports = LoginController;
