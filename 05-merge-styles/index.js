const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(
  path.resolve(__dirname, 'project-dist', 'bundle.css')
);
console.log(__dirname);
fs.readdir(path.resolve(__dirname, 'styles'), (err, data) => {
  if (err) throw err;
  data.forEach((file) => {
    if (path.extname(file) === '.css') {
      const input = fs.createReadStream(
        path.resolve(__dirname, 'styles', file)
      );
      input.pipe(output);
    }
  });
});
