const UserRepository = require("../repositories/users.repository");
const bcrypt = require("bcrypt");

class UserService {
  userRepository = new UserRepository();

  // 회원가입
  createUser = async (email, nickname, password, confirm) => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    const passwordFormat =
      /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/;

    if (!emailFormat.test(email)) {
      return { result: false, error: "이메일 형식이 올바르지 않습니다" };
    }
    if (!passwordFormat.test(password)) {
      return { result: false, error: "패스워드 형식이 올바르지 않습니다" };
    }
    if (password.search(nickname) !== -1) {
      return { result: false, error: "패스워드에 닉네임이 포함되어 있습니다" };
    }
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

    const hash = bcrypt.hashSync(password, Number(process.env.SALT));
    await this.userRepository.createUser(email, nickname, hash);
    return { result: true };
  };

  changeNick = async (nickname, nicknamechange) => {
    const dupNick = await this.userRepository.findUserByNick(nicknamechange);
    if (dupNick) {
      return { result: false, error: "이미 존재하는 닉네임입니다" };
    }
    await this.userRepository.updateNick(nickname, nicknamechange);
    return { result: true };
  };

  deleteUser = async (userId, password) => {
    if (!password) {
      return { result: false, error: "비밀번호를 입력해주세요" };
    }
    const user = await this.userRepository.findUser(userId);
    const compareResult = await bcrypt.compare(password, user.password);

    if (!compareResult) {
      return { result: false, error: "비밀번호를 다시 한 번 확인해주세요" };
    }
    await this.userRepository.deleteUser(userId);
    return { result: true };
  };
}

module.exports = UserService;
