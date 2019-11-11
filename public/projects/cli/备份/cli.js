const packageJson = require('./package.json');

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => project = name)
    .option('--info', 'print environment debug info')
    .option('--use-npm')
    .option('--typescript')
    .allowUnknownOption()
    .on('--help', () => {})
    .parse(process.argv);