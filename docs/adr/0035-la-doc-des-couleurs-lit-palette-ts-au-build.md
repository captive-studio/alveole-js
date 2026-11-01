---
status: accepted
area: catalogue
---

# La doc des couleurs lit `Palette.ts` au build

Les pages « Nuances » et « Tokens sémantiques » du catalogue montrent, pour chaque nuance,
les tokens qui la référencent, et pour chaque token, sa nuance et sa phrase d'usage. Ces
informations sont extraites du fichier source `packages/theme/src/constants/Palette.ts` au
build, et non de l'objet `CustomPalette` à l'exécution.

À l'exécution, un token n'est plus qu'une valeur hex : le lien vers sa nuance est perdu, et
il ne peut pas être retrouvé par la valeur, car plusieurs échelles partagent les mêmes hex
(`#FFFFFF` et quatre autres). La phrase d'usage et le statut déprécié vivent en JSDoc, que
l'objet ne transporte pas non plus. Le source est donc la seule place où ces trois
informations existent ensemble, et la doc ne peut pas diverger du code puisqu'elle n'a
pas de copie à tenir.

## Options écartées

- **Retrouver la nuance par la valeur hex** : ambigu dès qu'un hex est partagé.
- **Restructurer les tokens en objets `{ nuance, usage }`** : change l'API publique de
  `@alveole/theme` pour un besoin de documentation.
- **Écrire usages et correspondances dans `apps/docs`** : une seconde source qui diverge.

## Conséquences

Une écriture de `Palette.ts` que l'extraction ne reconnaît pas (valeur calculée, alias
indirect) doit faire échouer le build de la doc plutôt que d'afficher une ligne vide.

## Amendement : les composants consommateurs

La page « Tokens sémantiques » montre aussi, pour chaque token, ses composants
consommateurs. Ils sont extraits au build du source de `packages/components`, et non
déclarés à la main, pour la même raison que la nuance d'un token : une liste tenue à
part diverge. Un composant est son dossier (`ui/Select/` compte pour Select), et seuls
les composants exportés par le paquet sont retenus ; stories, tests et `*.demo.*` sont
ignorés. Seule la citation directe compte, sinon les composants de base feraient de
chaque token un token « utilisé partout ».

Un accès à un token par une clé calculée doit faire échouer le build de la doc : un
« sans usage » faux inciterait à supprimer un token qui sert.
