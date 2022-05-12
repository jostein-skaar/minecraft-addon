const folderToPack = 'C:/Users/jostein/Downloads/dev_packs/development_behavior_packs/jostein_behaviorpakke/';

const dirTree = require('directory-tree');
const filteredTree = dirTree(folderToPack);

console.log(filteredTree);
