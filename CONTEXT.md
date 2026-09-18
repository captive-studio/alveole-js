# Alveole

Design system publié en paquets npm (`@alveole/*`) et consommé par les applications
clientes de Captive. Ce fichier est un index ; il ne décrit ni l'architecture ni les
choix techniques, qui relèvent de [docs/adr/](./docs/adr/).

## Langage

Le vocabulaire est scindé par domaine sous [docs/context/](./docs/context/) pour ne
lire que la section utile à la zone touchée :

- [Périmètre](docs/context/perimetre.md) : vocabulaire des supports, de l'adaptation
  visuelle et du langage documentaire (contrats, documents officiels).
- [Catalogue](docs/context/catalogue.md) : vocabulaire du site catalogue
  (`@alveole/storybook`) : fiches, exemples, sources, modules de stories.
- [Navigation](docs/context/navigation.md) : vocabulaire de la navigation du
  catalogue : rubriques, barre, colonne.
- [Qualité](docs/context/qualite.md) : vocabulaire des garde-fous mesurés du
  dépôt : cliquets, violations, clichés.
