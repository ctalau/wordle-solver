import { WORDS } from "./wordlist.mjs";
import Word from "./Word.mjs";
import Responder from "./Responder.mjs";
import HistogramComputer from "./HistogramComputer.mjs";


export default class HistogramSuggester {
    /**
     * 
     * @param {Array<Word>} words The array of candidates from which to derive a suggestion. 
     */
    constructor(words) {
        this.words = words;
        this.histogramComputer_ = new HistogramComputer(words);
    }

    /**
     * @param {Word} guess The guess for which to get the most frequent response. 
     */
    getScore(guess) {
        var histogram = this.histogramComputer_.getResponsesHistogram(guess);
        var max = 0;
        for (var response in histogram) {
            if (histogram[response] > max) {
                max = histogram[response];
            }
        }
        return max;
    }

    getGuessWithBestScore() {
        var bestGuess = '';
        var bestScore = Infinity;    
        var candidatesSet = new Set(this.words);
        for (let guess of WORDS) {
            var score = this.getScore(guess);
            if (score < bestScore || score === bestScore && candidatesSet.has(guess)) {
                bestGuess = guess;
                bestScore = score;
            }
        }
        return bestGuess;
    }
}

