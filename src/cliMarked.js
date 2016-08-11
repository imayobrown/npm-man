var marked = require('marked');
var colors = require('colors/safe');

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

function cliMarked(src, opt, callback) {
    renderer = new marked.Renderer();
    renderer.paragraph = paragraph;
    renderer.strong = strong;
    renderer.em = em;
    renderer.heading = heading;

    return marked(src, {renderer: renderer});


}


module.exports = cliMarked;

