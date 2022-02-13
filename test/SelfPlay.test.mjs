import assert from 'assert/strict';
import SelfPlay from '../SelfPlay.mjs';
import HistogramSuggester from '../HistogramSuggester.mjs';

describe('SelfPlay', function() {
    this.timeout(8 * 60 * 60 * 1000); 
    
    it('guesses balls in 4 moves', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates).getGuessWithBestMostFrequestResponse());
        assert.equal(selfPlay.playGame('balls'), 4);
    });
    it('guesses opera in two moves', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates).getGuessWithBestMostFrequestResponse());
        assert.equal(selfPlay.playGame('opera'), 2);
        console.log(selfPlay.playAllGames());
    }); 

});