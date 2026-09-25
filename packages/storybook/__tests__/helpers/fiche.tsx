import { Typography } from '@alveole/components';
import { StorybookModule } from '../../src/types';

/** Une fiche minimale : un titre, une phrase, un lien Figma, un exemple. */
export const fiche: StorybookModule = {
  default: {
    title: 'Bouton',
    tags: ['Composant'],
    experimental: false,
    description: 'Un bouton.',
    figmaURL: 'https://figma.com/fiche',
    styleFn: () => ({}),
  },
  Tailles: () => <Typography>Trois tailles</Typography>,
};
