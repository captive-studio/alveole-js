---
status: accepted
---

# L'Anchor Sync diverge entre web et natif

`Tabs` peut refléter son onglet actif dans l'état adressable de la plateforme (l'Anchor Sync,
voir [Catalogue](../context/catalogue.md)) pour qu'un rechargement rouvre le bon onglet. Le seul
routeur du dépôt, `expo-router`, n'a pas de notion de fragment `#` : ses paramètres sont de la
query string. Le web lit et écrit donc une vraie ancre `#{urlAnchorPrefix}-{ancre}` via
`window.location`/`history`, au même format que `AnchorHeading` ; le natif lit et écrit la même
ancre via `useLocalSearchParams`/`router.setParams` d'`expo-router`.

## Pourquoi

Unifier les deux plateformes sur `expo-router` partout aurait donné une seule implémentation,
mais aurait transformé chaque ancre en query string sur le web (`?urlAnchorPrefix=ancre`) et
rompu la convention déjà posée par `AnchorHeading`.

## Ce qu'on a écarté

Utiliser `expo-router` comme mécanisme unique, y compris sur le web : rejeté pour la raison
ci-dessus.
