#!/usr/bin/env node
'use strict';

const chalk = require('chalk');

const currentNodeVersion = process.versions.node;

console.error(
    chalk.red(currentNodeVersion)
);

// process.exit(1);
require('./cli.js');