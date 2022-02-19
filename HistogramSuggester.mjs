import { WORDS } from "./wordlist.mjs";
import Word from "./Word.mjs";
import Responder from "./Responder.mjs";
import HistogramComputer from "./HistogramComputer.mjs";
import ConstraintSet from "./ConstraintSet.mjs";


export default class HistogramSuggester {
    /**
     * 
     * @param {Array<Word>} words The array of candidates from which to derive a suggestion. 
     * @param {{getScore: function(Object<number, number>): number}} scorer The scorer to use to score the candidates.
     * @param {Array<{guess: Word, info: Response}>} history The history of guesses.
     */
    constructor(words, scorer, history) {
        this.words = words;
        this.histogramComputer_ = new HistogramComputer(words);
        this.scorer = scorer;
        this.hardMode = false;
        this.history = history;
    }

    setHardMode(hardMode) {
        this.hardMode = hardMode;
    }

    /**
     * @param {Word} guess The guess for which to get the most frequent response. 
     */
    getScore(guess) {
        var histogram = this.histogramComputer_.getResponsesHistogram(guess);
        return this.scorer.getScore(histogram)
    }

    getGuessWithBestScore() {
        if (this.words.length <= 2) {
            // If only one word, pick that one.
            // If two words, pick the first one since there are equal chances of win for each.
            return this.words[0];
        }
        var bestGuess = '';
        var bestScore = Infinity;    
        var possibleAnswers = new Set(this.words);
        var candidates;
        if (this.hardMode) {
            var constraintSet = ConstraintSet.fromGuesses(this.history);
            candidates = WORDS.filter(word => constraintSet.matches(word));
        } else {
            candidates = WORDS;
        }
        for (let guess of candidates) {
            var score = this.getScore(guess);
            if (score < bestScore || score === bestScore && possibleAnswers.has(guess)) {
                bestGuess = guess;
                bestScore = score;
            }
        }
        return bestGuess;
    }
}

