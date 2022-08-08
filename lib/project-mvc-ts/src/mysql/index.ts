import { Sequelize, DataTypes } from "sequelize";

const db: { sequelizeRoot?: any } = {};

/*连接数据库   参数：数据库名  用户名  密码  配置 */
const sequelize = new Sequelize("parking", "root", "your password", {
  host: "106.12.154.161", //主机地址
  dialect: "mysql", //语言
});

// function () {
// 	return new Sequelize('modelTest', 'root', '111111', {host: 'localhost', port:3306, logging:console.log});
// }

//测试连接
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
  db.sequelizeRoot = sequelize;
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

import Order from "./Model/order";
import Books from "./Model/books";

exports.sequelize = function () {
  return new Sequelize("modelTest", "root", "111111", {
    host: "localhost",
    port: 3306,
    logging: console.log,
  });
};

export { db, DataTypes, Order, Books };
