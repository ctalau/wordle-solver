import Word from "../Word.mjs";

export default class LetterMaxCountConstraint {
    /**
     * 
     * @param {string} letter The letter
     * @param {number} count The letter should appear less than the given count.
     */
    constructor(letter, count) {
        this.letter = letter;
        this.count = count;
    }

    /**
     * @param {Word} word 
     * @returns {boolean} True if the word matches the constraint.
     */
    matches(word) {
        var count = 0;
        for (var i = 0; i < word.length; i++) {
            if (word.getLetter(i) === this.letter) {
                count++;
            }
        }
        return count <= this.count;
    }
}