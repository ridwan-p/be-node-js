var fs = require('fs');
const path = require('path');

function getFiles(dirname, callback, onError) {
  return fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      callback(path.resolve(dirname, filename));
    });
  });
}

function readFiles(dirname, onFileContent, onError) {
  return getFiles(dirname, function(file) {
    fs.readFile(file, 'utf-8', function(err, content) {
      if (err) {
        onError(err);
        return;
      }
      const filename = path.basename(file);
      onFileContent(filename, content);
    });
  }, onError);
}

module.exports = {
  getFiles,
  readFiles
};