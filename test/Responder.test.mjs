import Responder from "../Responder.mjs";
import assert from 'assert/strict';


describe('Responder', function() {
    it('works correctly with duplicated letters', () => {
        assert.equal(new Responder().respond('lulls', 'mulls'), '_gggg');
    });
    it('works correctly with yellow and green letters', () => {
        assert.equal(new Responder().respond('smart', 'surfs'), 'g__y_');
    });

});