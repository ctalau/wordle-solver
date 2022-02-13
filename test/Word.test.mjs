import Word from '../Word.mjs';
import assert from 'assert/strict';


describe('Word', function() {
    it('should be constructed correctly', function() {
        assert.equal(new Word(0).setLetters("abcde").getLetter(2), 'c');
    });
    it('should find letters', function() {
        assert.equal(new Word(0).setLetters("abcde").indexOf('d'), 3);
    });
    it('should find letters at start', function() {
        assert.equal(new Word(0).setLetters("abcde").indexOf('a'), 0);
    });
    it('should not find missing letters', function() {
        assert.equal(new Word(0).setLetters("abcde").indexOf('x'), -1);
    });

    it('should not find letters after being cleared', function() {
        var word = new Word(0).setLetters("abcde");
        word.clearLetter(2);
        assert.equal(word.indexOf('c'), -1);
    });
    

});