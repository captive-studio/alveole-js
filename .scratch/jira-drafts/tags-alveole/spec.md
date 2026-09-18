# Faire évoluer le composant Tag : fermeture, icône et état sélectionné

**Publication Jira :** à créer
**Projet :** `ALV`
**Label à appliquer :** `ready-for-agent`

## Problem Statement

Le composant `Tag` d'Alveole (`packages/components/src/ui/Tag/`) ne permet aujourd'hui
que d'afficher un libellé statique, avec deux couleurs (`default`, `action`) et deux
tailles (`sm`, `md`). Il est impossible d'y ajouter une icône ou une croix de
suppression, alors que ce besoin revient régulièrement pour représenter des filtres
actifs, des sélections multiples ou des étiquettes supprimables — à l'image du
composant [Token de Primer](https://primer.style/product/components/token/) qui sert
de référence d'inspiration pour cette évolution.

Le design de la nouvelle version est disponible dans Figma :
[Alvéole - Composants, node Tag/SM, Tag/MD, Tag/Close](https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1002-8509).
Cette maquette n'est pas encore entièrement finalisée côté variantes et composants
(cf. Out of Scope) : le set `Tag/SM` est complet, `Tag/MD` et les combinaisons
icône+survol/sélection restent partiels.

## Solution

Le composant `Tag` gagne trois capacités additives, sans rien retirer de l'existant :

1. Un état **sélectionné/actif** (`selected`), qui change la couleur de bordure et de
   texte du tag, pour représenter un tag actif dans un groupe de filtres.
2. Un **bouton de fermeture** (`closable` + `onClose`), affichant une croix Alvéole
   (et non plus l'esthétique par défaut du token Primer) avec un état de survol dédié,
   pour permettre de retirer un tag.
3. Une **icône avant le libellé** (`icon`), pour illustrer le tag (catégorie, type de
   contenu, etc.), en reprenant le composant `LucideIcon` déjà utilisé dans le design
   system.

La typographie du tag reste celle d'Alvéole (`Corps de texte XS/SM Bold`, déjà en
place) ; seule l'esthétique de la croix de fermeture s'inspire du travail visuel fait
sur Primer Token, adaptée aux tokens de couleur Alvéole (`background/contrast-grey`,
`border/default-grey`, `border/contrast-grey`, `text/mention-grey`,
`text/default-grey`, `background/transparent-hover`).

## User Stories

1. En tant qu'utilisateur d'une application cliente, je veux retirer un tag en
   cliquant sur une croix, afin de désélectionner un filtre ou supprimer une
   étiquette sans quitter le contexte.
2. En tant qu'utilisateur au clavier, je veux atteindre le bouton de fermeture et
   l'activer sans souris, afin de retirer un tag de façon accessible.
3. En tant qu'utilisateur à la souris, je veux voir un retour visuel (fond grisé) au
   survol de la croix, afin de comprendre qu'elle est cliquable avant de valider mon
   geste.
4. En tant qu'utilisateur, je veux voir une icône devant le libellé d'un tag quand
   elle est fournie, afin d'identifier plus vite la nature du tag (catégorie, statut).
5. En tant qu'utilisateur, je veux distinguer visuellement un tag sélectionné d'un tag
   non sélectionné (bordure et texte plus contrastés), afin de savoir quels filtres
   sont actifs dans une liste.
6. En tant qu'utilisateur d'un lecteur d'écran, je veux que le bouton de fermeture
   soit annoncé comme un bouton avec un libellé explicite, afin de comprendre son
   effet avant de l'activer.
7. En tant que développeur d'une application cliente, je veux que les tags existants
   (sans les nouvelles props) restent visuellement inchangés, afin de ne pas casser
   les usages actuels lors de la mise à jour de la librairie.
8. En tant que développeur d'une application cliente, je veux composer un tag avec
   uniquement une icône, uniquement une croix, ou les deux, afin de couvrir les
   différents besoins d'affichage sans dupliquer le composant.
9. En tant que mainteneur d'Alveole, je veux que le bouton de fermeture soit un
   sous-composant réutilisable (`Tag/Close`), afin d'appliquer le même traitement
   visuel aux tailles SM et MD sans dupliquer le style.
10. En tant que designer ou développeur consultant le catalogue, je veux vérifier
    chaque nouvelle variante (sélectionné, fermable, avec icône) dans Storybook, afin
    de valider la fidélité avec la maquette Figma.

## Implementation Decisions

- Les nouvelles props sont additives et optionnelles : `selected?: boolean` (défaut
  `false`), `closable?: boolean` (défaut `false`, pour préserver les usages
  existants — c'est la valeur documentée dans la description du composant Figma
  `Tag/SM`), `onClose?: () => void`, `icon?: LucideIconProps['name']`. Aucune prop
  existante (`color`, `size`, `children`, `style`) ne change de comportement.
- La bordure et la couleur de texte du tag dépendent uniquement de `selected`, pas
  d'un état de survol du tag entier : `selected` → bordure `border/contrast-grey`
  (`#8d97ac`) et texte `text/default-grey` (`#373a3f`) ; non sélectionné → bordure
  `border/default-grey` (`#dee3ec`) et texte `text/mention-grey` (`#5f6571`). Le fond
  du tag reste `background/contrast-grey` (`#eff1f6`) dans tous les cas.
- Le bouton de fermeture est un sous-composant interne (`TagClose` ou équivalent) qui
  réutilise `LucideIcon` avec l'icône `X` et le pattern `Pressable` +
  `accessibilityRole="button"` déjà utilisé dans `Toast.tsx` pour son bouton de
  fermeture. Il expose deux tailles (SM/MD, alignées sur la taille du tag parent) et
  deux états (défaut, survol), le survol appliquant un fond
  `background/transparent-hover` (`rgba(0,0,0,0.04)`).
- Un `accessibilityLabel` explicite est fourni sur le bouton de fermeture (ex.
  "Supprimer le tag"), sur le modèle du `accessibilityLabel="Fermer la notification"`
  de `Toast.tsx`.
- L'icône avant le libellé utilise `LucideIcon` à la taille correspondant au tag (16px
  en SM d'après la maquette), avec un espacement de 4px entre l'icône et le libellé.
- Les tailles SM et MD reçoivent le même traitement fonctionnel (props, comportement),
  mais la maquette Figma ne détaille pas encore toutes les combinaisons pour MD
  (icône + sélection, icône + survol) : l'implémentation se cale sur le rapport de
  proportions déjà utilisé entre SM et MD dans `Tag.styles.ts` et sur les tokens
  d'espacement (`spacing('1W')`, `spacing('3V')`) déjà en place, à confirmer
  visuellement avec le design avant publication finale.
- La décision est consignée dans un nouvel ADR si le mainteneur du thème l'estime
  nécessaire (à trancher en revue de ticket).

## Testing Decisions

- Les tests portent sur le comportement observable : rendu du bouton de fermeture
  uniquement quand `closable` est vrai, appel de `onClose` au clic et à l'activation
  clavier, rendu de l'icône uniquement quand `icon` est fourni, changement de bordure
  et de couleur de texte selon `selected`.
- La convention de test suit `Button.test.tsx` et `ButtonIcon.test.tsx` :
  `renderNative`, assertions via `getByRole('button')` pour le bouton de fermeture,
  requêtes DOM via `.root?.queryAll(...)`.
- Aucun test n'existe aujourd'hui sur `Tag` (`Tag.test.tsx` absent) : la suite de
  tests est créée à cette occasion, pas seulement étendue.
- Une vérification transversale dans Storybook confirme que les stories existantes
  (`Colors`, `Sizes`) restent inchangées visuellement et que les nouvelles stories
  (sélectionné, fermable, avec icône) correspondent à la maquette Figma.

## Out of Scope

- L'état de survol de l'ensemble du tag (pas seulement de la croix) : la maquette
  Figma expose une variante `État=Hover` sur le tag entier, mais elle ne correspond à
  aucun besoin exprimé ici (le tag n'est pas rendu cliquable dans son ensemble). À
  traiter dans un ticket séparé si un besoin de tag entièrement cliquable apparaît.
- Les combinaisons icône + sélectionné et icône + survol pour les tailles SM et MD,
  non spécifiées dans la maquette Figma actuelle.
- Les couleurs de tag autres que `default` et `action` (pas de variante succès, erreur
  ou warning demandée).
- La possibilité de rendre le tag entier cliquable/navigable (`onPress` sur le tag
  lui-même, hors bouton de fermeture).
- La migration des consommateurs existants : aucun usage interne du composant `Tag`
  n'a été trouvé dans le repo à ce jour (uniquement l'export public), donc pas de
  migration à prévoir dans ce périmètre.

## Further Notes

- Référence d'inspiration : https://primer.style/product/components/token/
- Maquette Figma : https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1002-8509
- Le design confirme (description du composant Figma `Tag/SM`) : "Fermable ? reste
  désactivé par défaut pour préserver les usages existants" et "La croix utilise
  Tag/Close avec un hover Smart Animate 150ms Ease out".
- Le sous-composant `Tag/Close` est documenté dans Figma comme "à utiliser uniquement
  comme contenu interne d'un Tag fermable".
