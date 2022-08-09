import express from "express";

const app = express();

// 示例中间件函数
const middleware_function = (req: any, res: any, next: any) => {
  // ... 进行一些操作
  console.log("middleware...");
  next(); // 调用 next() ，Express 将调用处理链中下一个中间件函数。
};

export { middleware_function };

// 用 use() 为所有的路由和动词添加该函数
app.use(middleware_function);
