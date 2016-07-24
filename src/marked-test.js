var cliTable = require('cli-table');
var marked = require('marked');
var renderer = new marked.Renderer();

// Overload marked functions to use bash related formatting rather than html

renderer.paragraph = function(text) {
    return text;
};

renderer.heading = function(text, level) {
    var returnString, formatString;
    if (level === 1) {
        //formatString = "\033[41m" + text + "\033[0m";
        formatString = "\033[41m" + "\033[1m" + text + "\033[0m" + "\033[0m";
        returnString = '┌' + '-'.repeat(text.length) + '┐\n│' + formatString + '│\n└' + '-'.repeat(text.length) + '┘';
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
    return "\033[1m" + text + "\033[0m";
};

renderer.em = function(text) {
    return "\033[3m" + text + "\033[0m";
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

renderer.table = function(header, body){
    //console.log('header: ', header);
    //console.log('body: ', body);

    // Construct header array
    var slicedHeader = header.slice(9, -11); // Slice off end tags
    var headerArray = slicedHeader.split('</td><td>'); // Split sliced header
    //console.log('sliced header: ', slicedHeader);
    //console.log('header array: ', headerArray);

    // Instantiate table
    var table = new cliTable();
    var table = new cliTable({
        head: headerArray,
        chars: {'mid': '|', 'left-mid': '', 'mid-mid': '', 'right-mid': ''}
    });

    var slicedBody = body.slice(9, -11); // Slice off end tags
    var bodyArray = slicedBody.split('</td></tr>\n<tr>\n<td>'); // Split sliced body
    //console.log('sliced body: ', slicedBody);
    //console.log('body array: ', bodyArray);

    // Push each element of sliced body onto table
    bodyArray.forEach(function(currentValue, index, array) {
        var pushArray = currentValue.split('</td><td>');
        table.push(pushArray);
    });

    console.log(table.options);
    console.log(table.toString());
};

/*
renderer.tablerow = function(content) {
    var splitContent = content.split('splitter');

    console.log('splitContent: ', splitContent);
    console.log('end of tablerow function');
    //return splitContent;
    return content;
};
*/

renderer.tablecell = function(content, flags) {
    return '<td>' + content + '</td>';
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
marked('| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 2 is      | centered      |   $12 |\n| zebra stripes | are neat      |    $1 |', {renderer: renderer});
//console.log( '•');
console.log( 8*'_');
