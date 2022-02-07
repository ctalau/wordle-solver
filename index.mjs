import ConstraintSet from "./ConstraintSet.mjs";
import { WORDS } from "./wordlist.mjs";
import Responder from "./Responder.mjs";
import UI from "./UI.mjs";

var ui = new UI();

document.getElementById('submit').onclick = () => {    
    var constraintSet =  ConstraintSet.fromGuesses(ui.getConstraints());    
    
    var candidates = WORDS.filter(word => constraintSet.matches(word));
    if (candidates.length === 0) {
        alert('No matching words.');
    } else {
        var suggestion = new Responder(candidates).getGuessWithBestMostFrequestResponse();
        ui.setNextGuess(suggestion);
    }
}

