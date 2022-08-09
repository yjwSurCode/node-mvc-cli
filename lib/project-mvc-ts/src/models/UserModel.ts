import { db, Order } from "../mysql/index";

interface routeAppState {
  req: any;
  res: any;
}

const UserModel = (param: any) => {
  return new Promise((resolve, reject) => {
    const res = db.sequelizeRoot.query(`SELECT * FROM user where id=${param}`, {
      type: db.sequelizeRoot.QueryTypes.SELECT,
    });
    resolve(res);
  }).then((val: any) => {
    const res = db.sequelizeRoot.query(
      `SELECT * FROM user where userId='${val[0].userId}'`,
      {
        type: db.sequelizeRoot.QueryTypes.SELECT,
      }
    );

    return res;
  });
};

export { UserModel };
