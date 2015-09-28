'use strict';
let fs = require('fs');
let path = require('path');
let dotenv = require('dotenv');

module.exports = function() {

    dotenv.load();

    let missing = fs.readFileSync(
            path.resolve(__dirname,'.env.example'),
            'utf-8'
        )
        .match(/^(\w+)/gm)
        .filter(function(varrr) {
            return !process.env[varrr];
        });

    if (missing.length) {
        console.error('\nmissing: ' + missing.join(', '));
        console.error('please update your .env');
        process.exit(1);
    }

};
