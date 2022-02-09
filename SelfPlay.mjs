import {WORDS} from './wordlist.mjs';
import Responder from './Responder.mjs';
import ConstraintSet from './ConstraintSet.mjs';

export default class SelfPlay {

    constructor(strategy) {
        this.strategy = strategy;
    }

    playGame(answer) {
        var history = [];
        var guess = 'aloes';
        var candidates = WORDS;
        var round = 1;

        while (true) {
            var response = new Responder(candidates).respond(guess, answer);
            history.push({guess, info: response});
            var constraintSet = ConstraintSet.fromGuesses(history);
            
            candidates = candidates.filter(word => constraintSet.matches(word));

            if (candidates.length === 0) {
                throw new Error("Lost game - no answer found. Was: " + answer);
            } else if (candidates.length === 1) {
                if (candidates[0] === answer) {
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
        }
        return average / count;
    }
}
// console.log(new SelfPlay().playGame('mulls'));
// var selfPlay = new SelfPlay(candidates => candidates[0]);
var selfPlay = new SelfPlay(candidates => new Responder(candidates).getGuessWithBestMostFrequestResponse());
console.log(selfPlay.estimateAverageGameLength(10));
