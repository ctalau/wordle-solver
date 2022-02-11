import Word from "./Word.mjs";
import Responder from "./Responder.mjs";

export default class HistogramComputer {
    constructor(words) {
        this.words = words;
        this.responder_  = new Responder(words);
    }

    getResponsesHistogram(guess) {
        var guessWord = new Word(guess);

        var histogram = {};
        for (let answer of this.words) {
            var response = this.responder_.getResponse_(guessWord, answer).toKey();
            histogram[response] = (histogram[response] || 0) + 1;
        }
        return histogram;
    }

}