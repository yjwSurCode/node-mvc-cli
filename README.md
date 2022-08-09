# node-express-mvc-cli or create-node-express

客户端请求一个路由,通过路由转发给控制器，控制器引入 models 和处理各种业务逻辑，models 专门封装对数据的增删查改操作。再返回给控制器，最后结果返回到view

node 基于 express 的脚手架

## 命令行

yarn add commander --save

## 用户交互 inquirer

    this.registerPrompt('list', require('./prompts/list'));
    this.registerPrompt('input', require('./prompts/input'));
    this.registerPrompt('number', require('./prompts/number'));
    this.registerPrompt('confirm', require('./prompts/confirm'));
    this.registerPrompt('rawlist', require('./prompts/rawlist'));
    this.registerPrompt('expand', require('./prompts/expand'));
    this.registerPrompt('checkbox', require('./prompts/checkbox'));
    this.registerPrompt('password', require('./prompts/password'));
    this.registerPrompt('editor', require('./prompts/editor'));

！!//@ ! "inquirer": "^7.0.3",
yarn add inquirer --save

"ora": "^6.1.2"

"ora": "^4.0.3"

命令行等待优化
const ora = require('ora')
const processGenFiles = ora('Create project……')
processGenFiles.start() // 进度条开始
await genFiles(answers);
processGenFiles.succeed(`Create project complete: i18n-b-${name}`)

## git 模版下载 download-git-repo

大部分 CLI 工具的模版并不在本地，而是从网上下载。可以用 download-git-repo 这个库，以及 github API

const { promisify } = require('util')

const clone = async function (repo, desc) {
const download = promisify(require('download-git-repo')) // download-git-repo: Download and extract a git repository (GitHub, GitLab, Bitbucket)
const ora = require('ora')
const process = ora(`下载......${repo}`)
process.start() // 进度条开始
await download(repo, desc)
// download-git-repo 导出的 download 方法，第一个参数 repo 是仓库地址，格式有三种：
// GitHub - github:owner/name or simply owner/name
// GitLab - gitlab:owner/name
// Bitbucket - bitbucket:owner/name
process.succeed()
}

await clone('git@gitlab.qima-inc.com:sz-web/i18n-b-dashboard.git', name)

# 用法：：：：：

yarn start init

yarn start init --use-yarn

yarn start init-mvc

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

## 流程

需不需要 typescript------------ yes no

<!-- 需不需要 redis--------------- yes no   -->
<!-- PM2 docker  -->
<!-- 什么方式安装------------- npm yarn -->

## 目录：：：

Controller 前后端交互层控制器
Service 后端业务逻辑层
Mapper 操作数据库
Model 类型定义
Config 配置文件
Utils 工具类
Statci 静态文件

## 问题

yarn run v1.22.5
$ node bin/cli.js init
internal/modules/cjs/loader.js:1085
throw new ERR_REQUIRE_ESM(filename, parentPath, packageJsonPath);
^

Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: C:\material\NODE\node-express-cli\node_modules\ora\index.js
require() of ES modules is not supported.
require() of C:\material\NODE\node-express-cli\node_modules\ora\index.js from C:\material\NODE\node-express-cli\lib\node-express-mvc-cli.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename index.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from C:\material\NODE\node-express-cli\node_modules\ora\package.json.
at require (internal/modules/cjs/helpers.js:88:18)
at Object.<anonymous> (C:\material\NODE\node-express-cli\lib\node-express-mvc-cli.js:9:13)
at Module.\_compile (internal/modules/cjs/loader.js:1068:30)
at Object.Module.\_extensions..js (internal/modules/cjs/loader.js:1097:10)
at Module.load (internal/modules/cjs/loader.js:933:32)
at Function.Module.\_load (internal/modules/cjs/loader.js:774:14) {
code: 'ERR_REQUIRE_ESM'
}

var inquirer = require('inquirer');

const questions = [
{
type: 'confirm',
name: 'order',
message: '您好，需要点餐吗?',
default: true,
},
{
type: 'number',
name: 'amount',
message: '你们几个人?',
default: 1,
},
{
type: 'list',
name: 'mainFood',
message: '主食需要吃点什么？',
choices: ['Rice', 'Noodle', 'Pizza'],
// 对用户的回答进行转换，返回转换过的结果
filter(val) {
return val.toLowerCase();
},
default: 'Pizza', // 注意：default 值为转化前的值
},
{
type: 'list',
name: 'smell',
message: '需要什么口味的？',
choices: [
{
key: 0,
name: "辣",
value: "hot"
},
{
key: 1,
name: "甜",
value: "sweet"
},
],
},
{
type: 'rawlist',
message: 'Pizza 要多大尺寸的？',
name: 'size',
choices: ['5 寸', '6 寸', '7 寸'],
when(answers) {
return answers.mainFood === 'pizza';
},
default: 1, // default 是选项在 choices 数组中的索引
},
{
type: 'checkbox',
name: 'menu',
message: '想要吃点什么菜?',
choices: [
{
name: '东坡肉',
checked: true,
},
{
name: '剁椒鱼头',
},
{
name: '法式鹅肝',
disabled: '卖完了',
},
{
name: '西红柿炒鸡蛋',
},
],
},
{
type: 'expand',
name: 'drinks',
message: '饮料喝点什么?',
choices: [
{
key: 'a', // key 必须是单个小写的字符
name: '小麦茶',
value: 'XiaoMaiCha',
},
{
key: 'b',
name: '雪碧',
value: 'XueBi',
},
{
key: 'c',
name: '果粒橙',
value: 'GuoLiCheng',
},
],
default: 0, // default 值必须是选项在 choices 数组中的索引
},
{
type: 'input',
name: 'vipCard',
message: "请输入会员卡号",
validate(value) {
const pass = /^\d{8}$/.test(value);
if (pass) {
return true;
}

      return '会员卡号是8位纯数字！';
    },

},
{
type: 'password',
name: 'pwd',
message: '请输入会员卡密码',
mask: '\*',
validate(value) {
let valid = value.length === 6;

      return valid || '密码必须是6位！';
    },

},
{
type: 'editor',
name: 'suggest',
message: '您对本店有什么建议吗？',
},
];

inquirer
.prompt(questions)
.then((answers) => {
console.log(answers)
})
.catch((error) => {
if (error.isTtyError) {
// Prompt couldn't be rendered in the current environment
} else {
// Something else went wrong
}

知识点：

const UserModel = (param: any) => {
console.log(param, "param");
return new Promise((resolve, reject) => {
const res = db.sequelizeRoot.query(`SELECT * FROM user where id=${param}`, {
type: db.sequelizeRoot.QueryTypes.SELECT,
});

    console.log("Database syntax error", res);

    // const isError = res.then((e: any) => {
    //   console.log(e, "6666");
    //   return e;
    // });
    // console.log("Database syntax error111", isError);

    // /register
    // middleware...
    // 7 param
    // 66666 Promise { <pending> }
    // TRY ERROR[object Promise]

    // if (res) {
    //   reject(res);
    // }

    resolve(res);

}).then((val: any) => {
console.log("val", val);
const res = db.sequelizeRoot.query(
`SELECT * FROM user where userId='${val[0].userId}'`,
{
type: db.sequelizeRoot.QueryTypes.SELECT,
}
);

    return res;

});
};
