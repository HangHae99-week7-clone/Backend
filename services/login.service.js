const LoginRepository = require("../repositories/login.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class LoginService {
  loginRepository = new LoginRepository();

  loginUser = async (email, password) => {
    const user = await this.loginRepository.findUser(email);

    if (user) {
      const compareResult = await bcrypt.compare(password, user.password);
      if (compareResult) {
        const token = jwt.sign(
          { email: user.email, nickname: user.nickname, userId: user.userId },
          process.env.MYSQL_KEY,
          { expiresIn: "1d" }
        );
        return {
          result: true,
          token,
          userId: user.userId,
          email: user.email,
          nickname: user.nickname,
        };
      } else {
        return {
          result: false,
          error: "이메일 또는 패스워드가 올바르지 않습니다",
        };
      }
    } else {
      return {
        result: false,
        error: "이메일 또는 패스워드가 올바르지 않습니다",
      };
    }
  };
}

module.exports = LoginService;
