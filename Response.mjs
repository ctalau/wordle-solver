const NONE = 0;
const YELLOW = 1;
const GREEN = 2;

export default class Response {
    constructor() {
        this.response = 0;
    }

    setGreen(i) {
        var shift = i * 4;
        this.response |= GREEN << shift;
    }

    setYellow(i) {
        var shift = i * 4;
        this.response |= YELLOW << shift;
    }

    isNone(i) {
        var shift = i * 4;
        var slot = (this.response >> shift) & 0xf;
        return slot === NONE;
    }
    
    toString() {
        var mapping = ['_', 'y', 'g'];
        var string = '';
        for (var i = 0; i < 5; i++) {
            var shift = i * 4;
            var slot = (this.response) >> shift & 0xf;
            string += mapping[slot];
        }
            
        return string;
    }

    toKey() {
        return this.response;
    }
}
