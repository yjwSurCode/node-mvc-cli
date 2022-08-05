#!/usr/bin/env node

/**
 * Create new node-mvc-cli project.
 *
 * created by sur-code
 */

const path = require('path');
// import path from 'path'
const program = require('commander');
// import { program } from 'commander'
const {
    name,
    version
} = require('../package.json');
// import version from '../package.json'
const expressGenTs = require('../lib/node-express-mvc-cli');
// const { mapActions } = require('../lib/mapActions');



// 根据我们想要实现的功能配置执行动作，遍历产生对应的命令
const mapActions = {
    "init": {
        alias: 'i',
        description: '创建一个simple项目', // 描述
        examples: [ //用法
            'node-mvc-cli init'
        ]
    },
    'init-mvc': {
        alias: 'mvc',
        description: '创建一个mvc模式项目',
        examples: [ //用法
            'node-mvc-cli init-mvc'
        ]
    },
    "-version": {
        alias: 'v',
        description: '查看版本',
        examples: [
            'node-mvc-cli -version'
        ]
    },
    // create: {
    //     alias: 'c', //别名
    //     description: '创建一个项目', // 描述
    //     examples: [ //用法
    //         'node-mvc-cli create <project-name>'
    //     ]
    // },
    // config: { //配置文件
    //     alias: 'conf', //别名
    //     description: 'config project variable', // 描述
    //     examples: [ //用法
    //         'node-mvc-cli config set <k> <v>',
    //         'node-mvc-cli config get <k>'
    //     ]
    // },
    '*': {
        alias: '',
        description: 'command not found',
        examples: []
    }
}


// Object.keys()==Reflect.ownKeys
Reflect.ownKeys(mapActions).forEach((action) => {
    program.command(action) //name
        .alias(mapActions[action].alias) // alias
        .description(mapActions[action].description) // description
        .action(() => {
            if (action === '*') {
                console.log('找不到命令', mapActions[action].description);
            } else {
                let withAuth = false;
                if (action == 'init-mvc') { withAuth = true }

                expressGenTs(destination = 'project-init', withAuth).then((name) => {
                    console.log('cd', name);
                    console.log('npm run dev (or `yarn dev`)');
                });
            }
        }
        )
})


// 监听用户的help事件
program.on('--help', () => {
    console.log('\nExamples:');
    Reflect.ownKeys(mapActions).forEach((action) => {
        // console.log('监听用户的help事件', action)
        // console.log(action, '111', mapActions[action].description)
        mapActions[action].examples.forEach((example) => {
            console.log(`${example}`, "[" + mapActions[action].description + ']');
        })
    })
})

program.version(version, '-v', '--version')
    // .parse(`${process.argv}`); // process.argv就是用户在命令行中传入的参数  必不可少
    .parse(process.argv); // process.argv就是用户在命令行中传入的参数  必不可少

// 如果只是执行了 node-mvc-cli 命令 相当于执行 node-mvc-cli --help
if (!program.args.length) {
    program.help();
}


// return


// (() => {
//     console.log('Setting up new Express/TypeScript project...');
//     // const opts = processOptions(process.argv.slice(2));
//     // Process options
//     let destination = 'project-init';
//     let withAuth = false;
//     let useYarn = false;
//     let useSocketIo = false;
//     const args = process.argv.slice(2);
//     let idx = -1;
//     //1
//     idx = args.indexOf('--with-mvc');
//     if (idx > -1) {
//         withAuth = true;
//         args.splice(idx, 1);
//         destination = 'project-mvc';
//     }
//     //2
//     idx = args.indexOf('--use-yarn');
//     if (idx > -1) {
//         useYarn = true;
//         args.splice(idx, 1);
//     }
//     //3
//     idx = args.indexOf('--socket-io');
//     if (idx > -1) {
//         useSocketIo = true;
//         withAuth = true;
//         args.splice(idx, 1);
//     }
//     //init
//     if (args.length > 0 && args.indexOf('--init') > -1) {
//         //TODO step 0
//         destination = 'project-init'
//     }
//     //?  destination 创建目录名称
//     destination = path.join(process.cwd(), destination);

//     console.log('destination, withAuth, useYarn, useSocketIo', destination, withAuth, useYarn, useSocketIo)

//     // Creating new project finished
//     expressGenTs(destination, withAuth, useYarn, useSocketIo).then(() => {
//         console.log('Project setup complete!');
//     });

// })();
