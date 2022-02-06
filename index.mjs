import ConstraintSet from "./ConstraintSet.mjs";
import { WORDS } from "./wordlist.mjs";
import Responder from "./Responder.mjs";


function createConstraintSet() {
    var constraints = [];
    for (var i = 1; i <= 6; i++) {
        var guess = document.getElementById("guess-" + i).value;
        var info = document.getElementById("info-" + i).value;
        if (guess.length > 0) {
            console.log(guess, info);
            constraints.push({guess, info});
        } else {
            break;
        }
    }
    
    return ConstraintSet.fromGuesses(constraints);
}

function extractFirstNElements(array, n) {
    return array.slice(0, n);
}

document.getElementById('submit').onclick = () => {
    var constraintSet = createConstraintSet();
    var candidates = WORDS.filter(word => constraintSet.matches(word));
    var suggestion = new Responder(candidates).getGuessWithBestMostFrequestResponse();
    alert(suggestion + '\n\n' + candidates.length + '\n' + candidates.slice(0, 5).map(word => ' - ' + word).join('\n'));
}

