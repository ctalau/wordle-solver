export default class LetterPositionConstraint {
    constructor(letter, occurs, pos) {
        this.letter = letter;
        this.occurs = occurs;
        this.pos = pos;
    }

    /**
     * @param {Word} word 
     * @returns {boolean} True if the word matches the constraint.
     */
    matches(word) {
        if (this.occurs) {
            return this.letter === word.getLetter(this.pos);
        } else {
            return this.letter !== word.getLetter(this.pos);
        }
    }
}