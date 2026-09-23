import { Box } from '../../core/Box';
import { Story } from '../../type';
import { Grid } from '../../core/Grid';
import { DurationInput } from './DurationInput';

const useStyles = () => ({});

export default {
  title: 'DurationInput',
  tags: ['ui'],
  experimental: false,
  shortDescription: "Saisie d'une durée au format HH:MM (ex. 06:15 pour 6 heures 15 minutes).",
  description: `Saisie d'une **durée** au format HH:MM (ex. \`06:15\` pour 6 heures 15 minutes).

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
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box width="100%" p={8}>
    <Grid gap={8}>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <DurationInput label="Durée" />
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <DurationInput label="Durée" value="06:15" />
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <DurationInput label="Durée" value="01:30" hint="Temps passé sur le terrain" />
      </Grid.Column>
    </Grid>
  </Box>
);

export const States = () => (
  <Box width="100%" p={8}>
    <Grid gap={8}>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <DurationInput label="Erreur" value="25:70" error="Heure invalide (minutes 00–59)" />
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <DurationInput label="Succès" value="06:15" success="Enregistré" />
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <DurationInput label="Désactivé" value="06:15" disabled />
      </Grid.Column>
    </Grid>
  </Box>
);

export * as Sources from './DurationInput.stories.sources';
