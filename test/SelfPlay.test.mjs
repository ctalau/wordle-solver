import assert from 'assert/strict';
import SelfPlay from '../SelfPlay.mjs';
import HistogramSuggester from '../HistogramSuggester.mjs';
import { wordFromString } from '../wordlist.mjs';
import MaxScorer from '../scorers/MaxScorer.mjs';
import ExpectedValueScorer from '../scorers/ExpectedValueScorer.mjs';

describe('SelfPlay', function() {
    this.timeout(8 * 60 * 60 * 1000); 
    
    it('guesses balls in 4 moves', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates, new MaxScorer()).getGuessWithBestScore());
        assert.equal(selfPlay.playGame(wordFromString('balls')), 4);
    });
    it('guesses opera in two moves', () => {
        var selfPlay = new SelfPlay(candidates => new HistogramSuggester(candidates, new MaxScorer()).getGuessWithBestScore());
        assert.equal(selfPlay.playGame(wordFromString('opera')), 2);
    }); 

    describe('with ExpectedValueScorer', () => {
        it('plays hard mode with average of 3.58 and 238 fails', () => {
            var scorer = new ExpectedValueScorer();
            var selfPlay = new SelfPlay(candidates => {
                var suggester = new HistogramSuggester(candidates, scorer);
                suggester.setHardMode(true);
                return suggester.getGuessWithBestScore()
            });
            var histo = selfPlay.playAllGames();
            assert.deepEqual(histo.toObject(), {
                '1': 16,
                '2': 921,
                '3': 2452,
                '4': 1318,
                '5': 571,
                '6': 241,
                '7': 127,
                '8': 63,
                '9': 25,
                '10': 15,
                '11': 5,
                '12': 1,
                '13': 2
            })
        });
    });

    describe('with MaxScorer', () => {
        it('plays hard mode with average of 3.70 and 243 fails', () => {
            var scorer = new MaxScorer();
            var selfPlay = new SelfPlay(candidates => {
                var suggester = new HistogramSuggester(candidates, scorer);
                suggester.setHardMode(true);
                return suggester.getGuessWithBestScore()
            });
            var histo = selfPlay.playAllGames();
            console.log(histo);
            assert.deepEqual(histo.toObject(), {
                '1': 16,
                '2': 682,
                '3': 2342,
                '4': 1624,
                '5': 590,
                '6': 260,
                '7': 121,
                '8': 75,
                '9': 21,
                '10': 14,
                '11': 5,
                '12': 5,
                '13': 2
              });
        });
    });
});