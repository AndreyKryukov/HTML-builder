const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const nameFolderOriginal = path.join(__dirname, 'files');
const nameFolderCopy = path.join(__dirname, 'files-copy');
const stream = fs.createReadStream(__filename, 'utf-8');

stream.on('open', function createFolder() {
  fs.stat(nameFolderCopy, (err, stats) => {
    if (err) {
      fsPromises.mkdir(nameFolderCopy).then(() => {
        fs.readdir(nameFolderOriginal, (err, files) => {
          if (err) throw err;

          files.forEach(elem => {
            fs.copyFile(path.join(nameFolderOriginal, `${elem}`)
              , (path.join(nameFolderCopy, `${elem}`))
              , (err) => {
                if (err) throw err;
              });
          });
        });
      }).catch(() => {
        console.log('Alarm!!! There is no way to create a directory.');
      });
    } else {
      fs.rm(nameFolderCopy, { recursive: true }, (err) => {
        if (err) throw err;

        return createFolder();
      });
    }
  });
});