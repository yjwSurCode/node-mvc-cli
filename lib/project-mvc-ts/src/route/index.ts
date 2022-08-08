import { Router } from "express";

var router = Router();

/** 导入控制器 */
import { UserController } from "../controllers/UserController";
/** 导入中间件 */
import { a_middleware_function } from "../middlewares/index";

let User = new UserController();

/* 白名单 */
router.post("/register", a_middleware_function, User.gradeOne);

/**权限 */
router.post("/setUserInfo", a_middleware_function, User.gradeOne);

export default router;
