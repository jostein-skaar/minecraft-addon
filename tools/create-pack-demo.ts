import fs from 'fs';
import JSZip from 'jszip';
import {
  createBlock as createBlocks,
  createCustomBlock,
  createFlipbookTextures,
  createManifest,
  createTerrainTexture,
} from './addon-elements.js';
import AdmZip from 'adm-zip';

let debug = true;
const packName = 'josteinspakke02';
const namespace = 'jostein:';
const blockName = 'dotty';
const version = [1, 2, 0];
const authors = ['Jostein Skaar', 'Aron Skaar'];
const uuid_rp = '4f6eb0bc-944b-46e2-838e-375b5b0a2d6f';
const uuid_rp_module = 'ba2271c5-0678-447a-b254-e1ad6bbb35d0';
const uuid_bp = 'cb902b2d-9b0d-43e5-8bae-6907f2658fce';
const uuid_bp_module = '14f1979f-ed82-48bd-a052-b2df1d4e0533';
const rpName = 'Josteins RP02';
const bpName = 'Josteins BP02';

const iconPath = '../artwork/tulleblokk/pack_icon.png';
const texturePath = '../artwork/tulleblokk/dotty.png';

// RP
const rpManifest = createManifest(
  version,
  rpName,
  `Dette er Josteins andre RP. Versjon ${version.join('.')}`,
  uuid_rp,
  uuid_rp_module,
  uuid_bp,
  'resources',
  authors
);
const textEn = `tile.${namespace}${blockName}.name=Dotty`;
const blocks = createBlocks(namespace + blockName, blockName);
const terrainTexture = createTerrainTexture(blockName, rpName);
const flipbookTextures = createFlipbookTextures('dotty', 10);

const rpZip = new JSZip();
rpZip.file('manifest.json', JSON.stringify(rpManifest, null, 2));
rpZip.file('blocks.json', JSON.stringify(blocks, null, 2));
rpZip.file('pack_icon.png', fs.readFileSync(iconPath));
rpZip.folder('texts')?.file('en_US.lang', textEn);
rpZip.folder('textures')?.file('terrain_texture.json', JSON.stringify(terrainTexture, null, 2));
rpZip.folder('textures')?.file('flipbook_textures.json', JSON.stringify(flipbookTextures, null, 2));
rpZip.folder('textures')?.folder('blocks')?.file(`${blockName}.png`, fs.readFileSync(texturePath));

// BP
const bpManifest = createManifest(
  version,
  bpName,
  `Dette er Josteins andre BP. Versjon ${version.join('.')}`,
  uuid_bp,
  uuid_bp_module,
  uuid_rp,
  'data',
  authors
);
const customBlock = createCustomBlock(namespace + blockName, 0, 1);
const bpZip = new JSZip();
bpZip.file('manifest.json', JSON.stringify(bpManifest, null, 2));
bpZip.file('pack_icon.png', fs.readFileSync(iconPath));
bpZip.folder('blocks')?.file(`${blockName}.json`, JSON.stringify(customBlock, null, 2));

const rpZipFileName = `${packName}_rp.mcpack`;
const bpZipFileName = `${packName}_bp.mcpack`;

const addonZip = new JSZip();
addonZip.file(rpZipFileName, rpZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }));
addonZip.file(bpZipFileName, bpZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }));

const addonZipFileName = `temp/${packName}.mcaddon`;

addonZip
  .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
  .pipe(fs.createWriteStream(addonZipFileName))
  .on('finish', function () {
    console.log('zip written:', addonZipFileName);
  });

if (debug) {
  // When developing, unzip to mojang dev folders.
  const mojangPath = 'C:/Users/joste/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/';

  rpZip
    .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream('temp/' + rpZipFileName))
    .on('finish', unzipRpToDev);

  bpZip
    .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream('temp/' + bpZipFileName))
    .on('finish', unzipBpToDev);

  function unzipRpToDev() {
    const rpZipFullPath = 'temp/' + rpZipFileName;
    const rpDevPath = `${mojangPath}development_resource_packs/${packName}_rp`;
    var rpAdmZip = new AdmZip(rpZipFullPath);
    rpAdmZip.extractAllTo(rpDevPath, true);
    console.log('unzipRpToDev');
  }

  function unzipBpToDev() {
    const bpZipFullPath = 'temp/' + bpZipFileName;
    const bpDevPath = `${mojangPath}development_behavior_packs/${packName}_bp`;
    var bpAdmZip = new AdmZip(bpZipFullPath);
    bpAdmZip.extractAllTo(bpDevPath, true);
    console.log('unzipBpToDev');
  }
}
