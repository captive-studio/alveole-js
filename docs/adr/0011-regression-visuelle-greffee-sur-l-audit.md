---
status: proposed
---

# La régression visuelle du catalogue se greffe sur l'audit d'accessibilité

Décision prise, mise en œuvre repoussée. Ce document existe pour que le travail
puisse être repris tel quel, sans refaire les arbitrages.

## Pourquoi un filet visuel

L'audit axe couvre déjà un cas extrême : une fiche qui ne rend rien n'a ni
repère principal, ni titre de niveau un, et fait échouer la CI. C'est ainsi que
la boucle de rendu de `Signature` a fini par être découverte
(voir [0006](0006-audit-accessibilite-en-cliquet.md)).

Il ne couvre pas le cas courant. Un bouton qui passe à la mauvaise couleur, une
marge qui double, un alignement qui casse : rien de tout cela n'est une
violation d'accessibilité, et rien dans la CI ne le voit. Pour un design system,
c'est le défaut le plus probable et le seul qui ne soit surveillé par personne.

## Où ça tourne

Dans le job d'accessibilité existant, qui est renommé pour ne plus mentir sur ce
qu'il fait.

Ce job construit déjà les quatre paquets, restaure le cache Metro, lance
`expo export`, sert le site et pilote un navigateur sur chaque page du
catalogue. Un job de régression visuelle referait exactement ce chemin. Sur le
dernier run de `main`, il dure 6,6 min et constitue à lui seul le chemin
critique, le run complet tenant en 7 min. Une capture sur une page déjà chargée
coûte de 0,2 à 0,5 s, soit de 15 à 40 s pour les 77 pages : le chemin critique
passerait à 7,2 min environ.

Un job séparé aurait duré autant, en parallèle, sans allonger l'attente. Il a
été écarté pour la mémoire : `ci.yml` documente qu'`expo export` monte à
2,47 Gio de RSS laissé à lui-même, plus du double du budget par job sur lequel
le pool auto-hébergé est calibré, et que le kernel tuait alors le process. Deux
exports concurrents doubleraient la demande de pointe. Le nom trompeur est un
problème de nommage, qui se règle en changeant le nom ; la pression mémoire se
paierait en jobs tués.

Le plus difficile dans une capture, savoir quand la page a fini de bouger, est
déjà résolu : `auditRoute` attend le premier titre rendu puis que toutes les
images soient `complete`. Cette attente a été mise au point parce que la fiche
Image comptait 5 violations en local et 8 en CI.

## Ce qui est capturé

Le repère `<main>`, un cliché par page.

La page entière aurait fait réécrire les 77 clichés au moindre ajustement du
gabarit, de la barre latérale ou du pied de page, qui sont les parties les plus
volatiles et les moins intéressantes ici. Un cliché par exemple aurait donné le
grain le plus fin, l'échec nommant le composant et l'exemple, mais au prix de
plusieurs centaines de clichés et d'un `testID` à poser dans
`StoryDetailScreen`, donc du code de catalogue modifié pour les besoins du test.

Le repère `<main>` existe déjà, c'est le `screenContent` posé pendant la
campagne d'accessibilité. Il ne coûte rien et coupe le bruit du gabarit. Le
grain plus fin s'ajoutera si les différences se révèlent illisibles, pas avant.

## Ce qui ne peut pas être déterministe

Les zones animées sont masquées, une par une. Pas de tolérance globale.

Le relevé est plus favorable qu'attendu : les dates de `DataTable` sont codées
en dur, donc stables. `Spinner` s'anime en CSS, que Playwright sait figer. Reste
`Lottie`, quatre exemples en boucle pilotés en JavaScript, sur un rendu que
cette option ne fige pas.

Une tolérance globale en pixels, assez large pour absorber ces quatre exemples,
rendrait les 77 pages aveugles à une petite régression. C'est exactement
l'erreur corrigée dans [0006](0006-audit-accessibilite-en-cliquet.md), où quatre
règles avaient été désactivées partout pour un défaut de gabarit unique. Un
masque retire la zone instable et rien d'autre. Si le masque se révèle pénible à
poser, le repli est d'exclure la fiche `Lottie` : une fiche sur 77, contre la
sensibilité sur les 77.

## Où vivent les clichés

Versionnés dans git, en connaissance de cause.

Le dépôt pèse 112 Mio compressés et ne contient aujourd'hui qu'une seule image
versionnée. Ajouter 77 clichés représente donc une augmentation de 10 à 35 %
d'un coup, et git ne sait pas compresser les différences entre deux PNG : chaque
régénération ajoute une copie entière de chaque image modifiée, définitivement.

C'est le vrai prix du dispositif, et il est accepté. Git LFS garderait le dépôt
léger mais ajouterait une dépendance opérationnelle sur des runners
auto-hébergés, et une facturation au-delà du quota. Un stockage hors du dépôt
supprimerait la croissance mais aussi la revue : GitHub sait afficher une
comparaison visuelle entre deux images dans une PR, et une régression visuelle
qu'on ne peut pas regarder ne sert à rien. LFS reste possible plus tard, sur des
clichés déjà en place.

## Comment on régénère

Un workflow à déclenchement manuel, qui rejoue le build, recapture, et pousse
les clichés sur la branche.

Jamais en local : le décalage horaire, les polices et le moteur de rendu
diffèrent de ceux du conteneur, qui est épinglé par digest. `DataTable` lit
d'ailleurs `getTimezoneOffset()`, fixe dans le conteneur et variable ailleurs.
Un cliché produit sur une machine de développement échouerait à chaque fois.

L'artefact à télécharger puis à commiter soi-même a été écarté : il ajoute une
manipulation au moment précis où on souhaite qu'il n'y ait aucune friction,
sinon le dispositif se contourne. La CI écrit déjà dans le dépôt, `docs.yml`
pousse sur GitHub Pages à chaque merge.

## Une différence fait échouer la CI

L'acceptation passe par le déclenchement manuel ci-dessus : on regarde la
différence, on la valide en régénérant. Le geste de régénération est la revue.

Un rapport qui ne bloque pas est ignoré en quinze jours. Le coût d'un faux
positif reste faible, puisque l'acceptation tient en un déclenchement de
workflow.

**Ce n'est pas un cliquet**, et il ne faut pas l'appeler ainsi. Un cliquet est
une borne chiffrée qu'on resserre quand on la franchit dans le bon sens. Un
cliché n'est pas une borne chiffrée, et une différence visuelle n'est ni une
amélioration ni une dégradation : c'est un changement qui demande un jugement
humain.

## Conséquences

- Une seule largeur, bureau, comme l'audit d'accessibilité qui n'a qu'un projet
  Playwright. Le mobile a été écarté pour l'instant : capturer le seul repère
  `<main>` exclut déjà la barre latérale et son tiroir, qui sont la partie la
  plus spécifiquement mobile du catalogue. Il resterait les mêmes composants
  plus étroits, ce qui ne vaut pas le doublement du poids et du bruit avant
  d'avoir vérifié que le premier jeu sert.
- Le workflow de régénération produira des commits que personne n'a écrits à la
  main, sur des branches de travail. Ils ne contiendront que des PNG.
- Les clichés sont énumérés depuis le sitemap, comme les pages auditées : une
  fiche ajoutée est capturée sans rien déclarer, et une fiche supprimée laisse
  un cliché orphelin qu'il faudra retirer.
