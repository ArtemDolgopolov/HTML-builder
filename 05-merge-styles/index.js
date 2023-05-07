const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
  const stylesFolder = path.join(__dirname, 'styles');
  const files = await fs.readdir(stylesFolder);
  const cssStyles = [];
 
  for (const file of files) {
    const pathToFile = path.join(stylesFolder, file);
    const stats = await fs.stat(pathToFile);
    if (stats.isFile() && path.extname(file) === '.css') {
      const fileContent = await fs.readFile(pathToFile, 'utf-8');
      cssStyles.push(fileContent);
    }
  }

  const destFile = path.join(__dirname, 'project-dist', 'bundle.css');
  await fs.writeFile(destFile, cssStyles.join('\n'));

  console.log('Styles merging is over');
}

mergeStyles().catch(err => console.error(err));