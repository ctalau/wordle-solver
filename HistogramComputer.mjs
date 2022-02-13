import Word from "./Word.mjs";
import Responder from "./Responder.mjs";

export default class HistogramComputer {
    /**
     * @param {Array<Word>} words The array of words to include in histogram.
     */
    constructor(words) {
        this.words = words;
        this.responder_  = new Responder(words);
    }

    /**
     * @param {Word} guess The guess for which to compute the histogram.
     * 
     * @return {Object<number, number>} The number of possible answers for each response (encoded as its key).
     */
    getResponsesHistogram(guess) {
        var histogram = {};
        for (let answer of this.words) {
            var response = this.responder_.getResponse_(guess, answer).toKey();
            histogram[response] = (histogram[response] || 0) + 1;
        }
        return histogram;
    }

}