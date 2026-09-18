# Domain Docs

Les engineering skills doivent suivre la documentation de domaine de ce dépôt
avant d'explorer ou de modifier le code.

## Sources à lire

- Lire l'index `CONTEXT.md` à la racine, puis seulement la ou les sections de
  `docs/context/` pertinentes pour la zone touchée.
- Lire les ADR pertinents sous `docs/adr/` avant de travailler dans la zone
  concernée : le champ `area:` en front-matter identifie la zone de chaque
  ADR (`grep -l "area: <zone>" docs/adr/*.md`).
- Si un fichier ou un répertoire n'existe pas, poursuivre sans le signaler. Le
  skill `/domain-modeling` le créera lorsqu'une décision ou un terme devra être
  documenté.

## Structure

Ce dépôt utilise un modèle single-context :

```text
/
|-- CONTEXT.md
|-- docs/context/
|-- docs/adr/
`-- packages/ et apps/
```

Les workspaces partagent le vocabulaire défini dans `CONTEXT.md` et ses
sections sous `docs/context/`.

## Vocabulaire

Utiliser les termes définis dans `CONTEXT.md` et `docs/context/` dans les
tickets, propositions, hypothèses, noms de tests et changements de code.
Éviter les synonymes que le glossaire exclut explicitement.

Si un concept manque, vérifier d'abord qu'il ne s'agit pas d'un terme inutile.
Pour une lacune réelle, la noter pour `/domain-modeling`.

## ADR

Signaler explicitement toute proposition qui contredit un ADR existant, avec la
raison pour laquelle la décision devrait être rouverte.
