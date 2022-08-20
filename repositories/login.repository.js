const { User } = require("../models");

class LoginRepository {
  findUser = async (email) => {
    const existUserData = await User.findOne({
      where: { email },
    });

    return existUserData;
  };
}

module.exports = LoginRepository;
