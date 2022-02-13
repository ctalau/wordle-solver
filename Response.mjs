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

    getSlot(i) {
        var shift = i * 4;
        return (this.response >> shift) & 0xf;
    }

    isNone(i) {
        return this.getSlot(i) === NONE;
    }

    isGreen(i) {
        return this.getSlot(i) === GREEN;
    }

    isYellow(i) {
        return this.getSlot(i) === YELLOW;
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

Response.fromString = function(string) {
    var response = new Response();
    for (var i = 0; i < string.length; i++) {
        var slot = string[i];
        if (slot === 'y') {
            response.setYellow(i);
        } else if (slot === 'g') {
            response.setGreen(i);
        }
    }
    return response;

};