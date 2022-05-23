const fs = require('fs');
const path = require('path');
const { stdin, stdout} = process;
const readline = require('readline');

const pathFolderFile = path.join(__dirname, 'text.txt')
const stream = fs.createWriteStream(pathFolderFile, 'utf-8');

stdout.write('Wake Up, Neo...\n');
stdin.on('data', data => {
    if (data.toString().toUpperCase().trim() === 'EXIT') {
        process.exit();
    }
    stream.write(data);
  });
  process.on('exit', () => stdout.write('Knock, Knock, Neo...'));
  process.on('SIGINT', () => process.exit());
