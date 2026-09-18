# Alveole

Design system publié en paquets npm (`@alveole/*`) et consommé par les applications
clientes de Captive. Ce fichier fixe le vocabulaire du dépôt ; il ne décrit ni
l'architecture ni les choix techniques, qui relèvent de [docs/adr/](./docs/adr/).

## Langage

### Périmètre

**Support** :
Une surface sur laquelle s’exprime l’identité visuelle de Captive, par exemple une
application cliente ou un document contractuel. Alveole constitue la référence
visuelle commune aux différents supports, sans imposer à chacun les mêmes règles de
composition.
_Éviter_ : canal, média. Ces termes décrivent la diffusion, pas les contraintes de
restitution qui déterminent la composition.

**Adaptation de support** :
La traduction des principes visuels d’Alveole dans les contraintes propres à un
Support. Elle peut adapter notamment la grille, l’échelle typographique, la densité ou
la pagination, mais ne crée pas une identité visuelle indépendante.
_Éviter_ : inspiration, déclinaison libre. Ces formulations autorisent une divergence
visuelle sans frontière explicite.

**Langage documentaire** :
L’Adaptation de support commune aux documents officiels de Captive. Elle garantit une
identité cohérente entre les différents Types de document, sans leur imposer une
composition identique.
_Éviter_ : thème PDF, style du contrat. Le format technique ne définit pas le langage,
et celui-ci ne se limite pas au contrat-cadre.

**Registre institutionnel** :
Le registre du Langage documentaire destiné aux contenus qui engagent Captive. Il
reprend l’identité, les proportions et la personnalité d’Alveole dans une grammaire
éditoriale conçue pour inspirer confiance et durer, sans reproduire l’apparence d’une
interface applicative.
_Éviter_ : corporate, interface imprimée. Le premier est trop vague ; la seconde
confond les règles de deux Supports.

**Accent institutionnel** :
La couleur secondaire ponctuelle du Registre institutionnel. Le Lilas Alveole remplit
ce rôle sur les couvertures, les transitions majeures et les repères de lecture, tandis
que le Bleu Captive et les Neutres restent dominants. Son emploi ne doit ni décorer les
pages courantes ni concurrencer la lecture du contenu contractuel.
_Éviter_ : couleur d’accent libre, couleur décorative. Ces formulations permettraient
de choisir une couleur sans relation stable avec sa fonction documentaire.

**Diagonale Captive** :
La signature géométrique du Langage documentaire, dérivée des diagonales du `A` et du
`V` du logotype Captive. Elle structure certains aplats, transitions et repères majeurs
sans répéter le logo ni devenir un motif décoratif dans les pages courantes.
_Éviter_ : chevron, slash décoratif. Ces termes décrivent une forme générique et
rompent son lien avec l’identité Captive.

**Carte de lecture** :
La page du Langage documentaire qui présente l’architecture d’un document long avant
son contenu détaillé. Dans le Contrat-cadre, elle regroupe les articles en six séquences,
explique l’articulation avec les commandes particulières et distingue l’Annexe RGPD.
_Éviter_ : sommaire. Un sommaire indexe des pages ; la Carte de lecture explique la
logique du document et reste stable malgré les variations de pagination.

**Séquence contractuelle** :
Un regroupement stable d’articles poursuivant une même intention de lecture. Chaque
Séquence contractuelle apparaît dans la Carte de lecture et s’ouvre dans le corps du
Contrat-cadre par un repère intégré, sans page intercalaire dédiée.
_Éviter_ : chapitre. Le contrat conserve sa structure juridique en articles ; la
séquence est une couche de navigation, pas un niveau juridique supplémentaire.

**Rail de navigation** :
La zone latérale étroite des pages courantes d’un document long. Elle porte les numéros
d’article et les repères de Séquence contractuelle, tandis que le texte juridique reste
dans une colonne principale unique. Elle organise le balayage visuel sans isoler de
contenu contractuel dans une marge.
_Éviter_ : sidebar. Le Rail de navigation appartient à une grille éditoriale imprimée,
pas à une interface applicative.

**Densité de lecture** :
Le rapport entre la quantité de contenu, la largeur de ligne, le corps typographique et
les espaces d’une page documentaire. Le Registre institutionnel privilégie une Densité
de lecture confortable, même si elle augmente modérément la pagination du document.
_Éviter_ : nombre de pages cible. La pagination est une conséquence du contenu et de la
lisibilité, pas une contrainte de compression.

**Bloc d’identité juridique** :
La présentation structurée d’une Partie dans un document contractuel. Les Blocs
d’identité juridique de Captive et du Client sont superposés, utilisent le même ordre
d’information et occupent toute la largeur utile afin de préserver lisibilité et parité.
_Éviter_ : fiche, carte. Ces termes suggèrent un composant applicatif ou une mise en
concurrence côte à côte qui ne convient pas au support A4.

**Hiérarchie sans paraphrase** :
La règle selon laquelle le Langage documentaire améliore l’accès au texte contractuel
par la typographie, la grille et la navigation, sans lui ajouter de résumé interprétatif
ni de promesse marketing. Seules des formulations déjà présentes peuvent être mises en
évidence.
_Éviter_ : points clés, à retenir. Dans un document signé, ces raccourcis pourraient
sembler concurrencer les clauses qui font foi.

