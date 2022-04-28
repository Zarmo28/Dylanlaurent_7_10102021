'use strict';

export default class Utils {
    // la recherche commence à partir de 3 caractères
    static isValid(value) {
        return value.length > 2;
    }

    // transformer le texte en minuscule
    static normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    // transformer le texte en majuscule
    static upperText(text) {
        return text
            .charAt(0)
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") +
            text
            .substring(1)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    static clearRecipesSection() {
        return document.getElementById('mainContent').innerHTML = '';
    }

    static clearFilters(elt) {
        return elt.innerHTML = '';
    }

    // Rassemblez tous les ingrédients/appareils/ustensiles et triez-les par ordre alphabétique
    static sortByTitle(array) {
        let arrayNoSort = [...new Set(array)];
        let arraySort = arrayNoSort.sort((a, b) => {
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            } else if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
        })

        return arraySort;
    }
}
