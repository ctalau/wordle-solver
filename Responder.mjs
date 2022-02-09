import { WORDS } from "./wordlist.mjs";

export default class Responder {

    constructor(words, hard) {
        this.words = words;
        this.hard = hard;
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
        var guessAmongMatches = this.getGuessWithBestMostFrequestResponseAmong(this.words);
        if (this.hard || this.words.length === WORDS.length) {
            return guessAmongMatches.guess;
        } else {
            var guess = this.getGuessWithBestMostFrequestResponseAmong(WORDS);
            if (guess.count === guessAmongMatches.count) {
                // It has a chance to be the correct answer.
                return guessAmongMatches.guess;
            } else {
                return guess.guess;
            }
        }
    }

    getGuessWithBestMostFrequestResponseAmong(candidates) {
        var bestGuess = '';
        var bestCount = Infinity;    
        for (let guess of candidates) {
            var response = this.getMostFrequestResponse(guess);
            if (response.count < bestCount) {
                bestGuess = guess;
                bestCount = response.count;
            }
        }
        return {guess: bestGuess, count: bestCount};
    }
}

// console.log(new Responder(WORDS).respond('lulls', 'mulls')); // should be '_gggg'