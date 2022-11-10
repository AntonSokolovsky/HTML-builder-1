const fs = require('fs');
const path = require('path');

const {readFile,writeFile } = require('fs/promises');


const pathTemplate = path.join(__dirname, 'template.html');
const pathFolderDest = path.join(__dirname, 'project-dist');
const pathHtmlDest = path.join(pathFolderDest, 'index.html')
const inputHTML = fs.createReadStream(pathTemplate, 'utf-8');
const outputHTML = fs.createWriteStream(pathHtmlDest);
const pathComponents = path.join(__dirname, 'components');



fs.mkdir(pathFolderDest, { recursive: true }, (err) => {
    if (err) throw err;
  });

(async () => {
    let template = await (await readFile(pathTemplate)).toString();
    const templateSamples = template.match(/{{.+}}/gi).map((sample) => sample.slice(2, sample.length - 2));
    const obj = {};
    for (let i = 0; i < templateSamples.length; i++) {
    //   obj[templateSamples[i]] = await readFile(`${pathComponents}\\${templateSamples[i]}.html`);
      obj[templateSamples[i]] = await readFile(`${path.join(pathComponents, templateSamples[i])}.html`)
      obj[templateSamples[i]] = obj[templateSamples[i]].toString();
      let page = template.split(`{{${templateSamples[i]}}}`);
      template = page[0] + obj[templateSamples[i]] + page[1];
    }
    // writeFile(pathFolderDest + '\\'+'index.html', template);
    writeFile(path.join(pathFolderDest, 'index.html'), template);
  })();

const pathFileDest = path.join(__dirname, 'project-dist', 'style.css');
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

const pathFolderAssetsSrc = path.join(__dirname, 'assets');
const pathFolderAssetsDest = path.join(__dirname, 'project-dist', 'assets');

fs.mkdir(pathFolderAssetsDest, { recursive: true }, (err) => {
    if (err) throw err;
  });
function copyFile(pathFolderAssetsSrc, pathFolderAssetsDest) {
fs.readdir(pathFolderAssetsSrc, 
    { withFileTypes: true },
    (error, data) => {
        if (error) {
        console.log(error);
        }else {
        data.forEach(el => {
            if (el.isFile()) {
            const pathFolderFileSrc = path.join(pathFolderAssetsSrc, el.name);
            const pathFolderFileDest = path.join(pathFolderAssetsDest, el.name)
            fs.copyFile(pathFolderFileSrc, pathFolderFileDest, (err) => {
                if (err) throw err;
                });
            } else if (el.isDirectory()) {
                // fs.mkdir(pathFolderAssetsDest + '\\' + el.name, {recursive:true} , err => {
                    fs.mkdir(path.join(pathFolderAssetsDest, el.name), {recursive:true} , err => {
                  if (err) throw err;
                });
                copyFile(path.join(pathFolderAssetsSrc, el.name), path.join(pathFolderAssetsDest, el.name));
              }
        });
        }
    })
};
copyFile(pathFolderAssetsSrc, pathFolderAssetsDest);