const fs = require('fs');
const path = require('path');

const pathToHTML = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(pathToHTML, 'utf-8');

readStream.on('data', (data) => {
  console.log(data);
});