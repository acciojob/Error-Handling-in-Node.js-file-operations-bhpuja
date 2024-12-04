const fs = require('fs');

function readFileContents(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      switch (err.code) {
        case 'ENOENT':
          callback('File not found. Please provide a valid file path.');
          break;
        case 'EACCES':
          callback('Permission denied. Unable to read the file.');
          break;
        default:
          callback(`An error occurred while reading the file: ${err.message}`);
      }
    } else {
      callback(null, data);
    }
  });
}

// CLI-specific logic
if (require.main === module) {
  const filePath = process.argv[2];
  readFileContents(filePath, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      console.log('File contents:', data);
    }
  });
}

module.exports = { readFileContents }; // Export for testing purposes
