# Qualité

**Cliquet** :
Une borne chiffrée qui enregistre l'état mesuré du dépôt et refuse qu'il se
dégrade, sans prétendre être un objectif de qualité. Le franchir dans le bon
sens oblige à resserrer la borne. Employé pour la couverture de tests et pour
les violations d'accessibilité.
_Éviter_ : seuil, quota, budget.

**Violation** :
Un manquement d'accessibilité relevé par axe sur une page du catalogue, compté
par élément fautif et non par règle.
_Éviter_ : erreur, problème a11y.

**Cliché** :
L'image de référence du repère principal d'une fiche, contre laquelle la CI
compare le rendu courant. N'est pas un cliquet : ce n'est pas une borne
chiffrée, et une différence n'est ni une amélioration ni une dégradation mais un
changement qui demande un jugement humain.
_Éviter_ : capture, snapshot, screenshot de référence.

**Exigence** :
Une borne chiffrée posée au niveau voulu et non au niveau constaté. Contrairement
au cliquet, aucune mesure ne la déplace : quand le code la dépasse, c'est au code
de redescendre. Employée pour la complexité, la profondeur, la taille des
fonctions et des fichiers.
_Éviter_ : seuil, plafond, limite.

**Gel** :
Le fichier `eslint-suppressions.json` d'un workspace, qui retenait les offenses
préexistantes le temps de les absorber. Les quatre gels du dépôt sont vides et le
gel est dit fermé : `scripts/check-suppressions.mjs` fait échouer la CI dès que
l'un d'eux retient une offense. Une violation se corrige donc, elle ne se gèle
plus.
_Éviter_ : suppression, exception, dette gelée.
