export default class LetterPositionConstraint {
    constructor(letter, occurs, pos) {
        this.letter = letter;
        this.occurs = occurs;
        this.pos = pos;
    }

    matches(word) {
        if (this.occurs) {
            return this.letter === word[this.pos];
        } else {
            return this.letter !== word[this.pos];
        }
    }
}