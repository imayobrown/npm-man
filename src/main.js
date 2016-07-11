function ripHeaders(data) {
    //Dispatch function to return replacement function
    function replaceHeaderDispatcher(headerIndex) {
        var headers = ["\033[41m",  "\033[45m", "\033[46m", "\033[47m"];
        return function(match, offset, string) {
            var strippedMatch = match.substr(match.indexOf(" ")).trim();
            return headers[headerIndex] + strippedMatch + "\033[0m";
        };
    }
    
    //Replace headers
    var replacedHeaders = data.replace(/^# .*/gm, replaceHeaderDispatcher(0))
        .replace(/^## .*/gm, replaceHeaderDispatcher(1))
        .replace(/^### .*/gm, replaceHeaderDispatcher(2))
        .replace(/^#### .*/gm, replaceHeaderDispatcher(3));

    return replacedHeaders;
}

function ripTextFormatting(data) {
    function replaceUnderline(match, offset, string) {
        var strippedMatch = match.slice(2, -2);
        return "\033[4m" + strippedMatch + "\033[0m";
    }

    function replaceItalics(match, offset, string) {
        var strippedMatch = match.slice(1, -1);
        return "\033[3m" + strippedMatch + "\033[0m";
    }
    
    function replaceBold(match, offset, string) {
        var strippedMatch = match.slice(2, -2);
        return "\033[1m" + strippedMatch + "\033[0m";
    }

    //Does not seem to work on Mac Bash 
    //TODO Troubleshoot this issue
    function replaceStrikeThrough(match, offset, string) {
        var strippedMatch = match.slice(2, -2);
        return "\033[9m" + strippedMatch + "\033[0m";
    }

    var replacedTextFormatting = data.replace(/\*\*.*?\*\*/gm, replaceBold)
        .replace(/\_\_.*?\_\_/gm, replaceBold)
        .replace(/\*.*?\*/gm, replaceItalics)
        .replace(/\_.*?\_/gm, replaceItalics)
        .replace(/\~\~.*?\~\~/gm, replaceStrikeThrough) //Not currently supported in Bash
        .replace(/\~\~.*?\~\~/gm, replaceStrikeThrough); //Not currently supported in Bash
    return replacedTextFormatting;
}

//Requires necessary for file to run
var fs = require('fs');
//Require writable to create write stream
var Writable = require('stream').Writable;

//Create writable stream
var ws = Writable({'decodeStrings': false});

ws._write = function(chunk, enc, next) {
    console.log(chunk.toString());
    var formattedText = chunk.toString();
    formattedText = ripHeaders(formattedText);
    formattedText = ripTextFormatting(formattedText);
    console.log(formattedText);
    next();
}

//Create read stream from opening the README file
var rs = fs.createReadStream('../test/testreadme.md');

rs.pipe(ws);
