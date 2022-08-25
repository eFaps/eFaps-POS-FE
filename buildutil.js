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


try {
  replace.sync(options);
  replace.sync(optionsDev);
  console.log('Build version set: ' + buildVersion);
}
catch (error) {
  console.error('Error occurred:', error);
  throw error
}