**Page d’accord** :
La page de conclusion d’un document destiné à être signé. Elle rappelle l’effet de la
dernière signature, identifie les signataires et réserve des zones fixes et généreuses
aux champs de signature électronique. Elle ne porte aucun autre contenu juridique.
_Éviter_ : page de signatures. Ce terme décrit les champs présents, pas la fonction de
la page dans le parcours de contractualisation.

**Ouverture d’annexe** :
La transition renforcée qui introduit une annexe sans lui consacrer une page
intercalaire. Elle utilise l’Accent institutionnel, identifie l’annexe dans le Rail de
navigation et conserve la grille du document principal pour matérialiser leur lien.
_Éviter_ : couverture d’annexe. L’annexe reste une partie du document signé, pas un
document autonome doté d’une nouvelle couverture.

**Repères de page** :
Les informations permanentes qui orientent et identifient les pages courantes :
Séquence contractuelle, relation entre les Parties, confidentialité et pagination. Ils
restent absents de la couverture et ne répètent pas les mentions légales complètes.
_Éviter_ : header, footer. Ces termes techniques décrivent leur position, pas leur rôle
dans le Langage documentaire.

**Robustesse chromatique** :
La propriété d’un document dont la hiérarchie, les contrastes et l’identité restent
compréhensibles en niveaux de gris. La couleur peut renforcer un repère, mais ne porte
jamais seule une information et les aplats restent compatibles avec une impression de
bureau.
_Éviter_ : version noir et blanc. Il ne s’agit pas d’entretenir un second thème, mais de
concevoir la version canonique pour qu’elle résiste à la perte de couleur.

**Type de document** :
Une famille de documents qui poursuit une même fonction, par exemple le contrat-cadre
ou le détail des réalisations. Chaque Type de document compose le Langage documentaire
selon ses besoins propres.
_Éviter_ : template. Un template est une manière de produire un Type de document, pas
le concept métier lui-même.

**Application cliente** :
Une application de Captive qui installe les paquets `@alveole/*` et s'en sert
pour construire ses écrans. C'est le destinataire de tout ce que le dépôt
produit.
_Éviter_ : projet cible, application hôte, consommateur. « Projet cible » décrit
la mécanique du script `publish:local`, qui copie des fichiers vers une cible,
et non l'objet dont on parle.

### Catalogue

**Catalogue** :
Le site qui présente le design system, publié sur alveole.captive.fr. Une page
par composant, plus les pages de thème et de constantes.
_Éviter_ : Storybook, doc, showcase. Le dépôt contient un paquet nommé
`@alveole/storybook`, mais c'est le catalogue maison, sans lien avec l'outil
Storybook.

**Fiche** :
La description d'un composant dans le catalogue : titre, tags, description,
lien Figma, drapeaux de plateforme. Une fiche par composant.
_Éviter_ : meta. Le type s'appelle `StoryMeta`, et son alias `Story` prête à
confusion : `Story` désigne la fiche, jamais un exemple.

**Exemple** :
Un cas d'usage affichable d'un composant, rendu dans sa fiche. Un composant en
présente plusieurs (variants, tailles, états).
_Éviter_ : story, cas, démo. Le type est `StoryExample`.

**Bloc d'exemple** :
Le cadre qui présente un exemple dans une fiche : la démonstration, puis une
barre de commandes, puis sa source. Un seul cadre par exemple. Le titre et la
description de l'exemple lui restent extérieurs, dans le flux de la page.
_Éviter_ : carte, encart, démo.

**Source** :
Le code d'un exemple, tel qu'il est écrit dans son module de stories. Une source
est entière : quand la fiche n'en montre que les premières lignes, c'est un état
d'affichage, pas un autre objet.
_Éviter_ : extrait, snippet, code. « Extrait » laisserait croire à un second
objet là où il n'y a qu'une source montrée en partie.

**Module de stories** :
Le fichier `*.stories.tsx` d'un composant : une fiche en export par défaut et
ses exemples en exports nommés.
_Éviter_ : story file.

### Navigation

**Rubrique** :
L'une des grandes entrées du catalogue : Composants, Couleurs, Typographies,
Variables CSS, Constantes, Philosophie. C'est le niveau 1 de la navigation.
_Éviter_ : section. `Section` est un composant publié de `@alveole/components`,
manipulé dans les mêmes fichiers, et la collision se relit mal.

**Barre** :
La navigation horizontale collante en haut du catalogue. Elle porte l'identité
et les rubriques. Rendue par `UIKitTopBar`.
_Éviter_ : header, top bar, nav. `Header` désigne le composant publié sur lequel
la barre est bâtie, pas la barre elle-même.

**Colonne** :
La navigation verticale posée sous la barre, qui liste le contenu de la rubrique
courante : les fiches sur Composants, les pages sur Thème. C'est le niveau 2.
Rendue par le composant `Sidebar`, sans se confondre avec lui : `Sidebar` est
aussi le squelette d'une application cliente, où il porte le logo et n'a aucune
barre au-dessus.
_Éviter_ : menu latéral, sidebar, sommaire. « Sommaire » est réservé à la table
des matières d'une page, qui est un autre objet.

### Qualité

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
