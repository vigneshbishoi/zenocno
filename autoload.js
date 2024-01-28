/** 
 * javascript comment 
 * @Author: Anand R
 * @Date: 2021-11-11 
 * @Desc: Auto load Files - Plugin Based File Loading 
 */
const program = require('commander');
var colors = require('colors');
var fs = require('fs');
var recursive = require("recursive-readdir");

program
    .command("dump")
    .alias('g')
    .description('Dumping Files')
    .action(function (env, options) {
        dumpFilePath = "./app/config/autoLoadPath.js";
        directoryToDump = ['screens'];
        directoryToDump.forEach(function (dP) {
            directoryPath = "app/" + dP;
            if (fs.existsSync(directoryPath)) {
                autoLoadfileList = [];
                fs.readdir(directoryPath, function (err, pluginFolders) {
                    //handling error
                    if (err) {
                        return console.log('Unable to scan directory: ' + err);
                    }
                    fs.readdir(directoryPath, function (err, pG) {
                        pG.forEach(function (val) {
                            if (val[0] !== '.') {
                                recursive(directoryPath + '/' + val, function (err, files) {
                                    autoLoadfileList[val] = [];
                                    files.forEach(fList => {

                                        console.log(fList, "flist")
                                        var fPath = fList.split('/');
                                        if (fPath[fPath.length - 1] == 'Index.tsx') {
                                            autoLoadfileList[val][fPath[fPath.length - 2]] = fList.replace('app', '..');
                                        }
                                    });
                                });
                            }
                        });
                    });
                });

                setTimeout(() => {

                    console.log('Creating new autoload file : ');
                    tplText = `/* eslint-disable prettier/prettier */
/**
 * @Date: ` + new Date().toString() + `
 * @Desc: Auto Generated - Plugin Based File Require
 */
const FILEPATH = {`;

                    for (const pluginName in autoLoadfileList) {

                        tplText += `\n\t\t`;
                        tplText += pluginName + ` : {`;

                        for (const screenName in autoLoadfileList[pluginName]) {
                            tplText += `\n\t\t\t\t`;

                            autoLoadfileList[pluginName][screenName] = autoLoadfileList[pluginName][screenName].replace(new RegExp('.js', 'g'), '');
                            autoLoadfileList[pluginName][screenName] = autoLoadfileList[pluginName][screenName].replace(new RegExp('src', 'g'), '..');
                            tplText += screenName + ` : require('` + autoLoadfileList[pluginName][screenName] + `').default,`;
                        }

                        tplText += `\n\t\t\t`;
                        tplText += `},`;
                    }

                    tplText += `\n\t\t`;
                    tplText += `}; `;
                    tplText += '\n\n\t';

                    tplText += 'export default FILEPATH;';

                    fs.writeFile(dumpFilePath, tplText, function (err) {
                        if (err) throw err;
                        fs.chmodSync(dumpFilePath, 0777);
                        console.log(colors.green(" autoload File Created " + dumpFilePath));
                    });

                }, 1000);
            }
        });
    });

program.parse(process.argv);

if (!program.args.length) program.help();