const fs = require('fs');
const path = require('path');
let fileName;

const wayStyles = path.join(__dirname, 'styles');
const wayBundleCSS = path.join(__dirname, 'project-dist', 'bundle.css');
let streamWrite = fs.createWriteStream(wayBundleCSS, 'utf-8');

fs.readdir(wayStyles, (err, arr) => {
  if (err) throw err;
  arr.forEach(file => {
    if (err) throw err;
    let streamRead = fs.createReadStream(path.join(wayStyles, `${file}`), 'utf-8');
    fileName = path.join(wayStyles, `${file}`);

    fs.stat(fileName, (err, stats) => {
      if (err) throw err;
      if (stats.isFile() === true && path.extname(file) === '.css') {
        fs.readFile(fileName, 'utf-8', (err) => {
          if (err) throw err;
          streamRead.pipe(streamWrite);
        });
      }
    });
  });
});