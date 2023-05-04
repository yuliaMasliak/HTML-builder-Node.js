const { stdout, stdin } = process;
const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));
stdout.write('Hello!\nPlease, enter your name, age and gender\n');
let text = [];

stdin.on('data', (chunk) => {
  if (!chunk.includes('exit')) {
    text.push(chunk);
    output.write(chunk);
  } else {
    process.exit();
  }
});
process.on('SIGINT', () => {
  process.exit();
});
process.on('exit', (code) => {
  if (code === 0) {
    stdout.write(`Good luck, ${text[0]}`);
  } else {
    stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
  }
});
