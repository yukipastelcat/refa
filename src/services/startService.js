const fs = require('fs');
const os = require('os');
const mkdirp = require('mkdirp');

let configuration;
let synonyms;
function configure () {
    configuration = JSON.parse(fs.readFileSync(`${__dirname}/../appsettings.json`));
    synonymsPath = os.homedir() + '/.refa/synonyms.json';
    try {
        synonyms = JSON.parse(fs.readFileSync(synonymsPath));
    } catch (err) {
        fs.mkdir(os.homedir() + '/.refa');
        fs.writeFile(synonymsPath, '[]');
    }
}
configure();

exports.configuration = configuration;
exports.synonyms = synonyms;