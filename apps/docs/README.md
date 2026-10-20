# Catalogue Alvéole sur iOS et Android

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

## Construire et soumettre depuis le terminal

Une fois ces fichiers intégrés à `main`, installer GitHub CLI (`gh`) et se
connecter une seule fois avec `gh auth login`. Depuis la racine du dépôt :

```sh
pnpm run publish:ios
```

La commande déclenche le workflow GitHub **Build iOS** sur `main` et affiche
le lien de suivi. Pour choisir une branche ou un tag distant :

```sh
pnpm run publish:ios ios/deploiement
pnpm run publish:ios v2.0.0
```

Choisir une révision validée par la CI. La commande utilise le contenu déjà
poussé sur GitHub ; elle ne committe ni ne pousse les modifications locales.
Le workflow doit être présent sur la branche par défaut pour être déclenchable.

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

## Configuration initiale Android

Depuis `apps/docs`, construire le premier Android App Bundle (`.aab`) :

```sh
pnpm dlx eas-cli build --platform android --profile production
```

Lors de la configuration initiale, laisser EAS générer un nouveau keystore pour
`dev.captive.alveole` si cette application n'a pas encore de clé. EAS conservera
la clé pour les builds suivants. Si un binaire a déjà été publié pour cette
application, utiliser sa clé d'importation existante.

Associer ensuite le compte de service de soumission :

```sh
pnpm dlx eas-cli credentials --platform android
```

Choisir `production`, puis **Google Service Account → Manage your Google
Service Account Key for Play Store Submissions**. Sélectionner la clé du compte
dédié `deploiement-alveole@groove-e9e23.iam.gserviceaccount.com`, enregistrée dans
EAS. Ce compte appartient au projet Google Cloud existant `groove-e9e23` et
dispose uniquement des droits de lecture et de publication sur les pistes de
test d'Alvéole dans Google Play Console. La clé privée JSON reste hors du dépôt.
Le compte de service de soumission est distinct du keystore de signature.

Une fois le build terminé et la clé associée :

```sh
pnpm dlx eas-cli submit --platform android --profile production --latest
```

Le profil soumet sur la piste **Test interne**, avec le statut **Brouillon**.
Ouvrir Google Play Console pour compléter les informations demandées, finaliser
la release et configurer les testeurs. Le fichier `.aab` est destiné à Google
Play et ne s'installe pas directement sur un téléphone.

## Releases Android suivantes

Après intégration du workflow sur `main`, depuis la racine du dépôt :

```sh
pnpm run publish:android
# Ou une branche / un tag distant validé par la CI :
pnpm run publish:android v2.0.0
```

Le workflow **Build Android** construit puis soumet exactement le build produit,
en brouillon sur la piste de test interne. Il réutilise le secret `EXPO_TOKEN`
déjà configuré sur GitHub et les accès Android enregistrés dans EAS. Finaliser
chaque release dans Google Play Console pour la rendre disponible aux testeurs.
La signature et le compte de service doivent être configurés avant ce lancement
automatique, qui ne peut pas répondre aux questions de configuration initiale.

Pour envoyer l'état local plutôt que le contenu poussé sur GitHub, depuis
`apps/docs` :

```sh
pnpm dlx eas-cli workflow:run build-android.yml --wait
```

## Version

`app.config.js` lit la version de `packages/components/package.json`.
Les stores reçoivent sa partie `X.Y.Z` : `2.0.0-alpha.9` devient `2.0.0`.
La version complète reste dans `extra.componentsVersion`. EAS incrémente le
numéro de build à chaque nouvelle construction, via sa gestion distante des
versions. Une modification de version ne change pas les builds déjà envoyés.
