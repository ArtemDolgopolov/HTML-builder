const fs = require('fs');
const path = require('path');

const pathToHTML = path.join(__dirname, 'text.txt');

fs.readFile(pathToHTML, 'utf-8', (error, data) => {
  if (error) throw error;
  else console.log(data);
});