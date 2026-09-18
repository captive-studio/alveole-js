---
status: accepted
area: sidebar
---

# L'échelle et les états de la barre latérale se règlent sur des références mesurées

`Sidebar` a été monté tel quel dans le catalogue pour le mettre en condition
réelle (voir [0007](0007-navigation-du-catalogue-sur-deux-niveaux.md)). Les
défauts que cette mise en condition a révélés se corrigent ici, dans le paquet
publié. Chaque valeur posée vient d'une mesure, pas d'un choix : quatre sources
ont été relevées, et trois pistes essayées puis retirées.

## Les quatre sources, mesurées

Relevés le 15 septembre 2026, à 1440px de large, sur
`primer.style/product/components/action-list`,
`atlassian.design/components/button/examples`, la barre du tableau de bord de
GitHub, et le nœud Figma `1328-854` du fichier Alveole.

|                 | titre de groupe                     | item                            | alignement                      |
| --------------- | ----------------------------------- | ------------------------------- | ------------------------------- |
| Primer          | 14/18 w600, même gris que les items | 16/20 w400 `#1F2328`            | à fleur, x=24 et x=24           |
| Atlassian       | 12/16 w653 `#6B6E76`                | 14/20 w500 `#505258`            | libellés indentés, x=30 et x=56 |
| GitHub          | aligné sur les avatars              | libellés indentés               | gouttière d'icônes              |
| Figma           | 14/20 w500 `mention-grey`           | 14/20 w400 `default-grey`, h 32 | titre sur l'icône, x=16 et x=40 |
| **nous, avant** | 12/20 **w600 `#171717`**            | **16/24** w400 `#151617`, h 36  | **x=8 et x=28**                 |
| **nous, après** | 12/20 w600 `mention-grey`           | 14/20 w400 `default-grey`, h 32 | à fleur, x=28 et x=28           |

Une mise en garde sur ces chiffres, apprise en les prenant. Une première série
lisait chez Primer un titre à 12px gris : c'était le `<h3>` conteneur, dont le
texte visible vit dans le lien qu'il enveloppe, à 14px. Toute mesure de
typographie se prend sur le nœud de texte, par une `Range`, jamais sur la boîte
de l'élément. La même erreur a fait annoncer 16px d'écart d'alignement dans le
tiroir mobile là où il n'y en avait que 4.

## Le titre de groupe recule, et ne cumule pas les signaux

Le titre était noir et en graisse 600 face à des items noirs en graisse 400 :
l'élément censé être le plus discret de la colonne en était le plus lourd. Il
avait pris la réduction de taille des références sans leur recul de couleur,
soit la moitié qui ne fonctionne pas seule.

Aucune des sources ne cumule couleur plus sombre **et** graisse supérieure à
celles de ses items. Elles divergent sur les dimensions retenues : Primer joue
la graisse et la taille à couleur égale, Atlassian la couleur. La règle qu'on
en tire n'est pas une valeur mais un plafond : **deux dimensions au plus, et
jamais dans le sens qui alourdit le titre.**

L'alignement suit Primer, à fleur des libellés, parce que la colonne du
catalogue n'a pas d'icônes. La verticale est une valeur nommée,
`desktopContentInset` : l'item l'atteint par trois retraits emboîtés et le titre
par un seul, si bien que sans cette somme explicite les deux dérivent au premier
réglage.

## Trois pistes essayées, puis retirées

**La gouttière d'icônes réservée.** Atlassian, GitHub et la maquette alignent le
titre sur la colonne d'icônes, pas sur les libellés. Reproduit chez nous, ce
modèle réserve 32px que rien n'occupe jamais, la colonne du catalogue n'ayant
aucune icône : les libellés partent à 60 et le vide se voit. Le cas se règle
tout seul, sans code, puisque l'icône occupe la gouttière quand elle existe et
que titre et libellé coïncident quand elle n'existe pas. **Ne pas réserver de
place pour ce qui n'est pas là.**

**Les capitales.** Aucune des sources n'en met : GitHub écrit `Top repositories`,
Atlassian `Forms and input`, Primer `Getting Started`. Le thème offre pourtant
un jeton `CapsBold`, dont l'existence n'est pas un argument. La casse se règle à
la source, sur les noms de groupes, avec une table d'exceptions pour les sigles
puisque `ui` donne `UI` et non `Ui`.

**Une teinte de survol propre à la ligne courante.** Elle valait exactement sa
couleur de repos : l'affordance existait dans le code sans exister à l'écran. La
correction n'a pas été de lui inventer une teinte mais de supprimer le cas
particulier. Toutes les entrées partagent un seul survol, et comme le fond de
repos de la ligne courante est plus sombre, ce survol commun l'éclaircit, ce que
fait Primer. `ActionMenuItem` consommait le même style et portait le même
défaut.

## Le tiroir mobile ne s'aligne pas sur le bureau

Ses items font 56px de haut contre 32 sur bureau. Les ramener à 32 les ferait
passer sous les 44px attendus d'une cible tactile : **l'écart d'échelle entre
les deux variantes est une adaptation au doigt, pas une dérive**, et il reste.

Ce qui était cassé, c'est le rapport interne au tiroir. Titre et items y
partageaient exactement la même police, 16/24 en graisse 500, si bien que seule
la couleur distinguait un intertitre d'un lien. Le titre descend d'un cran de
l'échelle et perd de la hauteur : un libellé qui occupe les 56px d'une cible
tactile se lit comme cliquable.

## Conséquences

L'état courant se signale désormais aussi à qui ne voit pas l'écran :
`aria-current="page"` dans les deux variantes, le tiroir comptant autant que le
bureau puisque la colonne s'y replie sous 992px.

Les jetons dépréciés ont quitté la barre : `MD.SemiBold`, alias strict de
`Bold`, et `background.badge.default`, remplacé par
`light.background['contrast-grey']` à valeur égale. La barre ne touche plus la
palette brute, seulement des jetons de décision.

Deux défauts connus restent, faute d'être bloquants. La pastille d'un item n'est
pas centrée, `marginLeft: 12` contre `marginRight: 4` : c'est ce décentrage qui
a forcé le filet de séparation des groupes à un retrait symétrique arbitraire
plutôt qu'à l'emprise de la pastille. Et ce filet vit dans `UIKitColumn`, pas
dans `SidebarGroup`, faute qu'un composant sache s'il est le premier de sa
liste : les barres clientes n'en ont donc pas.

Enfin, le cliquet d'accessibilité a attrapé au passage un défaut que la colonne
n'a fait que déclencher. En prenant 286px, elle faisait déborder de 16px le bloc
de code d'une fiche. `Highlight` appliquait `overflow: scroll` à son conteneur
de contenu, qui défilait donc en doublon du `ScrollView` l'entourant, et c'est
ce doublon intérieur, inatteignable au clavier, qu'axe signalait. Le défaut
préexistait. Il n'a pas de test unitaire : `react-syntax-highlighter` tire une
chaîne de modules ESM que jest refuse l'un après l'autre, et le cliquet, qui
évalue la règle dans un vrai navigateur, est une meilleure preuve qu'un test
qui passerait dans jsdom.
