const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const UserController = require("../controllers/users.controller");
const LoginController = require("../controllers/login.controller");

const userController = new UserController();
const loginController = new LoginController();

// 회원가입
router.post("/signup", userController.createUser);
// 닉네임 변경
router.put("/nicknamechange", authMiddleware, userController.changeNick);
// 회원탈퇴
router.delete("/delete", authMiddleware, userController.deleteUser);
// 로그인
router.post("/login", loginController.loginUser);

module.exports = router;
