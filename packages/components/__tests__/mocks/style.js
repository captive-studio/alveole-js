// Les feuilles de style importees pour leur effet de bord (`import './X.css'`) n'ont aucun
// sens hors d'un bundler : Jest tenterait d'evaluer le CSS comme du JavaScript. Le module
// vide suffit, les tests lisant les styles calcules et non ces regles globales.
module.exports = {};
