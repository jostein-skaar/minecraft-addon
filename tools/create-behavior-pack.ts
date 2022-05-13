import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { BpManifest, Header } from './bp-manifest';

// let rawdata = fs.readFileSync('../templates/behavior_pack/manifest.json');
// let manifest: BpManifest = JSON.parse(rawdata.toString());

const version = [1, 0, 1];
const min_engine_version = [1, 17, 20];
const authors = ['Jostein Skaar', 'Aron Skaar'];

const header: Header = {
  name: 'Josteins BP02',
  description: 'Dette er Josteins andre BP',
  uuid: uuidv4(),
  version,
  min_engine_version,
};

let manifest: BpManifest = {
  format_version: 2,
  header,
  modules: [],
  dependencies: [],
  metadata: {
    authors,
    license: 'MIT',
  },
};

console.log(manifest);

let data = JSON.stringify(manifest, null, 2);
fs.writeFileSync('temp.json', data);
