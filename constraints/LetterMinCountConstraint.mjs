import Word from "../Word.mjs";

export default class LetterMinCountConstraint {
    /**
     * 
     * @param {string} letter The letter
     * @param {number} count The number of times the letter must occur. 
     */
    constructor(letter, count) {
        this.letter = letter;
        this.count = count;
    }

    /**
     * @param {Word} word 
     * @returns 
     */
    matches(word) {
        var count = 0;
        for (var i = 0; i < word.length; i++) {
            if (word.getLetter(i) === this.letter) {
                count++;
            }
        }
        return count >= this.count;
    }
}