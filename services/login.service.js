const LoginRepository = require("../repositories/login.repository");
const { User } = require("../models");
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
        return token;
      } else {
        return {
          result: false,
          error: "이메일 또는 패스워드가 틀렸습니다",
        };
      }
    } else {
      return {
        result: false,
        error: "이메일 또는 패스워드가 틀렸습니다",
      };
    }
  };
}

module.exports = LoginService;
