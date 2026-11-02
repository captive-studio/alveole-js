# Couleurs

**Nuance** :
Un cran d'une échelle de couleur brute du thème (`Colors.Neutre`), désigné par
son échelle et son numéro : « la nuance Neutre 900 ». Une nuance n'a pas
d'usage : elle ne sert qu'à donner sa valeur à un token sémantique, et un
composant ne la lit jamais directement.
_Éviter_ : primitive, couleur de base. « Primitive » désigne déjà autre chose
(ADR 0002), et « couleur de base » se confond avec la couleur principale d'une
marque. Les références (Primer, Atlassian, Base) appellent « primitive » ce que
nous appelons nuance.

**Rang** :
La position d'une nuance dans son échelle, de 1 (la plus claire) à 12 (la plus
foncée), qui dit à quoi elle sert : « le rang 3 est le fond de composant ». Le
numéro d'une nuance dit sa luminosité, son rang dit son usage : la nuance
Neutre 950 est de rang 3.
_Éviter_ : palier, niveau, step.

**Famille d'échelles** :
Le groupe auquel appartient une échelle de nuances selon ce à quoi le thème
la destine : Neutre, Marque, Statut ou Accent. « BleuCaptive est de la
famille d'échelles Marque. »
_Éviter_ : rôle, catégorie, groupe, et « famille » seul, qui se confond avec
la famille de tokens. « Rôle de couleur » est déjà écarté au profit de token
sémantique.

**Famille de tokens** :
Le groupe de tokens sémantiques qui partagent le début de leur chemin, comme
`light / border` : c'est une section de la page des tokens.
_Éviter_ : « famille » seul, qui se confond avec la famille d'échelles.

**Token sémantique** :
Une entrée de `CustomPalette` nommée par son usage (`border.default-grey`,
`text.mention-grey`) et qui référence une nuance. C'est la seule couleur qu'un
composant lit.
_Éviter_ : rôle de couleur, variable de couleur.

**Composant consommateur** :
Un composant publié par `@alveole/components` qui cite lui-même un token sémantique
dans son code : « Select est un composant consommateur de `border.default-grey` ».
Seule la citation directe compte : un composant qui en contient un autre ne
consomme pas les tokens de ce dernier. Les exemples, tests et démonstrations ne
font pas d'un composant un consommateur. Le catalogue l'affiche « Utilisé par ».
_Éviter_ : usage, utilisation. L'usage d'un token est le rôle que son nom et sa
phrase d'usage annoncent, pas le constat de qui le cite.
