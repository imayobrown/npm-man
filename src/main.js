//Require writable to create write stream

var Writable = require('stream').Writable;

var ws = Writable({'decodeStrings': false});

ws._write = function(chunk, enc, next) {
    console.log(chunk.toString());
    next();
}
//Requires necessary for file to run
var fs = require('fs');

//Create read stream from opening the README file
var rs = fs.createReadStream('../README.md');

rs.pipe(ws);

//Pipe the output of the file to the command line
//readStream.pipe(process.stdout);
