import { copyFile, constants } from 'node:fs/promises';
const fs = require('fs');
const path = require('path');
const pathToSourceFolder = path.resolve(__dirname, 'files');

fs.mkdir(path.resolve(__dirnme, 'copyDir'));
