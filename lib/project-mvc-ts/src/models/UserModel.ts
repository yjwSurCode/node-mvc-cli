import { db, Order } from "../mysql/index";

const UserModel = (req, res, next) => {
  const users = db.sequelizeRoot.query("SELECT * FROM `user`", {
    type: db.sequelizeRoot.QueryTypes.SELECT,
  });

  let promise = new Promise((resolve, reject) => {
    users.then((e: any) => {
      console.log("33333333333333", e);
      resolve("传递参数");
    });
  });
  promise.then(
    (rows) => {
      res.json(rows);
    },
    (error) => {
      if (error) throw error;
    }
  );
};

export { UserModel };
