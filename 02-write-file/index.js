const fs = require('fs');
const readline = require('readline');
const path = require('path');

const pathToHTML = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(pathToHTML);

console.log('Type exit to break or press ctrl + c\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if(input.toLowerCase() === 'exit') {
    writeStream.end();
    console.log('\nProcess is stopped');
    process.exit(0);
  }
  writeStream.write(input + '\n');
  console.log('You have typed this: ' + input);
});

process.on('SIGINT', () => {
  writeStream.end();
  console.log('\nProcess is stopped');
});