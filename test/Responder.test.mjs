import Responder from "../Responder.mjs";
import assert from 'assert/strict';


describe('Responder', function() {
    it('works correctly with duplicated letters', () => {
        assert.equal(new Responder().respond('lulls', 'mulls').join(''), '_gggg');
    });
});