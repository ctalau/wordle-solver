import { WORDS } from "./wordlist.mjs";
import Response from "./Response.mjs";


export default class Responder {

    constructor(words) {
        this.words = words;
    }

    respond(guess, answer) {
        return this.getResponse_(guess, answer).toString();
    }

    getResponse_(guess, answer) {
        var response = new Response();

        var answerLetters = [answer[0], answer[1], answer[2], answer[3], answer[4]];
        for (var i = 0; i < guess.length; i++) {
            if (guess[i] === answer[i]) {
                response.setGreen(i);
                answerLetters[i] = ' ';
            }
        }

        for (var i = 0; i < guess.length; i++) {
            var letter = guess[i];
            if (response.isNone(i)) {
                var letterPos = answerLetters.indexOf(letter);
                if (letterPos !== -1) {
                    answerLetters[letterPos] = ' ';
                    response.setYellow(i);
                }
            }
        }
        return response;
    }
    getResponsesHistogram(guess) {
        var histogram = {};
        for (let answer of this.words) {
            var response = this.getResponse_(guess, answer).toKey();
            histogram[response] = (histogram[response] || 0) + 1;
        }
        return histogram;
    }

    getMostFrequestResponse(guess) {
        var histogram = this.getResponsesHistogram(guess);
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

