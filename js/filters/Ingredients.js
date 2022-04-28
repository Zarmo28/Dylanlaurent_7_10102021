'use strict';

import Buttons from '../page/Buttons.js';
import DomService from '../page/DomService.js';
import Messages from '../page/Messages.js';
import Search from '../search/Search.js';
import Tags from '../page/Tags.js';
import Utils from '../utilities/Utils.js';
import DataLogic from '../utilities/DataLogic.js';

export default class Ingredients {
    static ingredientsExample = document.getElementById('ingredientsExample');

    static init(ingredients, recipes) {
        Utils.clearFilters(this.ingredientsExample);
        Buttons.launchButtons(document.querySelector("#ingredients > button"),
            document.querySelector("#openIngredientsFilter"),
            document.querySelector("#closeIngredientsFilter"),
            document.querySelector("#hiddenIngredientsFilter"));
        this.fillIngredients(Utils.sortByTitle(ingredients));
        this.searchInput(ingredients);
        this.filterTags(recipes);
    }

    // afficher les ingrédients dans la zone ingrédients selon les recettes affichées dans la rubrique 'recettes'
    static fillIngredients(ingredients) {
        let ul = document.createElement('ul');
        ul.classList.add('listUlIng');
        this.ingredientsExample.appendChild(ul);

        ingredients.forEach((ingredient) => {
            let listIngredients = document.createElement('li');
            
            ul.appendChild(listIngredients);
            listIngredients.innerHTML = `${Utils.upperText(ingredient)}`
            listIngredients.classList.add('list-ingredients');
            listIngredients.setAttribute('data-filter', `${ingredient}`);
        });
    }

    // permet de rechercher les ingrédients en entrée parmi les ingrédients présents dans les recettes affichées
    static searchInput(ingredients) {
        document.getElementById('inputIngredients').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            Utils.clearFilters(this.ingredientsExample);
            this.fillIngredients(
                Utils.isValid(valueSearch) ?
                Search.searchInputFilters(ingredients, valueSearch) :
                Utils.sortByTitle(ingredients));
        });
    }

    static filterTags(recipes) {
        let selected = [];
        let ingredientTag = document.getElementById('ingredientTag');

        document.querySelector('#ingredientsExample').addEventListener('click', (event) => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('selected')) {
                event.target.classList.add('selected');
                selected.push(event.target.getAttribute('data-filter'));
                Buttons.hideButtonsOnClick(document.querySelector("#ingredients > button"),
                    document.querySelector("#openIngredientsFilter"),
                    document.querySelector("#hiddenIngredientsFilter"))
                Tags
                    .buildTags(ingredientTag, Utils.upperText(event.target.getAttribute('data-filter')))
                    .removeTagsOnClick(document.querySelector("#ingredientTag > i"), event, ingredientTag, recipes);
                Messages.buildResultMessageWithResult(Search.searchByIngTags(recipes, selected));
                Utils.clearRecipesSection();
                let result = Search.searchByIngTags(recipes, selected);
                DomService.buildResult(result);
                Utils.clearFilters(this.ingredientsExample);
                this.fillIngredients(Utils.sortByTitle(DataLogic.getAllIngredients(result)));
            } else {
                selected.splice(event.target.getAttribute('data-filter'));
                Tags.resetSection(event, ingredientTag, recipes);
            };
        });
        return selected;
    }
}
