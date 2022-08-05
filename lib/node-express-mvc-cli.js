#! /usr/bin/env node
/**
 * Create new node-express-mvc-cli project.
 *

 */

const path = require('path');
const ora = require('ora');
const ncp = require('ncp').ncp;
const inquirer = require('inquirer');
const editJsonFile = require('edit-json-file');
const childProcess = require('child_process');




/**
 * Entry point
 * 
 * @param destination 
 * @param withAuth
 * @param useYarn
 */
async function expressGenTs(destination, withAuth) {
    let { tsRepo } = await inquirer.prompt([{
        type: 'confirm',
        name: 'tsRepo',
        message: '是否使用typescript?\n ',
        default: true
    }]);

    let { redisRepo } = await inquirer.prompt([{
        type: 'confirm',
        name: 'redisRepo',
        message: '是否使用redis?\n ',
        default: true
    }]);

    let { PackageTools } = await inquirer.prompt([{
        type: 'list',
        name: 'PackageTools',
        message: '选择包管理器',
        choices: ['npm', 'yarn', 'pnpm'],
        // 对用户的回答进行转换，返回转换过的结果
        filter(val) {
            return val.toLowerCase();
        },
        default: 'Pizza', // 注意：default 值为转化前的值
    }]);


    console.log('传入参数', destination, withAuth, tsRepo, redisRepo, PackageTools) //true false

    let prjFolder = './project-init';
    if (withAuth && tsRepo === false) {
        destination = 'project-mvc'
        prjFolder = './project-mvc';
    } else if (tsRepo && withAuth) {
        destination = 'project-mvc-ts'
        prjFolder = './project-mvc-ts';
    }


    //  TODO step 1
    try {
        // console.log(fnLoadingByOra(copyProjectFiles, '1111', (destination, withAuth, tsRepo, redisRepo))

        await copyProjectFiles(destination, prjFolder);
        //  TODO step 3
        updatePackageJson(destination);
        // TODO step 5
        const depStrings = getDepStrings(withAuth, tsRepo, redisRepo);
        // fnLoadingByOra(downloadNodeModules, '加载中', { destination, depStrings, PackageTools })
        downloadNodeModules(destination, depStrings, PackageTools);
    } catch (err) {
        console.error(err);
    }
}


/**
 * Encapsulating the loading effect
 * 
 * @param fn 
 * @param message 
 */
async function fnLoadingByOra(fn, message, ...argv) {
    // const spinner = ora(message);
    // spinner.start();
    // let result = await fn(...argv);
    // if (result) {
    //     spinner.succeed(); // 结束loading
    // } else {
    //     spinner.stop(); // 结束loading 失败
    // }
    // return result;

}


/**
 * Copy project files
 * 
 * @param destination 
 * @param withAuth 
 */
function copyProjectFiles(destination, prjFolder) {
    const spinner = ora("loading...");
    spinner.start();
    //  TODO step 2
    const source = path.join(__dirname, prjFolder);
    console.log(source, 'source') // ! C:\material\NODE\node-express-cli\lib\project-files
    return new Promise((resolve, reject) => {
        ncp.limit = 16;
        ncp(source, destination, function (err) {
            if (err) {
                reject(err);
                spinner.stop();
            }
            setTimeout(() => {
                spinner.succeed('success!');
                resolve();
            }, 1000)

        });
    })
}


/**
 * Set project name in package.json
 * 
 * @param destination 
 */
function updatePackageJson(destination) {
    //  TODO step 4  destination==='C:\\material\\NODE\\node-express-cli\\express--ts'   
    let file = editJsonFile(destination + '/package.json', {
        autosave: true
    });

    /* 设置package.文件数据*/
    file.set('name', path.basename(destination));
    file.set('scripts', { "test": "echo \"Error: no test specified\" && exit 1" });
}


/**
 * Setup dependency strings. This way gets you the latest version of everything.
 * 
 * @param withAuth 
 */
function getDepStrings(withAuth, tsRepo, redisRepo) {
    let dependencies = 'express dotenv cookie-parser '
    let devDependencies = 'nodemon ' +
        '@types/node @types/express ' +
        '@types/cookie-parser '

    // ! 传入参数不一样配置不一样  
    // ?依赖性需要加空格 
    //TODO 完善数据
    if (withAuth) {
        dependencies += 'http-status-codes ' + 'module-alias  express-async-errors jsonfile ';
        devDependencies += 'fs-extra tsconfig-paths @types/jsonfile ' +
            'eslint @types/fs-extra';
    }

    if (tsRepo) {
        dependencies += 'ts-node typescript '
        devDependencies += '@typescript-eslint/eslint-plugin @typescript-eslint/parser '
    }

    if (redisRepo) {
        dependencies += 'redis '
        // devDependencies += 'fs-extra tsconfig-paths @types/jsonfile ' +
        //     '@typescript-eslint/eslint-plugin @typescript-eslint/parser ' +
        //     'eslint @types/fs-extra';
    }

    return { dependencies, devDependencies };
}


/**
 * Download the dependencies.
 * 
 * @param destination 
 * @param depStrings 
 */
async function downloadNodeModules(destination, depStrings, PackageTools) {
    const spinner = ora("下载依赖中...");
    spinner.start();
    // TODO step 6
    const options = { cwd: destination };
    let downloadLibCmd;
    let downloadDepCmd;
    if (PackageTools === 'yarn') {
        downloadLibCmd = 'yarn add ' + depStrings.dependencies;
        downloadDepCmd = 'yarn add ' + depStrings.devDependencies + ' -D';
    } else if (PackageTools === 'npm') {
        downloadLibCmd = 'npm i -s ' + depStrings.dependencies;
        downloadDepCmd = 'npm i -D ' + depStrings.devDependencies;
    } else if (PackageTools === 'pnpm') {
        downloadLibCmd = 'pnpm i -s ' + depStrings.dependencies;
        downloadDepCmd = 'pnpm i -D ' + depStrings.devDependencies;
    }

    await childProcess.execSync(downloadLibCmd, options);
    await childProcess.execSync(downloadDepCmd, options);

    spinner.succeed("下载依赖完成");
}


// Export entry point
module.exports = expressGenTs;
