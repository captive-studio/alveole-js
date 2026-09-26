import { Box } from '../../core/Box';
import { Grid } from '../../core/Grid';
import { Story } from '../../type';
import { FormControl } from '../FormControl';
import { TimeInput } from './TimeInput';

export default {
  title: 'TimeInput',
  tags: ['ui'],
  experimental: false,
  shortDescription: "Saisie d'une heure d'horloge au format HH:MM (ex. 09:30 pour 9h30 du matin).",
  description: `Saisie d'une **heure d'horloge** au format HH:MM (ex. \`09:30\` pour 9h30 du matin).

Le champ est nu : on le place dans un FormControl pour son libellé, son aide et sa validation.

À ne pas confondre avec **DurationInput**, qui représente une **durée écoulée** (ex. \`06:15\` pour 6 heures 15 minutes).

| Propriété | TimeInput |
|---|---|
| Sémantique | Heure du jour |
| Exemple | \`09:30\` (9h30 le matin) |
| Heures valides | 00–23 |
| HTML web | \`<input type="time">\` |`,
  component: TimeInput,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const Default = () => (
  <Box width="100%" p={8}>
    <Grid gap={8}>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Heure">
          <TimeInput />
        </FormControl>
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Heure">
          <TimeInput value="09:30" />
        </FormControl>
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Heure" hint="Heure de début de mission">
          <TimeInput value="14:00" />
        </FormControl>
      </Grid.Column>
    </Grid>
  </Box>
);

export const States = () => (
  <Box width="100%" p={8}>
    <Grid gap={8}>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Erreur" error="Heure invalide (00:00–23:59)">
          <TimeInput value="25:70" error="Heure invalide (00:00–23:59)" />
        </FormControl>
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Succès" success="Enregistré">
          <TimeInput value="09:30" success="Enregistré" />
        </FormControl>
      </Grid.Column>
      <Grid.Column size={{ mobile: 12, desktop: 4 }}>
        <FormControl label="Désactivé" disabled>
          <TimeInput value="09:30" disabled />
        </FormControl>
      </Grid.Column>
    </Grid>
  </Box>
);

export * as Sources from './TimeInput.stories.sources';
