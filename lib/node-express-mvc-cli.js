/**
 * Create new node-express-mvc-cli project.
 *

 */

const path = require('path');
const editJsonFile = require('edit-json-file');
const childProcess = require('child_process');
const ncp = require('ncp').ncp;



/**
 * Entry point
 * 
 * @param destination 
 * @param withAuth
 * @param useYarn
 */
async function expressGenTs(destination, withAuth, useYarn, useSocketIo) {
    //  TODO step 1
    console.log(destination, withAuth, useYarn, useSocketIo)
    try {
        await copyProjectFiles(destination, withAuth, useSocketIo);
        //  TODO step 3
        updatePackageJson(destination);
        // TODO step 5
        const depStrings = getDepStrings(withAuth, useSocketIo);
        downloadNodeModules(destination, depStrings, useYarn);
    } catch (err) {
        console.error(err);
    }
}


/**
 * Copy project files
 * 
 * @param destination 
 * @param withAuth 
 */
function copyProjectFiles(destination, withAuth, useSocketIo) {
    //  TODO step 2
    let prjFolder = './project-init';
    if (withAuth) {
        prjFolder = './project-mvc';
    } else if (useSocketIo) {
        prjFolder = './socket-io';
    }
    const source = path.join(__dirname, prjFolder);
    console.log(source, 'source') // ! C:\material\NODE\node-express-cli\lib\project-files source
    return new Promise((resolve, reject) => {
        ncp.limit = 16;
        ncp(source, destination, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
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

    file.set('name', path.basename(destination));
}


/**
 * Setup dependency strings. This way gets you the latest version of everything.
 * 
 * @param withAuth 
 */
function getDepStrings(withAuth, useSocketIo) {
    let dependencies = 'express dotenv cookie-parser '
    let devDependencies = 'ts-node typescript nodemon ' +
        '@types/node @types/express ' +
        '@types/cookie-parser '

    // ! 传入参数不一样配置不一样  
    // ?依赖性需要加空格 
    if (withAuth) {
        dependencies += 'http-status-codes ' + 'module-alias  express-async-errors jsonfile ';
        devDependencies += 'fs-extra tsconfig-paths @types/jsonfile ' +
            '@typescript-eslint/eslint-plugin @typescript-eslint/parser ' +
            'eslint @types/fs-extra';
    }

    if (useSocketIo) {
        dependencies += ' socket.io socket.io-client';
    }

    return { dependencies, devDependencies };
}


/**
 * Download the dependencies.
 * 
 * @param destination 
 * @param depStrings 
 */
function downloadNodeModules(destination, depStrings, useYarn) {
    // TODO step 6
    const options = { cwd: destination };
    let downloadLibCmd;
    let downloadDepCmd;
    if (useYarn) {
        downloadLibCmd = 'yarn add ' + depStrings.dependencies;
        downloadDepCmd = 'yarn add ' + depStrings.devDependencies + ' -D';
    } else {
        downloadLibCmd = 'npm i -s ' + depStrings.dependencies;
        downloadDepCmd = 'npm i -D ' + depStrings.devDependencies;
    }
    childProcess.execSync(downloadLibCmd, options);
    childProcess.execSync(downloadDepCmd, options);
}


// Export entry point
module.exports = expressGenTs;
