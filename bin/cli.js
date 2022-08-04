#!/usr/bin/env node

/**
 * Create new node-express-mvc-cli project.
 *
 * created by sur-code
 */

const path = require('path');
const expressGenTs = require('../lib/node-express-mvc-cli');


(() => {
    console.log('Setting up new Express/TypeScript project...');
    // const opts = processOptions(process.argv.slice(2));
    // Process options
    let destination = 'project-init';
    let withAuth = false;
    let useYarn = false;
    let useSocketIo = false;
    const args = process.argv.slice(2);
    let idx = -1;
    //1
    idx = args.indexOf('--with-mvc');
    if (idx > -1) {
        withAuth = true;
        args.splice(idx, 1);
        destination = 'project-mvc';
    }
    //2
    idx = args.indexOf('--use-yarn');
    if (idx > -1) {
        useYarn = true;
        args.splice(idx, 1);
    }
    //3
    idx = args.indexOf('--socket-io');
    if (idx > -1) {
        useSocketIo = true;
        withAuth = true;
        args.splice(idx, 1);
    }
    //init
    if (args.length > 0 && args.indexOf('--init') > -1) {
        //TODO step 0
        destination = 'project-init'
    }
    //?  destination 创建目录名称
    destination = path.join(process.cwd(), destination);

    console.log('destination, withAuth, useYarn, useSocketIo', destination, withAuth, useYarn, useSocketIo)

    // Creating new project finished
    expressGenTs(destination, withAuth, useYarn, useSocketIo).then(() => {
        console.log('Project setup complete!');
    });

})();
