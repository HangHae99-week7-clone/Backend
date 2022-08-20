const { User } = require("../models");

class LoginRepository {
  findUser = async (email) => {
    const existUserData = await User.findOne({
      where: { email },
    });
    console.log("existUser", existUserData);
    return existUserData;
  };
}

module.exports = LoginRepository;
