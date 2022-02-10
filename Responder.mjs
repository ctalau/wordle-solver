import { WORDS } from "./wordlist.mjs";
import Response from "./Response.mjs";
import Word from "./Word.mjs";


export default class Responder {

    constructor(words) {
        this.words = words;
    }

    respond(guess, answer) {
        var guessWord = new Word(guess);
        return this.getResponse_(guessWord, answer).toString();
    }

    getResponse_(guessWord, answer) {
        var response = new Response();

        var answerWord = new Word(answer);
        for (var i = 0; i < answer.length; i++) {
            if (guessWord.getLetterOrdinal(i) === answerWord.getLetterOrdinal(i)) {
                response.setGreen(i);
                answerWord.clearLetter(i);
            }
        }

        for (var i = 0; i < answer.length; i++) {
            var letter = guessWord.getLetterOrdinal(i);
            if (response.isNone(i)) {
                var letterPos = answerWord.indexOfOrdinal(letter);
                if (letterPos !== -1) {
                    answerWord.clearLetter(letterPos);
                    response.setYellow(i);
                }
            }
        }
        return response;
    }
    getResponsesHistogram(guess) {
        var guessWord = new Word(guess);

        var histogram = {};
        for (let answer of this.words) {
            var response = this.getResponse_(guessWord, answer).toKey();
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

