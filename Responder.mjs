import Response from "./Response.mjs";
import Word from "./Word.mjs";


export default class Responder {
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
            if (response.isNone(i)) {
                var letter = guessWord.getLetterOrdinal(i);
                var letterPos = answerWord.indexOfOrdinal(letter);
                if (letterPos !== -1) {
                    answerWord.clearLetter(letterPos);
                    response.setYellow(i);
                }
            }
        }
        return response;
    }    
}

