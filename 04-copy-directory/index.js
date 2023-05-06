const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const destPath = path.join(__dirname, 'files-copy');
  await fs.mkdir(destPath, {recursive: true});

  const srcPath = './04-copy-directory/files';
  const files = await fs.readdir(srcPath);

  for (const file of files) {
    const pathToSrcFile = path.join(srcPath, file);
    const pathToDestFile = path.join(destPath, file);
    await fs.copyFile(pathToSrcFile, pathToDestFile);
  }

  console.log('Copying is over');
}

copyDir().catch(err => console.error(err));
