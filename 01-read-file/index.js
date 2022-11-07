const path = require('path');
const fs = require('fs');

const currentPath = path.join(__dirname, './text.txt');
const readStream = fs.createReadStream(currentPath, 'utf-8');
readStream.on('data', chunk => console.log(chunk))
