const UserRepository = require("../repositories/users.repository");
const bcrypt = require("bcrypt");
const { route } = require("../routes");
require("dotenv").config();

class UserService {
  userRepository = new UserRepository();

  // 회원가입
  createUser = async (email, nickname, password, confirm) => {
    if (password !== confirm) {
      return { result: false, error: "패스워드가 일치하지 않습니다" };
    }
    const exUserEmail = await this.userRepository.findUserByEmail(email);
    if (exUserEmail) {
      return { result: false, error: "이메일이 이미 존재합니다" };
    }
    const exUserNick = await this.userRepository.findUserByNick(nickname);
    if (exUserNick) {
      return { result: false, error: "닉네임이 이미 존재합니다" };
    }

    const hash = await bcrypt.hash(password, 12);
    await this.userRepository.createUser(email, nickname, hash);
    return { result: true, email, nickname };
  };

  changeNick = async (nickname, nicknamechange) => {
    const dupNick = await this.userRepository.findUserByNick(nicknamechange);
    if (dupNick) {
      return { result: false, error: "이미 존재하는 닉네임입니다" };
    }
    await this.userRepository.updateNick(nickname, nicknamechange);
    return { result: true };
  };

  deleteUser = async (nickname, password) => {
    const user = await this.userRepository.findUserByNick(nickname);
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      return { result: false, error: "비밀번호를 다시 한 번 확인해주세요" };
    }
    await this.userRepository.deleteUser(nickname);
    return { result: true };
  };
}

module.exports = UserService;
