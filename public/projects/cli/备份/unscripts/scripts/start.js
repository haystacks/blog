const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = {};
const serverConfig = {};

const compiler = webpack(config);
const devServer = new WebpackDevServer(compiler, serverConfig);

devServer.listen(port, HOST, err => {
    console.log(chalk.cyan('Starting the development server...\n'));
})