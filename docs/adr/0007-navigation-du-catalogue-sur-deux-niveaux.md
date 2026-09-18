---
status: accepted
area: catalogue
---

# La navigation du catalogue tient sur deux niveaux, et réutilise les composants publiés

Le catalogue n'avait qu'une barre horizontale : pour aller d'une fiche à une
autre, il fallait repasser par l'index. On y ajoute une colonne verticale. La
barre garde les rubriques, la colonne liste le contenu de la rubrique courante,
et l'une comme l'autre sont rendues par des composants déjà publiés dans
`@alveole/components` plutôt que par des composants écrits pour l'occasion.

Le vocabulaire - rubrique, barre, colonne - est fixé dans
[CONTEXT.md](../../CONTEXT.md).

## Ce que font Primer et Atlassian, mesuré

Les deux sites ont servi de référence. Mesures relevées en 1440px de large,
le 15 septembre 2026, sur `primer.style/product/components/button` et
`atlassian.design/components/button/examples`.

Chez Primer, la colonne est un `NavList` de `@primer/react` pris tel quel :
`nav[data-component=NavList]`, lignes `a[data-component=NavList.Item]`, groupes
`ActionList.Group`, 175 liens en 9 groupes. Ce qui est fait maison, c'est le
conteneur autour : `position: sticky`, `top: 65px` — la hauteur exacte de leur
header —, `overflow-y: auto`, `border-right: 1px`. Chez Atlassian, la colonne
est `nav#side-navigation` avec `data-layout-slot`, soit le slot de mise en page
de `@atlaskit/navigation-system`, 103 liens.

Les deux réutilisent donc le composant de liste de leur design system, et ne
fabriquent que le conteneur. C'est la raison principale pour laquelle on monte
`Sidebar`, `SidebarGroup` et `SidebarItem` tels quels plutôt qu'un équivalent
local : le catalogue est le seul endroit où les composants d'Alveole sont mis en
condition réelle, et un équivalent local les priverait de ce test.

Deux autres chiffres qu'on ne remesurera pas de sitôt. Aucun des deux ne change
la graisse sur la ligne courante : Primer reste en 16px/400 et ne change que le
fond, porté par le `li` parent (`rgba(129,139,152,0.15)`) ; Atlassian reste en
14px/400 et fait passer la couleur au bleu. Et les deux replient la colonne dès
900px de large, en l'exposant par un bouton dans la barre — d'où le choix de
n'afficher la colonne qu'en variante `desktop`, que `breakpointToVariant` place
à 992px.

## Pourquoi on ne copie pas Primer jusqu'au bout

Chez Primer, la barre du haut n'a que cinq liens et sert à basculer de design
system — Product UI, Brand, Octicons ; toutes les rubriques du site sont dans
la colonne. On garde les rubriques dans la barre : on n'a qu'un seul design
system à présenter, et la barre venait d'être refaite sur leur modèle.

Le prix est connu et accepté : une rubrique qui n'a qu'une page n'a pas de
niveau 2, donc pas de colonne. C'est pour le contenir qu'on replie Couleurs,
Typographies et Variables CSS sous une rubrique `Thème` — un regroupement que
`ThemeHomeScreen` portait déjà. Seule Philosophie reste en pleine largeur.

## Conséquences

La barre quitte le `beforeContent` de chaque écran pour monter une fois dans
`apps/docs/app/_layout.tsx`, au-dessus du `Stack`. Sans quoi elle serait rendue
à l'intérieur de la colonne de droite de `Page`, et ne serait plus pleine
largeur. La rubrique courante se déduit dès lors de `usePathname()`, comme
`SidebarItem` le fait déjà pour ses lignes, au lieu d'être écrite à la main dans
chaque route.

Monter `Sidebar` sans logo laisse un `Divider` orphelin en haut de colonne, et
`SidebarItem` empile trois signaux sur la ligne courante — fond, `SemiBold`,
barre indicatrice — là où les références n'en gardent qu'un ou deux. Ces défauts
sont assumés à la livraison : ils se corrigent dans le paquet publié, pour les
applications clientes, et en chantier séparé.

Ce chantier a eu lieu : c'est
[0010](0010-echelle-et-etats-de-la-barre-laterale.md), qui règle l'échelle et
les états de la barre sur des références mesurées. Le présent document ne porte
que sur la structure de navigation du catalogue ; aucune décision de style ne
s'y trouve.
