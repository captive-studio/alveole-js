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

**Token sémantique** :
Une entrée de `CustomPalette` nommée par son usage (`border.default-grey`,
`text.mention-grey`) et qui référence une nuance. C'est la seule couleur qu'un
composant lit.
_Éviter_ : rôle de couleur, variable de couleur.
