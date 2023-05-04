const fs = require('fs');
const path = require('path');
const { stdout } = process;

const pathToFolder = path.resolve(__dirname, 'secret-folder');
console.log(pathToFolder);
fs.readdir(pathToFolder, { withFileTypes: true }, (err, data) => {
  if (err) throw err;
  data.forEach((file) => {
    if (file.isFile()) {
      const stats = fs.statSync(
        path.resolve(__dirname, 'secret-folder', file.name)
      );
      stdout.write(
        `${file.name.slice(0, file.name.indexOf('.'))} - ${file.name.slice(
          file.name.indexOf('.') + 1
        )} - ${stats.size / 1000}kb\n`
      );
    }
  });
});
