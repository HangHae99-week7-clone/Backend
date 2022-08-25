const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const morgan = require("morgan");
const rotuer = require("./routes");
const port = 3000;
const app = express();
require("dotenv").config();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // body로 들어오는 json 형태의 데이터를 파싱해준다.
app.use("/api", rotuer);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 위의 라우터 말고 존재하지 않는 라우터 접근 시 에러
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

// error 미들웨어
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    error: "에러 미들웨어에 오셨군요",
    Error: err.message, // 배포 전에만 서버 에러 그대로 다 던져주고 배포 후 지우기!!!
  });
});
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
module.exports = app;
