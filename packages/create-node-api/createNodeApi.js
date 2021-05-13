const program = require('commander');
const package = require('./package.json');
const { join } = require('path');
const fs = require('fs');
const file = join(__dirname, 'file.txt');
const { exec } = require('child_process');

function init() {
  program.version(package.version);
  const MKDIR = {
    FOLDERS: [
      'mkdir controllers',
      'mkdir services',
      'mkdir models',
    ]
  };

  const logs = {
    executable: (error, stdout, stderr) => {
      if (error) {
        console.log("Error: ", error);
      }
      if (stderr) {
        console.log("stderr: ", stderr);
      }
      console.log( stdout);
    },
  };

  program
    .command('create [name]')
    .description('Cria a estrutura de uma API node')
    .action((name) => {
      console.log(`criando API ${name}`);
      exec(`mkdir ${name}; cd ${name}; yarn init -y; ${MKDIR.FOLDERS.join(';')}; yarn add express`, logs.executable);
    });

  program.parse(process.argv);
}

module.exports = {
  init,
};
