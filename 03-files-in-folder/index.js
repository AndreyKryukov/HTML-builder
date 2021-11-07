const fs = require('fs');
const path = require('path');
let fileName;

const wayReading = path.join(__dirname, 'secret-folder');
const stream = fs.createReadStream(wayReading, 'utf-8');

stream.on('open', () => {
  fs.readdir(wayReading, (err, data) => {
    data.forEach(file => {
      fileName = path.join(__dirname, 'secret-folder', `${file}`);

      fs.stat(fileName, (err, stats) => {
        if (err) throw err;
        if (stats.isFile() === true) {
          console.log(`${file.split('.').slice(0, 1)} - ${path.extname(file).slice(1)} - ${(stats.size) / 1000}kb`);
        }
      });
    });
  });
});