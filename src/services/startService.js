let fs = require('fs');

let configuration;

function configure () {
    configuration = JSON.parse(fs.readFileSync(`${__dirname}/../appsettings.json`));
}

configure();

exports.configuration = configuration;