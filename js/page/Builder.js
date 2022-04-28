'use strict';

import Appliances from '../filters/Appliances.js';
import DataLogic from '../utilities/DataLogic.js';
import DomService from './DomService.js';
import Ingredients from '../filters/Ingredients.js';
import Messages from './Messages.js';
import Ustensils from '../filters/Ustensils.js';

export default class Builder {
    static init() {
        // Construire une section avec toutes les recettes avant la recherche
        DomService.buildResult(recipesApiResult);
        Messages.hideMessage();
        // Logique des ingrédients
        Ingredients.init(DataLogic.getAllIngredients(recipesApiResult), recipesApiResult);
        // Logique des appareils
        Appliances.init(DataLogic.getAllAppliances(recipesApiResult), recipesApiResult);
        // Logique des ustensiles
        Ustensils.init(DataLogic.getAllUstensils(recipesApiResult), recipesApiResult);
    }

    static initSearch(result) {
        // Créer une section après la recherche
        DomService.buildResult(result.recipesMatched);
        Messages.buildResultMessageWithResult(result.recipesMatched);
        // Logique des ingrédients
        Ingredients.init(result.ingredients, result.recipesMatched);
        // Logique des appareils
        Appliances.init(result.appliances, result.recipesMatched);
        // Logique des ustensiles
        Ustensils.init(result.ustensils, result.recipesMatched);
    }
}
