import LetterMaxCountConstraint from "./constraints/LetterMaxCountConstraint.mjs";
import LetterPositionConstraint from "./constraints/LetterPositionConstraint.mjs";
import LetterMinCountConstraint from "./constraints/LetterMinCountConstraint.mjs";
import Response from "./Response.mjs";
import Word from "./Word.mjs";

export default class ConstraintSet {
    /**
     * 
     * @param {Array<Constraint>} constraints 
     */
    constructor(constraints) {
        this.constraints = constraints;
    }

    /**
     * 
     * @param {Word} word The word to match.
     * @return {boolean} True if the word matches the constraints.
     */
    matches(word) {
        return this.constraints.every(constraint => constraint.matches(word));
    }
}

/**
 * @param {Array<{guess: Word, info: Response}>} history The history of the game.
 */
ConstraintSet.fromGuesses = function(history) {
    /**
     * 
     * @param {Word} word 
     * @param {Response} info 
     * @returns 
     */
    function constraintsFromGuess(word, info) {
        var constraints = [];

        for (var i = 0; i < word.length; i++) {
            if (info.isGreen(i)) {
                constraints.push(new LetterPositionConstraint(word.getLetter(i), true, i));
            } else if (info.isYellow(i)) {
                constraints.push(new LetterPositionConstraint(word.getLetter(i), false, i));
            }
        }

        var letterCount = new Map();
        for (var i = 0; i < word.length; i++) {
            if (!info.isNone(i)) {
                var letter = word.getLetter(i);
                letterCount.set(letter, (letterCount.get(letter) || 0) + 1);
            }
        }
        for (var [letter, count] of letterCount) {
            constraints.push(new LetterMinCountConstraint(letter, count));
        }

        for (var i = 0; i < word.length; i++) {
            if (info.isNone(i)) {
                var letter = word.getLetter(i);
                constraints.push(new LetterMaxCountConstraint(letter, letterCount.get(letter) || 0));
            }
        }
        

        return constraints;
    }

    var allConstraints = history.flatMap(({guess, info}) => constraintsFromGuess(guess, info));
    return new ConstraintSet(allConstraints);
}