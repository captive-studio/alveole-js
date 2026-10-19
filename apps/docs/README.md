# Catalogue Alvéole sur iOS

L'application est le projet Expo `captivestudio/alveole`, identifiant
`dev.captive.alveole`. La configuration EAS se trouve dans ce répertoire.

## Accès à configurer une seule fois

- Dans les paramètres GitHub du dépôt `Captive-Studio/alveole-js`, sous
  **Secrets and variables → Actions**, ajouter le secret `EXPO_TOKEN`.
  Utiliser un jeton Expo d'un compte autorisé à construire et soumettre sur
  `captivestudio/alveole`. Un secret d'organisation partagé avec ce dépôt convient
  aussi. Les jetons se gèrent sur <https://expo.dev/settings/access-tokens>.
- Le certificat de distribution, le profil de provisioning iOS et la clé API
  App Store Connect sont gérés dans EAS. La configuration initiale a été réalisée
  lors du premier build et de sa soumission. Aucune clé Apple n'est nécessaire
  dans le dépôt ni dans les secrets GitHub.

## Construire et soumettre depuis GitHub

Une fois ces fichiers intégrés à `main`, ouvrir **Actions → Build iOS → Run
workflow** et sélectionner la branche à construire. Choisir une révision validée
par la CI. Pour construire un tag précis, utiliser GitHub CLI :

```sh
gh workflow run build-ios.yml --repo Captive-Studio/alveole-js --ref v2.0.0
```

Le workflow installe les dépendances avec pnpm à la racine du monorepo, puis
lance le workflow EAS depuis `apps/docs`. EAS construit iOS et soumet le build
produit à App Store Connect. GitHub attend le résultat des deux opérations.
Le hook `eas-build-post-install` compile les paquets du monorepo sur EAS.

Après le traitement Apple, le build apparaît dans
[TestFlight](https://appstoreconnect.apple.com/apps/6824551749/testflight/ios).
L'affectation aux groupes de testeurs se fait dans App Store Connect. La
publication publique nécessite ensuite une soumission à la revue App Store.

Le workflow est déclenché manuellement ; la publication d'un tag npm ou un push
sur `main` ne déclenche pas de build iOS.

## Lancer le même workflow localement

Depuis la racine du dépôt, avec les dépendances installées :

```sh
cd apps/docs
pnpm dlx eas-cli login
pnpm dlx eas-cli workflow:run build-production.yml --wait
```

Cette commande envoie l'état local du projet, y compris les modifications non
commitées qui ne sont pas ignorées. Elle construit et soumet automatiquement le
nouveau build ; il n'est pas nécessaire de lancer `eas submit` ensuite.

## Version

`app.config.js` lit la version de `packages/components/package.json`.
Les stores reçoivent sa partie `X.Y.Z` : `2.0.0-alpha.9` devient `2.0.0`.
La version complète reste dans `extra.componentsVersion`. EAS incrémente le
numéro de build à chaque nouvelle construction, via sa gestion distante des
versions. Une modification de version ne change pas les builds déjà envoyés.
