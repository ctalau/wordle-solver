import ConstraintSet from "./ConstraintSet.mjs";
import { WORDS } from "./wordlist.mjs";
import UI from "./UI.mjs";
import HistogramSuggester from "./HistogramSuggester.mjs";

var ui = new UI();

document.getElementById('submit').onclick = () => {    
    var constraintSet =  ConstraintSet.fromGuesses(ui.getConstraints());    
    
    var candidates = WORDS.filter(word => constraintSet.matches(word));
    if (candidates.length === 0) {
        alert('No matching words.');
    } else {
        var suggestion = new HistogramSuggester(candidates).getGuessWithBestMostFrequestResponse();
        ui.setNextGuess(suggestion);
    }
}

