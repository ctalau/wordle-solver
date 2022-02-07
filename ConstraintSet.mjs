import LetterMaxCountConstraint from "./LetterMaxCountConstraint.mjs";
import LetterPositionConstraint from "./LetterPositionConstraint.mjs";
import LetterMinCountConstraint from "./LetterMinCountConstraint.mjs";

export default class ConstraintSet {
    /**
     * 
     * @param {Array<Constraint>} constraints 
     */
    constructor(constraints) {
        this.constraints = constraints;
    }

    matches(word) {
        return this.constraints.every(constraint => constraint.matches(word));
    }
}

// TODO: exce
/**
 * 
 * @param {Array<{guess: string, info: string}>} history The history of the game.
 */
ConstraintSet.fromGuesses = function(history) {
    function constraintsFromGuess(word, info) {
        var constraints = [];

        for (var i = 0; i < word.length; i++) {
            if (info[i] === 'g') {
                constraints.push(new LetterPositionConstraint(word[i], true, i));
            } else if (info[i] === 'y') {
                constraints.push(new LetterPositionConstraint(word[i], false, i));
            }
        }

        var letterCount = new Map();
        for (var i = 0; i < word.length; i++) {
            if (info[i] === 'g' || info[i] === 'y') {
                letterCount.set(word[i], (letterCount.get(word[i]) || 0) + 1);
            }
        }
        for (var [letter, count] of letterCount) {
            constraints.push(new LetterMinCountConstraint(letter, count));
        }

        for (var i = 0; i < word.length; i++) {
            if (info[i] === '_') {
                constraints.push(new LetterMaxCountConstraint(word[i], letterCount.get(word[i]) || 0));
            }
        }
        

        return constraints;
    }

    var allConstraints = history.flatMap(({guess, info}) => constraintsFromGuess(guess, info));
    return new ConstraintSet(allConstraints);
}