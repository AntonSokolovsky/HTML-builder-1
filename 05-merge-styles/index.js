const fs = require('fs');
const path = require('path');

const pathFileDest = path.join(__dirname, 'project-dist', 'bundle.css');
const pathFolderSrc = path.join(__dirname, 'styles');
const output = fs.createWriteStream(pathFileDest);


fs.readdir(pathFolderSrc,
   { withFileTypes: true },
    (error, data) => {
        if(error) {
            console.log(error);
        } else {
            data.forEach(el => {
                
                const pathFolderFileSrc = path.join(pathFolderSrc, el.name);
                const objFiles = path.parse(pathFolderFileSrc);

                if(el.isFile() && path.extname(pathFolderFileSrc) === '.css') {

                    const input = fs.createReadStream(pathFolderFileSrc);
                    input.pipe(output);
                }
            })
        }
    })
