const program = require('commander');
var colors = require('colors');
const exec = require('child_process').exec;
var fs = require('fs');
var doT = require('dot');
var config = require('./cli-config.json');
var appConfig = require('./app.json');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function compileTemplate(tpl, data) {
  doT.templateSettings = {
    evaluate: /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    encode: /\{\{!([\s\S]+?)\}\}/g,
    use: /\{\{#([\s\S]+?)\}\}/g,
    define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
    iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
    varname: 'it',
    strip: false,
    append: true,
    selfcontained: false
  };
  var tempFn = doT.template(tpl);
  return tempFn(data);
}

program
  .version('0.0.1')
  .description('React native msys Framework CLI');


program
  .command("generate [name]")
  .alias('g')
  .description('generate screens')
  .action(function (env, options) {
    if (!env) {
      console.log(colors.red("Please give screen name"));
      process.exit();
    }
    screenName = capitalizeFirstLetter(env);
    screendir = "./app/screens/Default/";
    dir = screendir + screenName;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    if (fs.existsSync(dir)) {
      componentFile = screendir + screenName + "/Index.tsx";
      if (!fs.existsSync(componentFile)) {

        tplText = `/**
 * ` + screenName + ` Component
 * @Author: ` + config.Author + `
 * @Date: ` + new Date().toString() + `
 * @Desc: Bussiness logic and validation
 */
import React from 'react';
import Layout from './Layout';

interface IProps {}

export default function `+ screenName + `(props: IProps) {
  return <Layout {...props} />;
}
`;
        tpl = compileTemplate(tplText, {});
        fs.writeFile(componentFile, tpl, function (err) {
          if (err) throw err;
          fs.chmodSync(componentFile, 0777);
          console.log(colors.green("New file is created successfully in this path ->" + componentFile));
        });
      }

      layoutFile = screendir + screenName + "/Layout.tsx";
      if (!fs.existsSync(layoutFile)) {

        tplText = `/**
 * ` + screenName + ` layout page
 * @Author: ` + config.Author + `
 * @Date: ` + new Date().toString() + `
 * @Desc: View part for component
 */
import React from 'react';
import style from './Style';
import {View} from 'react-native';
import {withTheme} from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';

interface IProps {
  theme: any;
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  return (
    <View style={styles.container}>
      <Text>`+ screenName + `</Text>
    </View>
  );
};
export default withTheme(Layout);
`;
        tpl = compileTemplate(tplText, {});

        fs.writeFile(layoutFile, tpl, function (err) {
          if (err) throw err;
          fs.chmodSync(layoutFile, 0777);
          console.log(colors.green("New file is created successfully in this path ->" + layoutFile));
        });
      }


      styleFile = screendir + screenName + "/Style.ts";
      if (!fs.existsSync(styleFile)) {
        tplText = `/**
 * ` + screenName + ` style
 * @Author: ` + config.Author + `
 * @Date: ` + new Date().toString() + `
 * @Desc: Styling of View
 */

import {StyleSheet, Dimensions} from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
  });
};

export default Style;
`;
        tpl = compileTemplate(tplText, {});

        fs.writeFile(styleFile, tpl, function (err) {
          if (err) throw err;
          fs.chmodSync(styleFile, 0777);
          console.log(colors.green("New file is created successfully in this path ->" + styleFile));
        });
      }

      containerDir = "./app/containers/";
      containerFile = containerDir + screenName + ".ts";
      if (!fs.existsSync(containerFile)) {
        tplText = `/**
 * ` + screenName + ` Container
 * @Author: ` + config.Author + `
 * @Date: ` + new Date().toString() + `
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import {connect} from 'react-redux';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
const `+ screenName + `: any = ConfigFn.getPluginFile('` + screenName + `');

/**
 * changes done (state into props)
 */
const mapStateToProps = () => {
  return {};
};

/**
 * dispatch actions
 */
const mapDispatchToProps = () => {
  return {};
};

/**
 * connect state and action
 */
const ` + screenName + `Container = connect(mapStateToProps, mapDispatchToProps)(` + screenName + `);
export default ` + screenName + `Container;
`;
        tpl = compileTemplate(tplText, {});

        fs.writeFile(containerFile, tpl, function (err) {
          if (err) throw err;
          fs.chmodSync(styleFile, 0777);
          console.log(colors.green("New file is created successfully in this path ->" + containerFile));
        });
      }

      setTimeout(function () {
        fs.chmodSync(containerDir, 0777);
        console.log(colors.bgBlue("Screen Name -->" + appConfig.name + '.' + screenName));
      }, 1000)
    }

    // fs.readFile('demofile1.html');
  });

// error on unknown commands
program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);

if (!program.args.length) program.help();