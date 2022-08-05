// fs path是遵循cjs规范写的
var fs = require("fs");
var path = require("path");
var schedule = require("node-schedule");
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";

var { expressjwt: jwt } = require("express-jwt");

const app = express();
// bodyParser 使用bodyParser 解析post请求传递过来的参数
app.use(bodyParser.json());
app.use(express.json({ limit: "2100000kb" }));



app.use("/", (req, res, next) {});


app.listen(3000);
console.log(
  "Express server has started on port 3000. Open http://localhost:3000 to see results"
);
