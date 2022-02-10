import assert from 'assert/strict';
import SelfPlay from '../SelfPlay.mjs';
import Responder from '../Responder.mjs';

describe('SelfPlay', function() {
    it('guesses balls in 4 moves', () => {
        var selfPlay = new SelfPlay(candidates => new Responder(candidates).getGuessWithBestMostFrequestResponse());
        assert.equal(selfPlay.playGame('balls'), 4);
    });
    it('guesses opera in two moves', () => {
        var selfPlay = new SelfPlay(candidates => new Responder(candidates).getGuessWithBestMostFrequestResponse());
        assert.equal(selfPlay.playGame('opera'), 2);
    });

});