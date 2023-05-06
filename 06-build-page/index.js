const fs = require('fs');
const path = require('path');
let projectPath = '';
const { copyFile } = require('node:fs/promises');

async function createDir() {
  fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
    if (err) {
      createHTML();
      createStyles();
      addAssets();
    } else {
      createHTML();
      createStyles();
      addAssets();
    }
  });
}

async function createHTML() {
  const pathToSourceFile = path.resolve(__dirname, 'template.html');
  const pathToDestinationFile = path.resolve(
    __dirname,
    'project-dist',
    'index.html'
  );

  try {
    await copyFile(pathToSourceFile, pathToDestinationFile);
  } catch (err) {
    console.log(err.message);
  }
  const input = fs.createReadStream(pathToDestinationFile);
  input.on('data', (data) => {
    let htmlContent = data.toString();
    fs.readdir(path.join(__dirname, 'components'), (err, filesData) => {
      if (err) throw Error;

      filesData.forEach((file) => {
        const fileName = `{{${file.slice(0, file.indexOf('.'))}}}`;
        const tagContent = fs.createReadStream(
          path.resolve(__dirname, 'components', file)
        );
        tagContent.on('data', (chunk) => {
          htmlContent = htmlContent.replace(`${fileName}`, chunk.toString());

          fs.writeFile(pathToDestinationFile, htmlContent, (err) => {
            if (err) {
              console.log(err);
            }
          });
        });
      });
    });
  });
}

function createStyles() {
  fs.readdir(path.join(__dirname, 'styles'), (err, filesData) => {
    if (err) throw Error;

    filesData.forEach((file) => {
      let styleContent = fs.createReadStream(
        path.resolve(__dirname, 'styles', file)
      );
      styleContent.on('data', (chunk) => {
        fs.appendFile(
          path.join(__dirname, 'project-dist', 'style.css'),
          chunk,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    });
  });
}

function addAssets() {
  fs.readdir(path.resolve(__dirname, 'assets'), (err, data) => {
    if (err) console.log(err.message);

    fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), (err) => {
      if (err) createMainAssetsFolder();
    });
    createMainAssetsFolder();
    function createMainAssetsFolder() {
      data.forEach((folder) => {
        fs.mkdir(
          path.join(__dirname, 'project-dist', 'assets', folder),
          (err) => {
            if (err) createInnerFolder();
          }
        );
        createInnerFolder();
        function createInnerFolder() {
          fs.readdir(path.resolve(__dirname, 'assets', folder), (err, data) => {
            if (err) console.log(err.message);
            data.forEach(async (file) => {
              try {
                await copyFile(
                  path.resolve(__dirname, 'assets', folder, file),
                  path.join(__dirname, 'project-dist', 'assets', folder, file)
                );
              } catch (err) {
                console.log(err.message);
              }
            });
          });
        }
      });
    }
  });
}
createDir();
