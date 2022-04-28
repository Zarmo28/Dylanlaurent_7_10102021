'use strict';

import DomService from './DomService.js';
import Messages from './Messages.js';
import Utils from '../utilities/Utils.js';
import Ingredients from '../filters/Ingredients.js';
import Appliances from '../filters/Appliances.js';
import Ustensils from '../filters/Ustensils.js';
import DataLogic from '../utilities/DataLogic.js';

export default class Badges {
    static hiddenIngredientsFilter = document.querySelector('#hiddenIngredientsFilter');
    static hiddenAppareilFilter = document.querySelector('#hiddenAppareilFilter');
    static hiddenUstensilesFilter = document.querySelector('#hiddenUstensilesFilter');

    // affiche un badge contenant le tag de l'ingrédient/appareil/ustensile que l'utilisateur a sélectionné
    static buildTags(elt, tag) {
        this.pushDownButtonsFilter();
        this.displayTag(elt);
        this.fillTag(elt, tag);
        return this;
    }

    static displayTag(elt) {
        return elt.style.display = 'flex';
    }

    // remplir la balise sélectionnée
    static fillTag(elt, tag) {
        return elt.innerHTML = tag + ` <i class='far fa-times-circle'></i>`;
    }

    // retirez l'étiquette et replacez les boutons ingrédient/appareil/ustensile
    static hideTag(elt) {
        this.pushUpButtonsFilter();

        return elt.style.display = 'none';
    }

    // appuyer sur les boutons ingrédient/appareil/ustensile
    static pushDownButtonsFilter() {
        this.hiddenIngredientsFilter.style.top = '20rem';
        this.hiddenAppareilFilter.style.top = '20rem';
        this.hiddenUstensilesFilter.style.top = '20rem';
    }

    // poussez vers le haut les boutons ingrédients/appareils/ustensiles
    static pushUpButtonsFilter() {
        this.hiddenIngredientsFilter.style.top = '16.2rem';
        this.hiddenAppareilFilter.style.top = '16.2rem';
        this.hiddenUstensilesFilter.style.top = '16.2rem';
    }

    static removeTagsOnClick(tag, event, eltBadge, recipes) {
        tag.addEventListener('click', () => {
            this.resetSection(event, eltBadge, recipes);
        })
    }

    static resetSection(event, eltBadge, recipes) {
        event.target.classList.remove('selected');
        this.hideTag(eltBadge);
        Messages.buildResultMessageWithResult(recipes);
        Utils.clearRecipesSection();
        DomService.buildResult(recipes);
        Utils.clearFilters(document.getElementById('ingredientsExample'));
        Ingredients.fillIngredients(DataLogic.getAllIngredients(recipes));
        Utils.clearFilters(document.getElementById('appareilExample'));
        Appliances.fillAppliances(DataLogic.getAllAppliances(recipes));
        Utils.clearFilters(document.getElementById('ustensilesExample'));
        Ustensils.fillUstensils(DataLogic.getAllUstensils(recipes));
    }
}
