export default class Constraint {
    constructor(letter, occurs, pos) {
        this.letter = letter;
        this.occurs = occurs;
        this.pos = pos;
    }

    matches(word) {
        if (this.pos !== null) {
         if (this.occurs) {
             // Green match
             return this.letter === word[this.pos];
         } else {
             // Yellow match: contains letter, but not on that position.
             var wordContainsLetter = word.indexOf(this.letter) !== -1;
             return wordContainsLetter && this.letter !== word[this.pos];
         }
        } else {
            // Gray match: word does not contain letter
            return word.indexOf(this.letter) === -1;
        }
    }
}