var marked = require('marked');
var renderer = new marked.Renderer();

renderer.heading = function(text, level) {
    return "\033[41m" + text + "\033[0m";
};

console.log(marked('# test heading', { renderer: renderer }));

