import { WORDS } from "./wordlist.mjs";
import Word from "./Word.mjs";
import Responder from "./Responder.mjs";
import HistogramComputer from "./HistogramComputer.mjs";


export default class HistogramSuggester {
    /**
     * 
     * @param {Array<Word>} words The array of candidates from which to derive a suggestion. 
     * @param {{getScore: function(Object<number, number>): number}} scorer The scorer to use to score the candidates.
     */
    constructor(words, scorer) {
        this.words = words;
        this.histogramComputer_ = new HistogramComputer(words);
        this.scorer = scorer;
        this.hardMode = false;
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
        var bestGuess = '';
        var bestScore = Infinity;    
        var possibleAnswers = new Set(this.words);
        var candidates = this.hardMode ? this.words : WORDS;
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

