'use strict';

export default class Messages {
    static resultMessage = document.getElementById('resultMessage');
    static resultSpan = document.querySelector('#resultMessage > span');

    // affiche le message avec le nombre de recettes correspondant à la recherche
    static buildResultMessageWithResult(recipes) {
        this.displayMessage();
        this.resultMessage.style.backgroundColor = '#c4dcff'
        this.resultSpan.innerHTML = recipes.length + ' recette(s) correspond(ent) à votre recherche';
        this.hideMessageOnClick();
        return this;
    }

    // affiche le message indiquant à l'utilisateur qu'aucune recette ne correspond à la recherche
    static buildResultMessageWithNoResult() {
        this.displayMessage();
        this.resultMessage.style.backgroundColor = '#FFE9A5';
        this.resultSpan.innerHTML = 'Aucune recette ne correspond à votre recherche... Vous pouvez chercher "tarte aux pommes", "poisson", etc.';
        return this;
    }

    // affiche le message contenant le nombre de recettes
    static displayMessage() {
        return this.resultMessage.style.display = 'flex';
    }

    // disparaître le message contenant le nombre de recettes
    static hideMessage() {
        return this.resultMessage.style.display = 'none';
    }

    static hideMessageOnClick() {
        document.querySelector("#resultMessage > i").addEventListener('click', () => {
            return this.hideMessage();
        })
    }
}
