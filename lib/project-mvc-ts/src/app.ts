import * as fs from "fs";
import * as path from "path";
// import * as express from "express";
import express from "express";
import * as bodyParser from "body-parser";
import { db, Order } from "./mysql/index";
import router from "./route/index";
// import history from "connect-history-api-fallback";
// import * as schedule from "node-schedule";
// import { dateFormat } from "ts-depot";
// var { expressjwt: jwt } = require("express-jwt");
/* 与生成token的密钥要一致*/
// const SECRET_KEY = "login-surcode";

const app = express();
/* bodyParser 使用bodyParser 解析post请求传递过来的参数 */
app.use(bodyParser.json());
app.use(express.json({ limit: "2100000kb" }));

// 跨域配置;
app.use((req: any, res: any, next: any) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Origin-Type", "*");
  next();
});

// console.log(Order, "111111111", db.sequelizeRoot.QueryTypes);

const users = db.sequelizeRoot.query("SELECT * FROM `user`", {
  type: db.sequelizeRoot.QueryTypes.SELECT,
});

// console.log("222222222222", users);
users.then((e: any) => {
  console.log("33333333333333", e);
});

// TODO
// 白名单
app.use("/", router);

app.listen(3000, () => {
  console.log(`App runing at http://localhost:8080`);
  // sequelize
  //   .authenticate()
  //   .then(async () => {
  //     console.log("database connected");
  //     try {
  //       await sequelize.sync({ force: true });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })
  //   .catch((e: any) => {
  //     console.log(e.message);
  //   });
});
