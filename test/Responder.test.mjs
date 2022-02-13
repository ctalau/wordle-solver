import Responder from "../Responder.mjs";
import assert from 'assert/strict';
import { wordFromString } from "../wordlist.mjs";


describe('Responder', function() {
    it('works correctly with duplicated letters', () => {
        assert.equal(new Responder().respond(wordFromString('lulls'), wordFromString('mulls')), '_gggg');
    });
    it('works correctly with yellow and green letters', () => {
        assert.equal(new Responder().respond(wordFromString('smart'), wordFromString('surfs')), 'g__y_');
    });

});