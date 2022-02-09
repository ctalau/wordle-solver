import { WORDS } from "./wordlist.mjs";

export default class Responder {

    constructor(words) {
        this.words = words;
    }

    respond(guess, answer) {
        var response = Array(guess.length).fill('_');
        
        var answerLetters = [... answer];
        for (var i = 0; i < guess.length; i++) {
            if (guess[i] === answer[i]) {
                response[i] = 'g';
                answerLetters[i] = ' ';
            }
        }

        for (var i = 0; i < guess.length; i++) {
            var letter = guess[i];
            if (response[i] === '_') {
                var letterPos = answerLetters.indexOf(letter);
                if (letterPos !== -1) {
                    answerLetters[letterPos] = ' ';
                    response[i] = 'y';
                }
            }
        }
        return response;
    }

    getResponsesHistogram(guess) {
        var histogram = {};
        for (let answer of this.words) {
            var response = this.respond(guess, answer);
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

// console.log(new Responder(WORDS).respond('lulls', 'mulls')); // should be '_gggg'