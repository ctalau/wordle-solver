import HistogramSuggester from "../HistogramSuggester.mjs";
import ExpectedValueScorer from "../scorers/ExpectedValueScorer.mjs";
import { wordFromString, WORDS } from "../wordlist.mjs";
import assert from 'assert/strict';


describe('HistogramSuggester', function() {
    it('should suggest a word for cigar', function() {
        var guess = new HistogramSuggester([wordFromString('cigar')], new ExpectedValueScorer()).getGuessWithBestScore();
        assert.equal(guess.toString(), 'cigar');
    });
});