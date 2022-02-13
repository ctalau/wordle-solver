const lettersCount = 5;
const bitsPerLetter = 5; // bits per letter
const letterMask = 0x1f;
var aCharCode = 'a'.charCodeAt(0);


function letterCode(l) {
    return l.charCodeAt(0) - aCharCode;
}

export default class Word {

    constructor() {
    }

    setLetters(word) {
        this.bits = 0;
        var shift = 0;
        for (var i = 0; i < lettersCount; i++) {
            this.bits |= letterCode(word[i]) << shift;
            shift += bitsPerLetter;
        }
        return this;
    }

    getLetterOrdinal(i) {
        return this.bits >> (i * bitsPerLetter) & letterMask;
    }
    
    getLetter(i) {
        var letterOrdinal = this.getLetterOrdinal(i);
        return String.fromCharCode(letterOrdinal + aCharCode);
    }

    clearLetter(i) {
        var ithLetterMask = letterMask << (i * bitsPerLetter);
        this.bits |= ithLetterMask;
    }

    indexOf(needle) {
        var needleCode = letterCode(needle);
        return this.indexOfOrdinal(needleCode);
    }
    
    indexOfOrdinal(needleCode) {
        var temp = this.bits;
        for (var i = 0; i < lettersCount; i++) {
            if ((temp & letterMask) === needleCode) {
                return i;
            }
            temp >>= bitsPerLetter;
        }
        return -1;
    }

    equals(otherWord) {
        return this.index === otherWord.index;
    }

    toString() {
        return this.getLetter(0) + this.getLetter(1) + this.getLetter(2) + this.getLetter(3) + this.getLetter(4);
    }

    get length() {
        return 5;
    }

    clone() {
        var word = new Word();
        word.bits = this.bits;
        return word;
    }
}