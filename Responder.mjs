import Response from "./Response.mjs";
import Word from "./Word.mjs";

export default class Responder {
    respond(guessWord, answer) {
        return this.getResponse_(guessWord, answer).toString();
    }

    /**
     * @param {Word} guessWord The guess for which to get the response.
     * @param {Word} answer The answer for which to get a response.
     * 
     * @returns {Response} The response.
     */
    getResponse_(guessWord, answer) {
        var response = new Response();
        answer = answer.clone();

        for (var i = 0; i < guessWord.length; i++) {
            if (guessWord.getLetterOrdinal(i) === answer.getLetterOrdinal(i)) {
                response.setGreen(i);
                answer.clearLetter(i);
            }
        }

        for (var i = 0; i < guessWord.length; i++) {
            if (response.isNone(i)) {
                var letter = guessWord.getLetterOrdinal(i);
                var letterPos = answer.indexOfOrdinal(letter);
                if (letterPos !== -1) {
                    answer.clearLetter(letterPos);
                    response.setYellow(i);
                }
            }
        }
        return response;
    }    
}

