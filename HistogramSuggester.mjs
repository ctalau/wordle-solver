import { WORDS } from "./wordlist.mjs";
import Word from "./Word.mjs";
import Responder from "./Responder.mjs";
import HistogramComputer from "./HistogramComputer.mjs";


export default class HistogramSuggester {
    constructor(words) {
        this.words = words;
        this.histogramComputer_ = new HistogramComputer(words);
    }

    getMostFrequestResponse(guess) {
        var histogram = this.histogramComputer_.getResponsesHistogram(guess);
        var max = 0;
        var maxResponse = '';
        for (var response in histogram) {
            if (histogram[response] > max) {
                max = histogram[response];
                maxResponse = response;
            }
        }
        return {response: maxResponse, count: max};
    }

    getGuessWithBestMostFrequestResponse() {
        var bestGuess = '';
        var bestCount = Infinity;    
        var candidatesSet = new Set(this.words);
        for (let guess of WORDS) {
            var response = this.getMostFrequestResponse(guess);
            if (response.count < bestCount || response.count === bestCount && candidatesSet.has(guess)) {
                bestGuess = guess;
                bestCount = response.count;
            }
        }
        return bestGuess;
    }
}

