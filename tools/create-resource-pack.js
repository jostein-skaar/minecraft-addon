const { v4: uuidv4 } = require('uuid');

let rawdata = fs.readFileSync('../templates/behavior-pack/manifest.json');
let manifest = JSON.parse(rawdata);

manifest.header.name = 'Bla bla';

console.log(manifest);

console.log(uuidv4());

let data = JSON.stringify(manifest, null, 2);
fs.writeFileSync('student-2.json', data);
