const fs = require('fs');
const path = require('path');
const process = require('process');
let output;

const wayReading = path.join(__dirname, 'newText.txt');
const stream = fs.createReadStream(__filename, 'utf-8');

stream.on('open', () => {
  fs.open(wayReading, 'a', (err) => {
    if (err) throw err;
  });

  console.log('--- Hi. Enter your text below. ---');

  process.stdin.on('data', (data) => {
    output = data.toString().trim();

    (output === 'exit') ? stop() : output += '\n';

    fs.appendFile(wayReading, output, (err) => {
      if (err) throw err;
    });

    function stop() {
      console.log('--- Are you finished? Goodbye then. ---');
      process.exit();
    }

    process.on('SIGINT', stop);
  });
});
