const fs = require('fs');
const path = require('path');
const { stdout, exit } = process;
const filepath = path.resolve(process.argv[1], 'text.txt');
const input = fs.createReadStream(filepath);
let text = '';
input.on('data', (chunk) => (text += chunk));
input.on('end', () => {
  stdout.write(text);
  exit();
});
