import assert from 'assert/strict';
import SelfPlay from '../SelfPlay.mjs';
import HistogramSuggester from '../HistogramSuggester.mjs';
import { wordFromString } from '../wordlist.mjs';
import MaxScorer from '../scorers/MaxScorer.mjs';
import ExpectedValueScorer from '../scorers/ExpectedValueScorer.mjs';

function assertAverage(histo, expected) {
    var actual = histo.getAvg();
    assert(Math.abs(actual - expected) < 0.01, `Expected ${actual} to be close to ${expected}.`);
}

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
        var hardModeAverage = 3.62;
        var hardModeFails = 11;
        it(`plays hard mode with average ${hardModeAverage} and fails ${hardModeFails}`, () => {
            var scorer = new ExpectedValueScorer();
            var selfPlay = new SelfPlay((candidates, history) => {
                var suggester = new HistogramSuggester(candidates, scorer, history);
                suggester.setHardMode(true);
                return suggester.getGuessWithBestScore()
            });
            var histo = selfPlay.playAllGames();
            assertAverage(histo, hardModeAverage);
            assert(histo.getFails() <= hardModeFails);
        });
        var easyModeAverage = 3.53;
        it(`plays easy mode with average ${easyModeAverage} and no fails`, () => {
            var scorer = new ExpectedValueScorer();
            var selfPlay = new SelfPlay((candidates, history) => {
                var suggester = new HistogramSuggester(candidates, scorer, history);
                return suggester.getGuessWithBestScore()
            });
            var histo = selfPlay.playAllGames();
            assertAverage(histo, easyModeAverage);
            assert.equal(histo.getFails(), 0);
        });
    });

    describe('with MaxScorer', () => {
        var hardModeAverage = 3.67;
        var hardModeFails = 11;
        it(`plays hard mode with average ${hardModeAverage} and fails ${hardModeFails}`, () => {
            var scorer = new MaxScorer();
            var selfPlay = new SelfPlay((candidates, history) => {
                var suggester = new HistogramSuggester(candidates, scorer, history);
                suggester.setHardMode(true);
                return suggester.getGuessWithBestScore()
            });
            var histo = selfPlay.playAllGames();
            assertAverage(histo, hardModeAverage);
            assert(histo.getFails() <= hardModeFails);
        });
        
        var easyModeAverage = 3.59;
        it(`plays easy mode with average ${easyModeAverage} and no fails`, () => {
            var scorer = new MaxScorer();
            var selfPlay = new SelfPlay(candidates => {
                var suggester = new HistogramSuggester(candidates, scorer);
                return suggester.getGuessWithBestScore()
            });
            var histo = selfPlay.playAllGames();
            assertAverage(histo, easyModeAverage);
            assert.equal(histo.getFails(), 0);
        });
    });
});