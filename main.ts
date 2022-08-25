import * as path from 'path';
import * as url from 'url';

let baseUrl;
let devMode = false;
let lifeMode = false;
console.log(process.argv);

process.argv.forEach(val => {
  if (val === '--dev') {
    devMode = true;
  }
  if (val === '--life') {
    lifeMode = true;
  }
  if (val.startsWith('--baseUrl=')) {
    baseUrl = val.replace('--baseUrl=', '');
  }
});

