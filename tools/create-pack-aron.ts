import fs from 'fs';
import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';
import {
  createBlock as createBlocks,
  createCustomBlock,
  createFlipbookTextures,
  createManifest,
  createTerrainTexture,
} from './addon-elements.js';
import AdmZip from 'adm-zip';

let debug = true;
const packName = 'aronspakke';
const namespace = 'aron:';

const version = [1, 2, 0];
const authors = ['Aron Skaar', 'Jostein Skaar'];
const uuid_rp = 'f8c6b399-c618-42a5-931e-5b6005957dfb';
const uuid_rp_module = 'a1d20770-7b50-4108-8bcc-580d5738fa67';
const uuid_bp = '9c4d0436-2643-4c66-b93e-36f3a0f31708';
const uuid_bp_module = '8f2e5bc5-3fb1-4be7-a3f3-82d885f7f1aa';
const rpName = 'Arons pakke';
const bpName = 'Arons pakke';
const description = `Arons pakke. Versjon ${version.join('.')}`;

const iconPath = '../artwork/aron/pack_icon.png';
const texturePath = '../artwork/aron/regnbue_statisk.png';
const texturePath2 = '../artwork/aron/regnbue.png';

// RP
const blockName = 'regnbue_statisk';
const blockName2 = 'regnbue';
const rpManifest = createManifest(version, rpName, description, uuid_rp, uuid_rp_module, uuid_bp, 'resources', authors);
const blocks = createBlocks(namespace, blockName, blockName2);
const terrainTexture = createTerrainTexture(rpName, blockName, blockName2);

const flipbookTextures = createFlipbookTextures(blockName2, 5);

let textEn = `tile.${namespace}${blockName}.name=Regnbueblokk statisk`;
textEn += `\r\ntile.${namespace}${blockName2}.name=Regnbueblokk animert`;

const rpZip = new JSZip();
rpZip.file('manifest.json', JSON.stringify(rpManifest, null, 2));
rpZip.file('blocks.json', JSON.stringify(blocks, null, 2));
rpZip.file('pack_icon.png', fs.readFileSync(iconPath));
rpZip.folder('texts')?.file('en_US.lang', textEn);
rpZip.folder('textures')?.file('terrain_texture.json', JSON.stringify(terrainTexture, null, 2));
rpZip.folder('textures')?.file('flipbook_textures.json', JSON.stringify(flipbookTextures, null, 2));
rpZip.folder('textures')?.folder('blocks')?.file(`${blockName}.png`, fs.readFileSync(texturePath));
rpZip.folder('textures')?.folder('blocks')?.file(`${blockName2}.png`, fs.readFileSync(texturePath2));
rpZip.folder('textures')?.folder('entity')?.folder('cat')?.file(`white.png`, fs.readFileSync(`../artwork/aron/regnbuekatt.png`));
rpZip.folder('textures')?.folder('entity')?.folder('cat')?.file(`blackcat.png`, fs.readFileSync(`../artwork/aron/regnbuekatt.png`));
rpZip.folder('textures')?.folder('entity')?.folder('sheep')?.file(`sheep.png`, fs.readFileSync(`../artwork/aron/regnbuesau.png`));
rpZip.folder('textures')?.folder('entity')?.folder('cow')?.file(`cow.png`, fs.readFileSync(`../artwork/aron/regnbuemal64x64.png`));

// BP
const bpManifest = createManifest(version, bpName, description, uuid_bp, uuid_bp_module, uuid_rp, 'data', authors);
const customBlock = createCustomBlock(namespace + blockName, 0, 1);
const customBlock2 = createCustomBlock(namespace + blockName2, 0, 1);
const bpZip = new JSZip();
bpZip.file('manifest.json', JSON.stringify(bpManifest, null, 2));
bpZip.file('pack_icon.png', fs.readFileSync(iconPath));
bpZip.folder('blocks')?.file(`${blockName}.json`, JSON.stringify(customBlock, null, 2));
bpZip.folder('blocks')?.file(`${blockName2}.json`, JSON.stringify(customBlock2, null, 2));

const rpZipFileName = `${packName}_rp.mcpack`;
const bpZipFileName = `${packName}_bp.mcpack`;

const addonZip = new JSZip();
addonZip.file(rpZipFileName, rpZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }));
addonZip.file(bpZipFileName, bpZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }));

const addonZipFileName = `temp/${packName}_v${version.join('.')}.mcaddon`;

addonZip
  .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
  .pipe(fs.createWriteStream(addonZipFileName))
  .on('finish', function () {
    console.log('zip written:', addonZipFileName);
  });

if (debug) {
  // When developing, unzip to mojang dev folders.
  // const mojangPath = 'C:/Users/joste/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/';
  const mojangPath = 'C:/Users/jostein/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/';

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
