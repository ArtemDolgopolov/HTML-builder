const fs = require('fs').promises;
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, 'components');
const STYLES_DIR = path.join(__dirname, 'styles');
const ASSETS_DIR = path.join(__dirname, 'assets');
const TEMPLATE_FILE = path.join(__dirname, 'template.html');
const INDEX_FILE = './06-build-page/project-dist/index.html';
const STYLE_FILE = './06-build-page/project-dist/style.css';
const ASSETS_DIST_DIR = './06-build-page/project-dist/assets';

async function buildPage() {
  try {
    await fs.mkdir('./06-build-page/project-dist');

    const template = await fs.readFile(TEMPLATE_FILE, 'utf-8');

    const tagRegex = /{{\s*(\w+)\s*}}/g;
    let match = tagRegex.exec(template);
    const tags = [];
    while (match) {
      tags.push(match[1]);
      match = tagRegex.exec(template);
    }

    let result = template;
    for (const tag of tags) {
      const componentFile = path.join(COMPONENTS_DIR, `${tag}.html`);
      const component = await fs.readFile(componentFile, 'utf-8');
      result = result.replace(`{{${tag}}}`, component);
    }

    await fs.writeFile(INDEX_FILE, result);

    const styleFiles = await fs.readdir(STYLES_DIR);
    let styles = '';
    for (const file of styleFiles) {
      if (path.extname(file) === '.css') {
        const style = await fs.readFile(path.join(STYLES_DIR, file), 'utf-8');
        styles += style;
      }
    }

    await fs.writeFile(STYLE_FILE, styles);

    await copyFolder(ASSETS_DIR, ASSETS_DIST_DIR);

    console.log('Done!');
  } catch (err) {
    console.error(err);
  }
}

async function copyFolder(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });

  await fs.mkdir(dest, {recursive: true});

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyFolder(srcPath, destPath);
    } else {
      if (path.extname(entry.name) === '.html') {
        throw new Error('No .html files are allowed in assets folder');
      }
      await fs.copyFile(srcPath, destPath);
    }
  }
}

buildPage();