# Domain Docs

Les engineering skills doivent suivre la documentation de domaine de ce dépôt
avant d'explorer ou de modifier le code.

## Sources à lire

- Lire `CONTEXT.md` à la racine pour le vocabulaire du domaine.
- Lire les ADR pertinents sous `docs/adr/` avant de travailler dans la zone
  concernée.
- Si un fichier ou un répertoire n'existe pas, poursuivre sans le signaler. Le
  skill `/domain-modeling` le créera lorsqu'une décision ou un terme devra être
  documenté.

## Structure

Ce dépôt utilise un modèle single-context :

```text
/
|-- CONTEXT.md
|-- docs/adr/
`-- packages/ et apps/
```

Les workspaces partagent le vocabulaire défini dans le `CONTEXT.md` racine.

## Vocabulaire

Utiliser les termes définis dans `CONTEXT.md` dans les tickets, propositions,
hypothèses, noms de tests et changements de code. Éviter les synonymes que le
glossaire exclut explicitement.

Si un concept manque, vérifier d'abord qu'il ne s'agit pas d'un terme inutile.
Pour une lacune réelle, la noter pour `/domain-modeling`.

## ADR

Signaler explicitement toute proposition qui contredit un ADR existant, avec la
raison pour laquelle la décision devrait être rouverte.
