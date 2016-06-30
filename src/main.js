//Requires necessary for file to run
var fs = require('fs');

//Create read stream from opening the README file
var readStream = fs.createReadStream('README.md');

//Pipe the output of the file to the command line
readStream.pipe(process.stdout);
