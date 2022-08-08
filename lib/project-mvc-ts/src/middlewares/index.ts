const express = require("express");
const app = express();

// 示例中间件函数
const a_middleware_function = (req, res, next) => {
  // ... 进行一些操作
  console.log("LOGGED");
  next(); // 调用 next() ，Express 将调用处理链中下一个中间件函数。
};

export { a_middleware_function };

// 用 use() 为所有的路由和动词添加该函数
app.use(a_middleware_function);
