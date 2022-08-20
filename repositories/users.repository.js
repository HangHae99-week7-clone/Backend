const User = require("../models/user");

class UserRepository {
  existUserEmail = async (email) => {
    const existUserEmail = await User.findOne({
      where: { email },
    });
    return existUserEmail;
  };

  existUserNick = async (nickname) => {
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
}

module.exports = UserRepository;
