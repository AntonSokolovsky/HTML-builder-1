const fs = require('fs');
const path = require('path');


const pathTemplate = path.join(__dirname, 'template.html');
const pathFolderDest = path.join(__dirname, 'project-dist');
const pathHtmlDest = path.join(pathFolderDest, 'index.html')
const readTemplate = fs.createReadStream(pathTemplate, 'utf-8');
const outputHTML = fs.createWriteStream(pathHtmlDest);
//console.log(readTemplate);

fs.mkdir(pathFolderDest, { recursive: true }, (err) => {
    if (err) throw err;
  });

  
  readTemplate.pipe(outputHTML)