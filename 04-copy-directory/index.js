const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname)

const pathFolderSrc = path.join(__dirname, 'files');
const pathFolderDest = path.join(__dirname, 'files-copy');

fs.mkdir(pathFolderDest, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(pathFolderSrc, 
    { withFileTypes: true },
    (error, data) => {
      if (error) {
        console.log(error);
      }else {
        data.forEach(el => {
          if (el.isFile()) {
            const pathFolderFileSrc = path.join(pathFolderSrc, el.name);
            const pathFolderFileDest = path.join(pathFolderDest, el.name)
            fs.copyFile(pathFolderFileSrc, pathFolderFileDest, (err) => {
                if (err) throw err;
               });
          }
        });
      }
    });