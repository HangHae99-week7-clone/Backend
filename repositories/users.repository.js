const { User } = require("../models");

class UserRepository {
  findUser = async (userId) => {
    const user = await User.findByPk(userId);
    return user;
  };

  findUserByEmail = async (email) => {
    const existUserEmail = await User.findOne({
      where: { email },
    });
    return existUserEmail;
  };

  findUserByNick = async (nickname) => {
    const existUserNick = await User.findOne({
      where: { nickname },
    });
    return existUserNick;
  };

  createUser = async (email, nickname, hash) => {
    const createUserData = await User.create({
      email,
      nickname,
      password: hash,
    });
    return createUserData;
  };

  updateNick = async (nickname, nicknamechange) => {
    const updateNickData = await User.update(
      { nickname: nicknamechange },
      { where: { nickname } }
    );
    return updateNickData;
  };

  deleteUser = async (userId) => {
    const deleteNickData = await User.destroy({ where: { userId } });
    return deleteNickData;
  };
}

module.exports = UserRepository;
