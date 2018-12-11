var replace = require('replace-in-file');
var package = require("./package.json");
var buildVersion = package.version;
const options = {
  files: 'src/environments/environment.prod.ts',
  from: /version: '(.*)'/g,
  to: "version: '" + buildVersion + "'",
  allowEmptyPaths: false,
};

const optionsDev = {
  files: 'src/environments/environment.ts',
  from: /version: '(.*)'/g,
  to: "version: '" + buildVersion + "-dev'",
  allowEmptyPaths: false,
};

const electronDev = {
  files: 'src/environments/environment.electron.ts',
  from: /version: '(.*)'/g,
  to: "version: '" + buildVersion + "-dev'",
  allowEmptyPaths: false,
};

const electron = {
  files: 'src/environments/environment.electron.prod.ts',
  from: /version: '(.*)'/g,
  to: "version: '" + buildVersion + "'",
  allowEmptyPaths: false,
};

try {
  replace.sync(options);
  replace.sync(optionsDev);
  replace.sync(electronDev);
  replace.sync(electron);
  console.log('Build version set: ' + buildVersion);
}
catch (error) {
  console.error('Error occurred:', error);
  throw error
}
