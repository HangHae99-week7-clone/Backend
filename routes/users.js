const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const UserController = require("../controllers/users.controller");
const LoginController = require("../controllers/login.controller");
// const LogoutController = require("../controllers/logout.controller");

const userController = new UserController();
const loginController = new LoginController();
// const logoutController = new LogoutController();

// 회원가입
router.post("/signup", userController.createUser);
// 닉네임 변경
// router.put("/nicknamechange", authMiddleware, userController);
// 회원탈퇴
// router.delete("/delete", authMiddleware, userController);
// 로그인
router.post("/login", loginController.loginUser);
// 로그아웃
// router.get("/logout", authMiddleware, logoutController);

module.exports = router;
