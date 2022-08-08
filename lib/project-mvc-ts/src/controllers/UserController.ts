import { UserModel } from "../models/UserModel";

export class UserController {
  async gradeOne(req, res, next) {
    await UserModel(req, res, next);
  }

  async gradeOnes(req, res, next) {
    await UserModel(req, res, next);
  }
}
