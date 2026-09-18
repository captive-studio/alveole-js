# Ajouter le bouton de fermeture (croix) au Tag

**Publication Jira :** à créer
**Projet :** `ALV`
**Label à appliquer :** `ready-for-agent`

## Parent

spec.md (épic "Faire évoluer le composant Tag : fermeture, icône et état sélectionné")

## What to build

Ajouter au `Tag` la possibilité d'afficher une croix de suppression cliquable, sur le
modèle du bouton de fermeture de `Toast.tsx` (`Pressable` +
`accessibilityRole="button"` + `LucideIcon`), avec l'esthétique validée dans le
sous-composant Figma `Tag/Close` (croix Alvéole, pas celle de Primer Token).

- Nouvelles props sur `Tag` : `closable?: boolean` (défaut `false`, pour préserver
  les usages existants) et `onClose?: () => void`.
- Quand `closable` est `true`, une croix (`LucideIcon name="X"`) s'affiche après le
  libellé, dans un conteneur circulaire (18px en `sm`, 20px en `md`, d'après la
  maquette `Tag/Close`).
- Au survol de la croix, un fond `background/transparent-hover`
  (`rgba(0,0,0,0.04)`) apparaît ; la maquette Figma documente une transition Smart
  Animate 150ms ease-out — à reproduire sur web (transition CSS) ; sur natif, le
  retour visuel s'applique au toucher selon les conventions déjà en place dans le
  design system pour les composants `Pressable`.
- Le clic ou l'activation clavier de la croix déclenche `onClose`, sans déclencher
  d'autre interaction portée par le tag.
- La couleur de la croix suit l'état `selected` du tag (cf. ticket "Ajouter l'état
  sélectionné"), comme documenté dans le sous-composant Figma `Tag/Close`.
- Un `accessibilityLabel` explicite est posé sur le bouton (ex. "Supprimer le tag"),
  sur le modèle de `accessibilityLabel="Fermer la notification"` dans `Toast.tsx`.

## Acceptance criteria

- [ ] Le composant `Tag` accepte les props `closable?: boolean` (défaut `false`) et
      `onClose?: () => void`.
- [ ] Quand `closable` est `false` ou absent, aucune croix n'est rendue et le rendu
      est identique à la version actuelle du composant.
- [ ] Quand `closable` est `true`, une croix est rendue après le libellé, avec la
      taille correspondant à celle du tag (`sm`/`md`).
- [ ] Cliquer sur la croix (souris) appelle `onClose`.
- [ ] Activer la croix au clavier (focus + Entrée/Espace) appelle `onClose`.
- [ ] Le survol de la croix affiche un fond `background/transparent-hover`, sans
      modifier le fond du reste du tag.
- [ ] La croix possède un `accessibilityRole="button"` et un `accessibilityLabel`
      explicite, distinct du libellé du tag.
- [ ] La couleur de la croix reflète l'état `selected` du tag.
- [ ] Un test unitaire vérifie : absence de croix par défaut, présence quand
      `closable` est vrai, appel de `onClose` au clic et au clavier.
- [ ] Une nouvelle story Storybook illustre un tag fermable, en état par défaut et
      sélectionné.

## Blocked by

Ajouter l'état sélectionné (actif) au Tag — la couleur de la croix dépend de
`selected`.
