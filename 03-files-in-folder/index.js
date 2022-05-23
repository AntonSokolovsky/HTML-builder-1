const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'secret-folder')

fs.readdir(pathFolder, 
    { withFileTypes: true },
    (error, data) => {
      if (error) {
        console.log(error);
      }else {
        data.forEach(el => {
          if (el.isFile()) {
            const pathFolderFile = path.join(pathFolder, el.name);
            const objFiles = path.parse(pathFolderFile);
            fs.stat(pathFolderFile, (error, stats) => {
              if (error) throw error;
            console.log(`${objFiles.name} - ${objFiles.ext.slice(1)} - ${stats.size}b`);
            });
          }
        });
      }
    });
