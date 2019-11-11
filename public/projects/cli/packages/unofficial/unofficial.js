'use strict';
const program = require('commander');

const packageJson = require('./package');

program.version(packageJson.version).on('--help', '-h', () => {
    console.log(123);
});
