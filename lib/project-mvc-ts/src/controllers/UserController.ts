import { UserModel } from "../models/UserModel";

export class UserController {
  async gradeOne(req: any, res: any, next: any) {
    const param = "INIT";
    try {
      const data = await UserModel(param);
      const result = { code: 200, message: "SUCCESS", data };
      res.json([result]);
    } catch (e) {
      console.log("TRY CATCH ERROR： " + e);
      res.json([{ code: 500, message: e }]);
    }
  }

  async gradeOnes(req: any, res: any, next: any) {
    const param = req.body;
    const result = await UserModel(param);
    console.log("result");
    res.json([{ date: result }]);
  }
}
