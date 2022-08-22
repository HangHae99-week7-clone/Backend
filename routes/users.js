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

// restful한게 대체 뭐냐!!! (복수명사, 언더바ㄴㄴ)
// 회원가입 POST /users
// 로그인 POST /users/login
// 회원정보 변경 PUT /useres/:id
// 로그아웃 POST /users/:id/logout
// 회원탈퇴 DELETE /users/:id
// 사용자의 입장에서 생각하자!!! 내가 닉넴만 바꿀지 비번만 바꿀지 다 바꿀지는 내 맴이니까!
// 다 받을 수 있다!고 생각하고 url 짜기.
// 아 nicknamechange 쓰기 졸 귀찮네 레스트풀 짱!!!
