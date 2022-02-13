import {WORDS} from './wordlist.mjs';
import Responder from './Responder.mjs';
import ConstraintSet from './ConstraintSet.mjs';

// This choice is computed by runing the algoritm. But since it is expensive to compute, 
// it is just hardcoded here.
var firstGuess = wordFromString('aloes');

export default class SelfPlay {

    constructor(strategy) {
        this.strategy = strategy;
    }

    getFirstGuess() {
        if (!firstGuess) {
            firstGuess = this.strategy(WORDS);
        }
        return firstGuess;
    }

    playGame(answer) {
        var history = [];

        var candidates = WORDS;
        var guess = this.getFirstGuess();
        var round = 1;

        while (true) {
            var response = new Responder().getResponse_(guess, answer);
            history.push({guess, info: response});
            var constraintSet = ConstraintSet.fromGuesses(history);
            
            candidates = candidates.filter(word => constraintSet.matches(word));

            if (candidates.length === 0) {
                throw new Error("Lost game - no answer found. Was: " + answer);
            } else if (candidates.length === 1) {
                if (candidates[0].equals(answer)) {
                    return round;
                } else {
                    throw new Error("Lost game - wrong answer. Got: " + candidates[0] + ", was: " + answer);
                }
            }
            guess = this.strategy(candidates);
            round++;
        }
    }

    playRandomGame() {
        return this.playGame(WORDS[Math.floor(Math.random() * WORDS.length)]);
    }

    estimateAverageGameLength(count) {
        var average = 0;
        for (var i = 0; i < count; i++) {
            var duration = this.playRandomGame();
            average += duration;
            console.log(i, average / (i + 1));
        }
        return average / count;
    }

    playAllGames() {
        var sum = 0;
        var max = 0;
        var fails = 0;
        var histo = {};

        for (var i = 0; i < WORDS.length; i++) {
            var duration = this.playGame(WORDS[i]);
            sum += duration;
            if (duration > 6) {
                fails ++;
            }
            max = Math.max(max, duration)
            histo[duration] = (histo[duration] || 0) + 1;

            if (i % 100 === 0) {
                console.log(`Word: ${i},\t Avg: ${sum / (i + 1)},\t fails: ${fails},\t max: ${max}`);
            }
        }
        return histo;
    }
    
}

