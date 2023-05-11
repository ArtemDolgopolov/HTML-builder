const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const destPath = path.join(__dirname, 'files-copy');
  await fs.mkdir(destPath, { recursive: true });

  const srcPath = './04-copy-directory/files';
  const files = await fs.readdir(srcPath);
  const destFiles = await fs.readdir(destPath);

  const filesSet = new Set(files);

  for (const file of destFiles) {
    if (!filesSet.has(file)) {
      const filePath = path.join(destPath, file);
      await fs.unlink(filePath);
    }
  }
  for (const file of files) {
    const pathToSrcFile = path.join(srcPath, file);
    const pathToDestFile = path.join(destPath, file);

    const srcStats = await fs.stat(pathToSrcFile).catch(() => null);
    const destStats = await fs.stat(pathToDestFile).catch(() => null);

    if (!destStats || (srcStats && srcStats.mtimeMs > destStats.mtimeMs)) {
      await fs.copyFile(pathToSrcFile, pathToDestFile);
    }
  }

  console.log('Copying is over');
}

copyDir().catch(err => console.error(err));
