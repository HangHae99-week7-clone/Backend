const UserRepository = require("../repositories/users.repository");
const bcrypt = require("bcrypt");
require("dotenv").config();

class UserService {
  userRepository = new UserRepository();

  // 회원가입
  createUser = async (email, nickname, password, confirm) => {
    if (password !== confirm) {
      return { result: false, error: "패스워드가 일치하지 않습니다" };
    }
    const exUserEmail = await this.userRepository.existUserEmail(email);
    if (exUserEmail) {
      return { result: false, error: "이메일이 이미 존재합니다" };
    }
    const exUserNick = await this.userRepository.existUserNick(nickname);
    if (exUserNick) {
      return { result: false, error: "닉네임이 이미 존재합니다" };
    }

    const hash = await bcrypt.hash(password, 12);

    const createUserData = await this.userRepository.createUser(
      email,
      nickname,
      hash
    );

    return createUserData;
  };
}

module.exports = UserService;
