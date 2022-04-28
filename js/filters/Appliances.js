'use strict';

import Buttons from '../page/Buttons.js';
import DataLogic from '../utilities/DataLogic.js';
import DomService from '../page/DomService.js';
import Messages from '../page/Messages.js';
import Search from '../search/Search.js';
import Tags from '../page/Tags.js';
import Utils from '../utilities/Utils.js';

export default class Appliances {
    static appliancesExample = document.getElementById('appareilExample');

    static init(appliances, recipes) {
        Utils.clearFilters(this.appliancesExample);
        Buttons.launchButtons(document.querySelector("#appareil > button"),
            document.querySelector("#openAppareilFilter"),
            document.querySelector("#closeAppareilFilter"),
            document.querySelector("#hiddenAppareilFilter"));
        this.fillAppliances(Utils.sortByTitle(appliances));
        this.searchInput(appliances);
        this.filterTags(recipes);
        return this;
    }

    // afficher les appareils dans la zone appareils selon les recettes affichées dans la rubrique 'recettes'
    static fillAppliances(appliances) {
        let ul = document.createElement('ul');
        ul.classList.add('listUlApp');
        this.appliancesExample.appendChild(ul);

        appliances.forEach((appliances) => {
            let listAppliances = document.createElement('li');

            listAppliances.innerHTML = `${Utils.upperText(appliances)}`
            ul.appendChild(listAppliances);
            listAppliances.classList.add('list-appareil');
            listAppliances.setAttribute('data-filter', `${appliances}`);
        });
    }

    // permet de rechercher les appareils en entrée parmi les appareils présents dans les recettes affichées
    static searchInput(appliances) {
        document.getElementById('inputAppareil').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            Utils.clearFilters(this.appliancesExample);
            this.fillAppliances(
                Utils.isValid(valueSearch) ?
                Search.searchInputFilters(appliances, valueSearch) :
                Utils.sortByTitle(appliances));
        });
    }

    static filterTags(recipes) {
        let selected = [];
        let appareilTag = document.getElementById('appareilTag');

        document.querySelector('#appareilExample').addEventListener('click', (event) => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('selected')) {
                event.target.classList.add('selected');
                selected.push(event.target.getAttribute('data-filter'));
                Buttons.hideButtonsOnClick(document.querySelector("#appareil > button"),
                    document.querySelector("#openAppareilFilter"),
                    document.querySelector("#hiddenAppareilFilter"))
                Tags
                    .buildTags(appareilTag, Utils.upperText(event.target.getAttribute('data-filter')))
                    .removeTagsOnClick(document.querySelector("#appareilTag > i"), event, appareilTag, recipes);
                Messages.buildResultMessageWithResult(Search.searchByAppTags(recipes, selected));
                Utils.clearRecipesSection();
                DomService.buildResult(Search.searchByAppTags(recipes, selected));
                Utils.clearFilters(this.appliancesExample);
                this.fillAppliances(Utils.sortByTitle(DataLogic.getAllAppliances(Search.searchByAppTags(recipes, selected))));
            } else {
                selected.splice(event.target.getAttribute('data-filter'));
                Tags.resetSection(event, appareilTag, recipes);
            };
        });
        return selected;
    }
}
