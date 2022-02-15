import assert from 'assert/strict';
import SelfPlay from '../SelfPlay.mjs';
import HistogramSuggester from '../HistogramSuggester.mjs';
import { wordFromString } from '../wordlist.mjs';
import MaxScorer from '../scorers/MaxScorer.mjs';
import ExpectedValueScorer from '../scorers/ExpectedValueScorer.mjs';

describe('SelfPlay', function() {
    this.timeout(8 * 60 * 60 * 1000); 
    
    it('guesses rival', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates, new MaxScorer()).getGuessWithBestScore());
        assert(selfPlay.playGame(wordFromString('rival')) < 6);
    });
    it('guesses opera', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates, new MaxScorer()).getGuessWithBestScore());
        assert(selfPlay.playGame(wordFromString('opera')) < 6);
    }); 
    it('guesses cigar', () => {
        var selfPlay = new SelfPlay(candidates => {
            var suggester = new HistogramSuggester(candidates, new ExpectedValueScorer());
            return suggester.getGuessWithBestScore();
        });
        assert(selfPlay.playGame(wordFromString('cigar')) < 6);
    }); 

    describe('with ExpectedValueScorer', () => {
        it('plays hard mode with average of 3.631 and 9 fails', () => {
            var scorer = new ExpectedValueScorer();
            var selfPlay = new SelfPlay(candidates => {
                var suggester = new HistogramSuggester(candidates, scorer);
                suggester.setHardMode(true);
                return suggester.getGuessWithBestScore()
            });
            var histo = selfPlay.playAllGames();
            console.log(histo.toString());
            assert(histo.getAvg() < 3.631);
            assert(histo.getFails() <= 9);
        });
        // Easy mode: Avg: 3.520138588133391,  fails: 0,       max: 5
    });

    describe('with MaxScorer', () => {
        it('plays hard mode with average of 3.71 and 11 fails', () => {
            var scorer = new MaxScorer();
            var selfPlay = new SelfPlay(candidates => {
                var suggester = new HistogramSuggester(candidates, scorer);
                suggester.setHardMode(true);
                return suggester.getGuessWithBestScore()
            });
            var histo = selfPlay.playAllGames();
            assert(histo.getAvg() < 3.71);
            assert(histo.getFails() <= 11);
        });
    });
});