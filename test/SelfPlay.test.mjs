import assert from 'assert/strict';
import SelfPlay from '../SelfPlay.mjs';
import HistogramSuggester from '../HistogramSuggester.mjs';
import { wordFromString } from '../wordlist.mjs';

describe('SelfPlay', function() {
    this.timeout(8 * 60 * 60 * 1000); 
    
    it('guesses balls in 4 moves', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates).getGuessWithBestScore());
        assert.equal(selfPlay.playGame(wordFromString('balls')), 4);
    });
    it('guesses opera in two moves', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates).getGuessWithBestScore());
        assert.equal(selfPlay.playGame(wordFromString('opera')), 2);
    }); 
    it('plays all games', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates).getGuessWithBestScore());
        // console.log(selfPlay.playAllGames());
    });
});