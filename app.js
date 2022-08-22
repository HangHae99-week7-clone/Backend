const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const morgan = require("morgan");
const rotuer = require("./routes");
const port = 3000;
const app = express();
const fs = require("fs");
const http = require("http");
const https = require("https");
require("dotenv").config();
const options = {
  ca: fs.readFileSync("/etc/letsencrypt/live/yunseong.shop/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/yunseong.shop/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/yunseong.shop/cert.pem"),
};
http.createServer(app).listen(3000);
https.createServer(options, app).listen(443);
app.use(express.static("public"));
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
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // body로 들어오는 json 형태의 데이터를 파싱해준다.
app.use("/api", rotuer);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// error 미들웨어
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    error: "에러 미들웨어에 오셨군요",
  });
});

module.exports = app;
