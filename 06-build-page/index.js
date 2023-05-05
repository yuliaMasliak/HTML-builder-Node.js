const fs = require('fs');
const path = require('path');
let projectPath = '';
const { copyFile } = require('node:fs/promises');

fs.mkdir(path.join(__dirname, 'project-dist'), (err, data) => {
  if (err) {
    createProject();
  } else {
    createProject();
  }
});

async function createProject() {
  const pathToSourceFile = path.resolve(__dirname, 'template.html');
  const pathToDestinationFile = path.resolve(
    __dirname,
    'project-dist',
    'index.html'
  );
  console.log();
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
            } else {
              console.log('File written successfully\n');
            }
          });
        });
      });
    });
  });
}

// input.on('data', (data) => {
//   let htmlContent = data.toString().split(`>`);
//   fs.readdir(path.join(__dirname, 'components'), (err, filesData) => {
//     if (err) throw Error;

//     filesData.forEach((file) => {
//       const fileName = `{{${file.slice(0, file.indexOf('.'))}}}`;
//       const tagContent = fs.createReadStream(
//         path.resolve(__dirname, 'components', file)
//       );
//       tagContent.on('data', (chunk) => {
//         htmlContent.forEach((element, i) => {
//           if (element.includes(fileName)) {
//             console.log(htmlContent);
//             htmlContent.splice(i, 1, chunk.toString());
//             let dataContent = htmlContent.join().replaceAll(',', '');
//             console.log(dataContent);
//             fs.writeFile(pathToDestinationFile, dataContent, (err) => {
//               if (err) {
//                 console.log(err);
//               } else {
//                 console.log('File written successfully\n');
//               }
//             });
//           }
//         });
//       });
//     });
//   });
// });
