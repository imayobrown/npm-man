var assert = require('assert');
var cliMarked = require('../src/cliMarked');

/*
 * Contains all of the tests for the cliMarked module
 *
 */

describe('cliMarked tests', function() {
    describe('header tests', function() {
        it('h1 test', function() {
            var headerOneTest = cliMarked('# HeaderOne');
            //console.log('headerOneTest: ' + headerOneTest);
            assert.equal(headerOneTest, '┌*********┐\n│\u001b[1mHeaderOne\u001b[22m│\n└*********┘');
        });
        it('h2 test', function() {
            var headerTwoTest = cliMarked('## HeaderTwo');
            assert.equal(headerTwoTest, '┌─────────┐\n│\u001b[1mHeaderTwo\u001b[22m│\n└─────────┘');
        });
        it('h3 test', function() {
            var headerThreeTest = cliMarked('### HeaderThree');
            assert.equal(headerThreeTest, ' \u001b[1mHeaderThree\u001b[22m\n└───────────┘');
        });
        it('h4 test', function() {
            var headerFourTest = cliMarked('#### HeaderFour');
            assert.equal(headerFourTest, '\u001b[1mHeaderFour\u001b[22m');
        });
        it('h5 test', function() {
            var headerFiveTest = cliMarked('##### HeaderFive');
            assert.equal(headerFiveTest, 'HeaderFive');
        });
        it('h6 test', function() {
            var headerSixTest = cliMarked('###### HeaderSix');
            assert.equal(headerSixTest, '\u001b[2mHeaderSix\u001b[22m');
        });
    });
    describe('strong tests', function() {
        it('strong underscore test', function() {
                var strongTest = cliMarked('__strong__');
                assert.equal(strongTest, '\033[1mstrong\033[22m');
        });
        it('strong asterisk test', function(){
            var strongTest = cliMarked('**strong**');
            assert.equal(strongTest, '\033[1mstrong\033[22m');
        });
    });
    describe('em tests', function() {
        it('em asterisk test', function() {
            var emTest = cliMarked('*em*');
            assert.equal(emTest, '\033[3mem\033[23m');
        });
        it('em underscore test', function() {
            var emTest = cliMarked('_em_');
            assert.equal(emTest, '\033[3mem\033[23m');
        });
    });
    describe('combined emphasis tests', function() {
        it('strong asterisks within em underscores', function() {
            var esTest = cliMarked('_em **strong**_');
            assert.equal(esTest, '\u001b[3mem \u001b[1mstrong\u001b[22m\u001b[23m');
        });
        it('strong underscore within em asterisks', function() {
            var esTest = cliMarked('*em __strong__*');
            assert.equal(esTest, '\u001b[3mem \u001b[1mstrong\u001b[22m\u001b[23m');
        });
        it('em asterisks within strong underscores', function() {
            var esTest = cliMarked('__strong *em*__');
            assert.equal(esTest, '\u001b[1mstrong \u001b[3mem\u001b[23m\u001b[22m');
        });
        it('em underscores within strong asterisks', function() {
            var esTest = cliMarked('**strong _em_**');
            assert.equal(esTest, '\u001b[1mstrong \u001b[3mem\u001b[23m\u001b[22m');
        });
    });
    describe('ordered list tests', function() {
        it('ordered list one element', function() {
            var olTest = cliMarked('1. ordered list item one');
            assert.equal(olTest, '        1. ordered list item one');
        });
        it('ordered list two elements', function() {
            var olTest = cliMarked('1. ordered list item one\n2. ordered list item two');
            assert.equal(olTest, '        1. ordered list item one\n        2. ordered list item two');
        });
    });
    describe('unordered list tests', function() {
        it('unordered list asterisks one item', function() {
            var ulTest = cliMarked('* unordered list item one');
            assert.equal(ulTest, '        • unordered list item one');
        });
        it('unordered list minuses one item', function() {
            var ulTest = cliMarked('- unordered list item one');
            assert.equal(ulTest, '        • unordered list item one');
        });
        it('unordered list pluses one item', function() {
            var ulTest = cliMarked('+ unordered list item one');
            assert.equal(ulTest, '        • unordered list item one');
        });
        it('unordered list asterisks > one item', function() {
            var ulTest = cliMarked('* unordered list item one\n* unordered list item two');
            assert.equal(ulTest, '        • unordered list item one\n        • unordered list item two');
        });
        it('unordered list minuses > one item', function() {
            var ulTest = cliMarked('- unordered list item one\n- unordered list item two');
            assert.equal(ulTest, '        • unordered list item one\n        • unordered list item two');
        });
        it('unordered list pluses > one item', function() {
            var ulTest = cliMarked('+ unordered list item one\n+ unordered list item two');
            assert.equal(ulTest, '        • unordered list item one\n        • unordered list item two');
        });
    });
    /* Need to figure out implementation for composite lists
    describe('composite list tests', function() {
        it('unordered list inside of ordered list', function() {
            var uolTest = cliMarked('1. ordered list item one\n* unordered list item one\n2. ordered list item two');
            assert.equal(uolTest, '');
        });
        it('ordered list inside of unordered list', function() {
            var oulTest = cliMarked('* unordered list item one\n 1. ordered list item one\n* unordered list item two');
            assert.equal(oulTest, '');
        });
    });
    */
    describe('table tests', function() {
        it('two column two row test', function() {
            var tableTest = cliMarked('| ColumnOne        | ColumnTwo           |\n| ------------- |:-------------:| -----:|\n| RowTwo      | RowThree |');
            console.log(tableTest);
            assert.equal(tableTest, '');
        });
        it('three column three tow test', function() {
            var tableTest = cliMarked('| ColumnOne        | ColumnTwo           | ColumnThree  |\n| ------------- |:-------------:| -----:|\n| ColumnOne      | ColumnTwo | ColumnThree |\n| ColumnOne      | ColumnTwo      |   ColumnThree |');
            assert.equal(tableTest, '');
        });
    });
    describe('codespan tests', function() {
    });
});
