var marked = require('marked');
var colors = require('colors/safe');
var cliTable = require('cli-table2');

function paragraph(text) {
    return text;
};

function strong(text) {
    return colors.bold(text);
};

function em(text) {
    return colors.italic(text);
};

function strikethrough(text) {
    return colors.strikethrough(text);
};

function starBox(text, rawTextSize) {
    var starBoxedText = '┌' + '*'.repeat(rawTextSize) + '┐\n│' + text + '│\n└' + '*'.repeat(rawTextSize) + '┘';
    return starBoxedText;
};

function solidBox(text, rawTextSize) {
    var boxedText = '┌' + '─'.repeat(rawTextSize) + '┐\n│' + text + '│\n└' + '─'.repeat(rawTextSize) + '┘';
    return boxedText;
};

function bottomBorder(text, rawTextSize) {
    var botBorderText = ' ' + text + '\n└' + '─'.repeat(rawTextSize) + '┘';
    return botBorderText;
};

function appendHLine(text) {
    var formattedText = text + '\n' + '─'.repeat(process.stdout.columns);
    return formattedText;
};

/*
 * Heading 1 = bold text surrounded by star box
 * Heading 2 = bold text surrounded by solid border box
 * Heading 3 = bold text bottom border
 * Heading 4 = bold text
 * Heading 5 = regular text
 * heading 6 = dim text
 */
function heading(text, level) {
    var formattedText;
    if (level === 1) {
        formattedText = colors.bold(text);
        formattedText = starBox(formattedText, text.length);
    }
    if (level === 2) {
        formattedText = colors.bold(text); // make text bold
        formattedText = solidBox(formattedText, text.length); // surround text with solid box 
    }
    else if (level === 3) {
        formattedText = colors.bold(text);
        formattedText = bottomBorder(formattedText, text.length);
    }
    else if (level === 4) {
        formattedText = colors.bold(text);
    }
    else if (level === 5) {
        formattedText = text;
    }
    else if (level === 6) {
        formattedText = colors.dim(text);
    }
    return formattedText;
};

function listitem(text) {
    return text + '\n';
};

function list(body, ordered) {
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

function tablecell(content, flags) {
    return '<td>' + content + '</td>';
};

//cli-table doesn't work so great with solarized profile
function table(header, body){

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

function cliMarked(src, opt, callback) {
    renderer = new marked.Renderer();
    renderer.paragraph = paragraph;
    renderer.strong = strong;
    renderer.em = em;
    renderer.heading = heading;
    renderer.listitem = listitem;
    renderer.list = list;
    renderer.tablecell = tablecell;
    renderer.table = table;

    return marked(src, {renderer: renderer});


}


module.exports = cliMarked;

