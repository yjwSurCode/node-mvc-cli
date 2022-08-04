# node-express-mvc-cli or create-node-express

node 基于 express 的脚手架

# 用法：：：：：

yarn start init

yarn start init --use-yarn

yarn start --with-mvc

## edit-json-file

let file = editJsonFile(destination + '/package.json', {
autosave: true
});

    file.set('name', path.basename(destination));

## ncp 拷贝生成依赖

## dotenv

Create a .env file in the root of your project:
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"

## module-alias

require('../../../../some/very/deep/module')
可以写成为：
import module from '@deep/module'

## express-async-errors

app.get('/users', async (req, res) => {
const users = await User.findAll();
res.send(users);
});

## 目录：：：

Controller 前后端交互层控制器
Service 后端业务逻辑层
Mapper 操作数据库
Model 类型定义
Config 配置文件
Utils 工具类
Statci 静态文件
