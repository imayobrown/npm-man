var cliTable = require('cli-table2');
var marked = require('marked');
var renderer = new marked.Renderer();
var colors = require('colors/safe');

// Create format objects

var backgroundColor ={
};

var foregroundColor = {
    defaultBackground: '49m',
    black: '40m',
    red: '41m',
    green: '42m',
    yellow: '43m',
    blue: '44m',
    magenta: '45m',
    cyan: '46m',
    lightGray: '47m',
    darkGray: '100m',
    lightRed: '101m',
    lightGreen: '102m',
    lightYellow: '103m',
    lightBlue: '104m',
    lightMagenta: '105m',
    lightCyan: '106m',
    white: '107m'
};

var inlineFormat = {
    strong: '1m',
    em: '3m',
    codespan: '100m'
};

function format(text, code) {
    var encode = '\033[';
    var encodeEnd = '\033[0m';
    return encode + code + text + encodeEnd;
}

// Overload marked functions to use bash related formatting rather than html

renderer.paragraph = function(text) {
    return text;
};

renderer.heading = function(text, level) {
    var returnString, formatString;
    if (level === 1) {
        //formatString = "\033[41m" + text + "\033[0m";
        formatString = "\033[41m" + "\033[1m" + text + "\033[0m" + "\033[0m"; // use both background color and bold
        returnString = '┌' + '─'.repeat(text.length) + '┐\n│' + formatString + '│\n└' + '─'.repeat(text.length) + '┘';
        return returnString;
    }
    if (level === 2)
        return "\033[42m" + text + "\033[0m";
    if (level === 3)
        return "\033[43m" + text + "\033[0m";
    if (level === 4)
        return "\033[44m" + text + "\033[0m";
};

renderer.strong = function(text) {
    //return "\033[1m" + text + "\033[0m";
    return colors.bold(text);
};

renderer.em = function(text) {
    //return "\033[3m" + text + "\033[0m";
    return colors.italic(text);
};

renderer.listitem = function(text) {
    return text + '\n';
};

// Function needs to be modified to handle multiline list inputs. Right now it only handles case were there is no wrapping of list item lines
renderer.list = function(body, ordered) {
    var splitBody = body.split('\n').slice(0, -1);
    var list, listString;

    // If elements ordered add corresponding numbers in front of them
    if (ordered) {
        list = splitBody.map(function(currentValue, index, array) {
            return '        ' + (index + 1) + '. ' + currentValue;
        });
        listString = list.join('\n');
    }
    // If unordered just place dots in front of them
    else {
        list = splitBody.map(function(currentValue, index, array) {
            return '        • ' + currentValue;
        });
        listString = list.join('\n');
    }

    return listString;
};

//cli-table doesn't work so great with solarized profile
renderer.table = function(header, body){

    // Construct header array
    var slicedHeader = header.slice(9, -11); // Slice off end tags
    var headerArray = slicedHeader.split('</td><td>'); // Split sliced header

    // Instantiate table
    var table = new cliTable();
    var table = new cliTable({
        head: headerArray,
    });

    var slicedBody = body.slice(9, -11); // Slice off end tags
    var bodyArray = slicedBody.split('</td></tr>\n<tr>\n<td>'); // Split sliced body

    // Push each element of sliced body onto table
    bodyArray.forEach(function(currentValue, index, array) {
        var pushArray = currentValue.split('</td><td>');
        table.push(pushArray);
    });

    return table.toString();
};

renderer.tablecell = function(content, flags) {
    return '<td>' + content + '</td>';
};

renderer.codespan = function(code) {

    console.log(code);
};


console.log(marked('# test heading 1', { renderer: renderer }));
console.log(marked('## test heading 2', {renderer: renderer}));
console.log(marked('### test heading 3', {renderer: renderer}));
console.log(marked('#### test heading 4', {renderer: renderer}));
console.log(marked('**test strong**', {renderer: renderer}));
console.log(marked('*test em*', {renderer: renderer}));
console.log(marked('1. ordered\n2. list\n3. test', {renderer: renderer}));
console.log(marked('* unordered\n* list\n* test', {renderer: renderer}));
//console.log('| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 2 is      | centered      |   $12 |\n| zebra stripes | are neat      |    $1 |');
console.log(marked('| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 2 is      | centered      |   $12 |\n| zebra stripes | are neat      |    $1 |', {renderer: renderer}));
marked('`codespan test`', {renderer: renderer});
//console.log( '•');
