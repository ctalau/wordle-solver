import assert from 'assert/strict';
import ExpectedValueScorer from '../scorers/ExpectedValueScorer.mjs';

describe('ExpectedValueScorer', function() {

    it('should compute a value for a single value hisogram', function() {
        assert.equal(1, new ExpectedValueScorer().getScore({"0":1}));
    })
});