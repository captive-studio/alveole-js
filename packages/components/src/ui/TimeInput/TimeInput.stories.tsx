import { Box } from '../../core/Box';
import { Story } from '../../type';
import { Grid } from '../Grid';
import { TimeInput } from './TimeInput';
import { useStyles } from './TimeInput.styles';

export default {
  title: 'TimeInput',
  tags: ['ui'],
  experimental: false,
  shortDescription: "Saisie d'une heure d'horloge au format HH:MM (ex. 09:30 pour 9h30 du matin).",
  description: `Saisie d'une **heure d'horloge** au format HH:MM (ex. \`09:30\` pour 9h30 du matin).

À ne pas confondre avec **DurationInput**, qui représente une **durée écoulée** (ex. \`06:15\` pour 6 heures 15 minutes).

| | TimeInput |
|---|---|
| Sémantique | Heure du jour |
| Exemple | \`09:30\` (9h30 le matin) |
| Heures valides | 00–23 |
| HTML web | \`<input type="time">\` |`,
  component: TimeInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box width="100%" p={8}>
    <Grid gap={8}>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <TimeInput label="Heure" />
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <TimeInput label="Heure" value="09:30" />
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <TimeInput label="Heure" value="14:00" hint="Heure de début de mission" />
      </Grid.Column>
    </Grid>
  </Box>
);

export const States = () => (
  <Box width="100%" p={8}>
    <Grid gap={8}>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <TimeInput label="Erreur" value="25:70" error="Heure invalide (00:00–23:59)" />
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <TimeInput label="Succès" value="09:30" success="Enregistré" />
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <TimeInput label="Désactivé" value="09:30" disabled />
      </Grid.Column>
    </Grid>
  </Box>
);

export * as Sources from './TimeInput.stories.sources';
