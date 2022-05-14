const dirTree = require('directory-tree');
const JSZip = require('jszip');
const fs = require('fs');

// Use this file to pack multiple folders as mcpack files.

const foldersToPack = [
  'C:/Users/jostein/Downloads/dev_packs/development_resource_packs/jostein_ressurspakke',
  'C:/Users/jostein/Downloads/dev_packs/development_behavior_packs/jostein_behaviorpakke',
];

for (const folderToPack of foldersToPack) {
  createMcpackFromFolder(folderToPack);
}

function createMcpackFromFolder(folderToPack) {
  addFilesInFolderToZip = (zip, folderinfo, foldername = '') => {
    for (const fileOrFolder of folderinfo) {
      if (fileOrFolder.children != undefined) {
        addFilesInFolderToZip(zip, fileOrFolder.children, fileOrFolder.name);
      } else {
        addFileToZip(zip, fileOrFolder, foldername);
      }
    }
  };

  addFileToZip = (zip, fileinfo, foldername) => {
    console.log('File', fileinfo.path, fileinfo.name);
    const file = fs.readFileSync(fileinfo.path);
    zip.folder(foldername).file(fileinfo.name, file);
  };

  const filteredTree = dirTree(folderToPack, { normalizePath: true });
  const zip = new JSZip();
  addFilesInFolderToZip(zip, filteredTree.children);
  const zipFileName = `${filteredTree.name}.mcpack`;
  zip
    .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream(zipFileName))
    .on('finish', function () {
      console.log('zip written:', zipFileName);
    });
}
