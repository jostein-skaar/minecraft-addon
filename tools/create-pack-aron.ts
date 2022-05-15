import fs from 'fs';
import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';
import { createBlock as createBlocks, createCustomBlock, createManifest, createTerrainTexture } from './addon-elements.js';
import AdmZip from 'adm-zip';

let debug = false;
const packName = 'aronspakke';
const namespace = 'aron:';
const blockName = 'regnbue';
const version = [1, 0, 0];
const authors = ['Aron Skaar', 'Jostein Skaar'];
const uuid_rp = 'e15572fd-51e6-4cd3-aecf-27154e76e86b';
const uuid_rp_module = '516d58f9-478c-4b34-b3d4-f853dc8c046b';
const uuid_bp = '6fab7b31-6e6f-4ae7-af1b-e661b7be5325';
const uuid_bp_module = '58364d81-48fc-4add-b5d1-d59317c2ee61';
const rpName = 'Arons pakke';
const bpName = 'Arons pakke';
const description = `Arons pakke. Versjon ${version.join('.')}`;

const iconPath = 'D:/Kode/minecraft-addon/artwork/aron/pack_icon.png';
const texturePath = 'D:/Kode/minecraft-addon/artwork/aron/regnbue.png';

// RP
const rpManifest = createManifest(version, rpName, description, uuid_rp, uuid_rp_module, uuid_bp, 'resources', authors);
const textEn = `tile.${namespace}${blockName}.name=Regnbueblokk`;
const blocks = createBlocks(namespace + blockName, blockName);
const terrainTexture = createTerrainTexture(blockName, rpName);

const rpZip = new JSZip();
rpZip.file('manifest.json', JSON.stringify(rpManifest, null, 2));
rpZip.file('blocks.json', JSON.stringify(blocks, null, 2));
rpZip.file('pack_icon.png', fs.readFileSync(iconPath));
rpZip.folder('texts')?.file('en_US.lang', textEn);
rpZip.folder('textures')?.file('terrain_texture.json', JSON.stringify(terrainTexture, null, 2));
rpZip.folder('textures')?.folder('blocks')?.file(`${blockName}.png`, fs.readFileSync(texturePath));

// BP
const bpManifest = createManifest(version, bpName, description, uuid_bp, uuid_bp_module, uuid_rp, 'data', authors);
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
    const rpZipFullPath = 'C:/kode/minecraft-addon/tools/temp/' + rpZipFileName;
    const rpDevPath = `${mojangPath}development_resource_packs/${packName}_rp`;
    var rpAdmZip = new AdmZip(rpZipFullPath);
    rpAdmZip.extractAllTo(rpDevPath, true);
    console.log('unzipRpToDev');
  }

  function unzipBpToDev() {
    const bpZipFullPath = 'C:/kode/minecraft-addon/tools/temp/' + bpZipFileName;
    const bpDevPath = `${mojangPath}development_behavior_packs/${packName}_bp`;
    var bpAdmZip = new AdmZip(bpZipFullPath);
    bpAdmZip.extractAllTo(bpDevPath, true);
    console.log('unzipBpToDev');
  }
}
