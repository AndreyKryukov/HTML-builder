const fs = require('fs');
const path = require('path');
const wayReading = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(wayReading, 'utf-8');

stream.on('data', (el) => {
  console.log(el);
});