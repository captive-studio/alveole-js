import { Box } from '../../core/Box';
import { Grid } from '../../core/Grid';
import { Story } from '../../type';
import { FormControl } from '../FormControl';
import { DurationInput } from './DurationInput';

export default {
  title: 'DurationInput',
  tags: ['ui'],
  experimental: false,
  shortDescription: "Saisie d'une durée au format HH:MM (ex. 06:15 pour 6 heures 15 minutes).",
  description: `Saisie d'une **durée** au format HH:MM (ex. \`06:15\` pour 6 heures 15 minutes).

Le champ est nu : on le place dans un FormControl pour son libellé, son aide et sa validation.

À ne pas confondre avec **TimeInput**, qui représente une **heure d'horloge** (ex. \`09:30\` du matin).

| Critère | DurationInput |
|---|---|
| Sémantique | Durée écoulée |
| Exemple | \`35:00\` (35h00 de travail) |
| Heures valides | 00–99 |
| HTML web | \`<input type="text">\` |

> Il n'existe pas de \`<input type="duration">\` en HTML.
> Voir [whatwg/html#5488](https://github.com/whatwg/html/issues/5488).`,
  component: DurationInput,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const Default = () => (
  <Box width="100%" p={8}>
    <Grid gap={8}>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Durée">
          <DurationInput />
        </FormControl>
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Durée">
          <DurationInput value="06:15" />
        </FormControl>
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Durée" hint="Temps passé sur le terrain">
          <DurationInput value="01:30" />
        </FormControl>
      </Grid.Column>
    </Grid>
  </Box>
);

export const States = () => (
  <Box width="100%" p={8}>
    <Grid gap={8}>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Erreur" error="Heure invalide (minutes 00–59)">
          <DurationInput value="25:70" error="Heure invalide (minutes 00–59)" />
        </FormControl>
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Succès" success="Enregistré">
          <DurationInput value="06:15" success="Enregistré" />
        </FormControl>
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Désactivé" disabled>
          <DurationInput value="06:15" disabled />
        </FormControl>
      </Grid.Column>
    </Grid>
  </Box>
);

export * as Sources from './DurationInput.stories.sources';
