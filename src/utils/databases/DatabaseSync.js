require('dotenv').config();
const path = require('path');
const { getFiles } = require('../file');
const connection = require('./connection');

class DatabaseSync {
  handle() {
    return getFiles(path.resolve(__dirname, '../../models'), function(file) {
      require(file);
      connection.sync({alter:true})
        .catch(error => {
          console.log(error);
        }).finally(() => {
          process.exit(0);
        });
    }, function(error) {
      console.log(error);
    });
  }
}

module.exports = DatabaseSync;

