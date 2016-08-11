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
    });
    describe('ordered list tests', function() {
    });
    describe('unordered list tests', function() {
    });
    describe('table tests', function() {
    });
    describe('codespan tests', function() {
    });
});
