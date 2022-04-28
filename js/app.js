'use strict';
import Builder from './page/Builder.js';
import Messages from './page/Messages.js';
import Search from './search/Search.js';
import Utils from './utilities/Utils.js';

// Construire par défaut sans recherche
Builder.init();

// Construire avec l'entrée de recherche
document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
    let valueSearch = key.target.value;
    if (Utils.isValid(valueSearch)) {
        let result = Search.searchMainInput(valueSearch);
        if (result.recipesMatched.length === 0) {
            return Messages.buildResultMessageWithNoResult();
        }
        Utils.clearRecipesSection();
        Builder.initSearch(result);
        return;
    }
    // Reset Build
    Utils.clearRecipesSection();
    Builder.init();
});
