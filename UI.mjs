export default class UI {
    getGuess(index) {
        return document.getElementById("guess-" + index).value;
    }
    setNextGuess(value) {
        for (var i = 1; i <= 6; i++) {
            if (this.getGuess(i) === '') {
                document.getElementById("guess-" + i).value = value;
                break;
            }
        }
    }
    getInfo(index) {
        return document.getElementById("info-" + index).value;
    }

    /**
     * @returns {Array<{guess: string, info: string}>} The history of the game.
     */
    getConstraints() {
        var constraints = [];
        for (var i = 1; i <= 6; i++) {
            var guess = this.getGuess(i);
            if (guess.length > 0) {
                var info = this.getInfo(i);
                if (/[_gy]{5}/.test(info)) {
                    constraints.push({guess, info});
                } else {
                    alert('Invalid info: ' + info);
                    break;
                }
            } else {
                break;
            }
        }
        return constraints;
    }
    
    onResponseAvailable(callback) {
        document.getElementById('submit').onclick = callback;
    }
}
