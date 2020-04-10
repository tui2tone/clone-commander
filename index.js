#!/usr/bin/env node

'use strict';

const program = require('commander');
const Lib = require('./lib/clone');

function range(val) {
    return val.split(':').map(String);
}

program
    .version('0.0.1', '-v, --version')
    .option('-f, --from [value]', 'A start folder to clone')
    .option('-t, --to [value]', 'A destination folder')
    .option('-r, --replace <a>..<b>', 'A replace command', range)
    .parse(process.argv);


const start = () => {
    const {
        from,
        to,
        replace
    } = program;
    Lib.clone(from, to, replace)
}

start();