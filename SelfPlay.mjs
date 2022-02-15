import {WORDS, wordFromString, ANSWERS} from './wordlist.mjs';
import Responder from './Responder.mjs';
import ConstraintSet from './ConstraintSet.mjs';
import PlayHistogram from './PlayHistogram.mjs';

// This choice is computed by runing the algoritm. But since it is expensive to compute, 
// it is just hardcoded here.
var firstGuess = wordFromString('lares');

export default class SelfPlay {

    constructor(strategy) {
        this.strategy = strategy;
    }

    getFirstGuess() {
        if (!firstGuess) {
            firstGuess = this.strategy(WORDS);
            console.log("First guess: " + firstGuess);
        }
        return firstGuess;
    }

    playGame(answer) {
        var history = [];

        var candidates = ANSWERS;
        var guess = this.getFirstGuess();
        var round = 1;

        while (true) {
            var response = new Responder().getResponse_(guess, answer);
            if (response.toString() === 'ggggg') {
                return round;
            } else if (candidates.length === 1) {
                var msg = "Wrong answer found: " +  candidates[0] + ". Was: " + answer + ". Response: " + response.toString();
                console.log(msg);
                throw new Error(msg);
            }
            
            history.push({guess, info: response});
            var constraintSet = ConstraintSet.fromGuesses(history);
            
            candidates = candidates.filter(word => constraintSet.matches(word));

            if (candidates.length === 0) {
                throw new Error("Lost game - no answer found. Was: " + answer);
            }
            guess = this.strategy(candidates);
            round++;
        }
    }

    playRandomGame() {
        return this.playGame(ANSWERS[Math.floor(Math.random() * ANSWERS.length)]);
    }

    estimateAverageGameLength(count) {
        var playHistogram = new PlayHistogram();
        for (var i = 0; i < count; i++) {
            var duration = this.playRandomGame();
            playHistogram.add(duration);
            console.log(`Word: ${i},\t ` + playHistogram.toString());
        }
        return average / count;
    }

    /**
     * @returns {PlayHistogram}
     */
    playAllGames() {
        var playHistogram = new PlayHistogram();
        for (var i = 0; i < ANSWERS.length; i++) {
            var duration = this.playGame(ANSWERS[i]);
            playHistogram.add(duration);
            if (i % 100 === 0) {
                console.log(`Word: ${i},\t ` + playHistogram.toString());
            }
        }
        return playHistogram;
    }
    
}

