import ConstraintSet from "./ConstraintSet.mjs";
import { WORDS, wordFromString } from "./wordlist.mjs";
import UI from "./UI.mjs";
import HistogramSuggester from "./HistogramSuggester.mjs";
import Response from "./Response.mjs";
import MaxScorer from "./scorers/MaxScorer.mjs";

var ui = new UI();

ui.onResponseAvailable(() => {
    var constraints = ui.getConstraints().map(({guess, info}) => {
        return {guess: wordFromString(guess), info: Response.fromString(info)};
    });
    var constraintSet =  ConstraintSet.fromGuesses(constraints);    
    
    var candidates = WORDS.filter(word => constraintSet.matches(word));
    if (candidates.length === 0) {
        alert('No matching words.');
    } else if (candidates.length === 1) {
        alert('Found answer: ' + candidates[0]);
    } else {
        var scorer = new MaxScorer();
        var suggestion = new HistogramSuggester(candidates, scorer).getGuessWithBestScore();
        ui.setNextGuess(suggestion);
    }
});

