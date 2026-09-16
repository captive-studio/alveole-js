# Distribution compacte des icônes

Alvéole conserve tout le catalogue Lucide et Lab, leurs alias, leurs déclarations
TypeScript et leur moteur React Native d'origine. Esbuild regroupe chaque paquet
en un seul module ESM ; React et react-native-svg restent externes.

Les fichiers générés sont versionnés dans
`packages/components/src/ui/LucideIcon/vendor`. Le build les copie dans `dist`,
licences comprises. Aucune installation du générateur n'est nécessaire pour
installer, tester, construire ou utiliser Alvéole.

## Mise à jour

Les versions sont épinglées dans ce dossier, hors des workspaces du monorepo.
Après modification d'une version :

```sh
npm install --prefix tools/compact-icons
npm run generate --prefix tools/compact-icons
npm run verify --prefix tools/compact-icons
npm run check
npm run build:packages
npm run check:packages
npm run build --workspace=apps/docs
```

Committer ensemble le manifeste, le lockfile et les six fichiers générés.
Ne jamais modifier ces fichiers à la main. Conserver les licences ISC et MIT
fournies par les deux paquets. Une mise à jour de dépendance du générateur seule
ne met pas à jour les icônes livrées : la génération est obligatoire.

## Applications clientes

Les noms et l'API `LucideIcon` restent identiques. Une application qui n'importe
pas directement Lucide ou Lab peut retirer `lucide-react-native` et `@lucide/lab`
de ses dépendances après adoption de cette version d'Alvéole. Le changement ne
supprime pas automatiquement les dépendances explicitement déclarées par les
applications.

Ce regroupement vise le nombre de fichiers installés et le poids des dépendances.
Il ne prétend pas réduire le catalogue présent dans le bundle de l'application :
la sélection dynamique par nom conserve son comportement actuel.

La vérification compare tous les exports et les données de dessin avec les paquets
amont, y compris les alias. Le test `scripts/compact-icons.test.mjs` vérifie en CI
que les artefacts correspondent aux entrées du générateur.

Après la vérification, supprimer le `node_modules` de ce dossier de maintenance
pour ne pas conserver une seconde installation du catalogue dans le worktree.
