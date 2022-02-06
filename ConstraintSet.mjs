import Constraint from "./Constraint.mjs";

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


/**
 * 
 * @param {Array<{guess: string, info: string}>} history The history of the game.
 */
ConstraintSet.fromGuesses = function(history) {
    function constraintsFromGuess(word, info) {
        var constraints = [];
        for (var i = 0; i < word.length; i++) {
            var letter = word[i];
            var occurs = info[i] === "g";
            var pos = info[i] === "g"  || info[i] === "y" ? i : null;
            constraints.push(new Constraint(letter, occurs, pos));
        }
        return constraints;
    }

    var allConstraints = history.flatMap(({guess, info}) => constraintsFromGuess(guess, info));
    
    return new ConstraintSet(allConstraints);
}