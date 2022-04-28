'use strict';

export default class DataLogic {
    // obtenir tous les ingrédients pour les faire apparaître par défaut, avant de chercher
    static getAllIngredients(ing) {
        let ingredients = [];
        ing.forEach((recipe) => {
            recipe.ingredients.forEach((ing) => {
                if (!ingredients.includes(ing.ingredient.toLowerCase()))
                    ingredients.push(ing.ingredient.toLowerCase());
            });
        });
        return ingredients;
    }

    // obtenir tous les appareils pour les faire apparaître par défaut, avant de chercher
    static getAllAppliances(app) {
        let appliances = [];
        app.forEach((recipe) => {
            if (!appliances.includes(recipe.appliance.toLowerCase()))
                appliances.push(recipe.appliance.toLowerCase());
        });
        return appliances;
    }

    // récupérez tous les ustensiles pour les faire apparaître par défaut, avant de chercher
    static getAllUstensils(ust) {
        let ustensils = [];
        ust.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                if (!ustensils.includes(ustensil.toLowerCase()))
                    ustensils.push(ustensil.toLowerCase());
            });
        });
        return ustensils;
    }
}
