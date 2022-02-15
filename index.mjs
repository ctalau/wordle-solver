import ConstraintSet from "./ConstraintSet.mjs";
import { wordFromString, ANSWERS } from "./wordlist.mjs";
import UI from "./UI.mjs";
import HistogramSuggester from "./HistogramSuggester.mjs";
import Response from "./Response.mjs";
import ExpectedValueScorer from "./scorers/ExpectedValueScorer.mjs";

var ui = new UI();

ui.onResponseAvailable(() => {
    var constraints = ui.getConstraints().map(({guess, info}) => {
        return {guess: wordFromString(guess), info: Response.fromString(info)};
    });
    var constraintSet =  ConstraintSet.fromGuesses(constraints);    
    
    var candidates = ANSWERS.filter(word => constraintSet.matches(word));
    if (candidates.length === 0) {
        alert('No matching words.');
    } else if (candidates.length === 1) {
        alert('Found answer: ' + candidates[0]);
    } else {
        var scorer = new ExpectedValueScorer();
        const suggester = new HistogramSuggester(candidates, scorer);
        suggester.setHardMode(ui.isHardMode());
        var suggestion = suggester.getGuessWithBestScore();
        ui.setNextGuess(suggestion);
    }
});

