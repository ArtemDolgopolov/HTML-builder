const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, (err,files) => {
  if (err) {
    console.error(`Unable to read directory. ${err}`);
    return;
  } 

  files.forEach((file) => {
    const pathToFile = path.join(pathToFolder, file);
    fs.stat(pathToFile, (err,stats) => {
      if(err) {
        console.error(`Unable to receive an information about ${pathToFile} file: ${err}`);
        return;
      }
      if(stats.isFile()) console.log(`${file.split('.')[0]} - ${file.split('.')[1]} - ${stats.size} bytes`);
    });
  });
});