import assert from 'assert/strict';
import SelfPlay from '../SelfPlay.mjs';
import HistogramSuggester from '../HistogramSuggester.mjs';

describe('SelfPlay', function() {
    it('guesses balls in 4 moves', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates).getGuessWithBestMostFrequestResponse());
        assert.equal(selfPlay.playGame('balls'), 4);
    });
    it('guesses opera in two moves', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates).getGuessWithBestMostFrequestResponse());
        assert.equal(selfPlay.playGame('opera'), 2);
    });

});