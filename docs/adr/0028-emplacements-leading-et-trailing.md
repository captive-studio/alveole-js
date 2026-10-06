---
status: accepted
---

# Des emplacements `leading` / `trailing` plutôt que des props d'icône

Les composants qui affichaient une icône avant leur libellé (`startIcon`, `icon`)
exposent désormais une prop `leading`. Le Button remplace aussi `endIcon` par `trailing`.
Ces deux props acceptent soit le nom d'une icône Lucide (une string), soit un élément
React. Avec une string, le composant crée l'icône et lui donne sa taille et sa couleur.
Avec un élément, il le place dans un emplacement de même taille, sans toucher à sa
couleur ni de taille : un avatar `xs` (20 px) déborde de l'emplacement de 16 px d'un
Button `md`, sans en changer la hauteur, et ce dépassement est accepté. Les anciennes props sont supprimées dans la même version majeure, sans alias.

`ButtonIcon`, `InputButtonAdornment` et `DocumentViewerToolbarButton` gardent `icon` :
leur icône est tout leur contenu, elle ne précède rien.

## Pourquoi

Une prop typée sur le seul nom d'une icône Lucide interdit un avatar ou une icône de
réseau social, par exemple un bouton tertiaire précédé d'un avatar. Or neuf usages sur
dix ne font que poser une icône Lucide. Accepter la string garde ce cas-là aussi court
qu'avant, et accepter un élément ouvre tous les autres.

## Ce qu'on a écarté

- Une prop qui n'accepte que des éléments (`leading={<LucideIcon name="mail" />}`) :
  elle rend le cas courant plus lourd, et chaque appelant devrait connaître la bonne
  taille et la bonne couleur.
- Garder `icon` à côté d'un nouveau slot : deux props pour la même place.
- Injecter taille et couleur dans l'élément (`cloneElement`, contexte) : c'est fragile,
  et un avatar ou un logo de marque a ses propres couleurs. On pourra ajouter un
  contexte de couleur plus tard sans casser l'API.
- Une période de dépréciation : une version majeure est déjà prévue.
