import { Story } from '../../type';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Code } from './Code';
import { useStyles } from './Code.styles';

export default {
  title: 'Code',
  tags: ['core'],
  experimental: false,
  description: 'Composant pour afficher du code ou des valeurs techniques avec un style distinctif.',
  component: Code,
  styleFn: useStyles,
} satisfies Story;

export const Basic = () => (
  <Box>
    <Typography>
      La balise <Code>{'<Code>'}</Code> doit être comprise dans une balise <Code>{'<Typography>'}</Code>
    </Typography>
  </Box>
);

export const InText = () => (
  <Box>
    <Box display="flex" flexDirection="column" gap={24}>
      <Typography>
        Le fichier CSV doit avoir une <Code>,</Code> comme séparateur de colonnes.
      </Typography>
      <Typography>
        Exemple : <Code>Individuel</Code> ou <Code>Collectif</Code>
      </Typography>
    </Box>
  </Box>
);

export * as Sources from './Code.stories.sources';
