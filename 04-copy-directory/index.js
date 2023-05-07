const { copyFile, constants } = require('node:fs/promises');
const fs = require('fs');
const path = require('path');
const { stdout } = process;

const pathToSourceFolder = path.resolve(__dirname, 'files');
const pathToDestinationFolder = path.resolve(__dirname, 'copyDir');

function createCopyFiles() {
  fs.readdir(pathToSourceFolder, (err, data) => {
    if (err) throw err;
    data.forEach(async (file) => {
      const pathToSourceFile = path.resolve(pathToSourceFolder, file);
      const pathToDestFile = path.resolve(pathToDestinationFolder, file);
      try {
        await copyFile(pathToSourceFile, pathToDestFile);
      } catch (err) {
        console.log(err.message);
      }
    });
  });
}
fs.mkdir(path.resolve(__dirname, 'copyDir'), (err) => {
  if (err) {
    createCopyFiles();
    stdout.write('Files were successfully copied');
  } else {
    stdout.write('New directory copyDir was created\n');
    createCopyFiles();
    stdout.write('Files were successfully copied');
  }
});
