import { Box } from '../../core/Box';
import type { Story } from '../../type/Story';
import { Spinner } from './Spinner';
import { useStyles } from './Spinner.styles';

export default {
  title: 'Spinner',
  tags: ['ui'],
  experimental: false,
  description: `Indicateur de chargement animé en rotation.

Trois tailles disponibles : \`sm\` (16 px), \`md\` (32 px, défaut) et \`lg\` (64 px).

La prop \`delay\` permet de retarder l'apparition du spinner pour éviter un flash sur les opérations rapides :
- \`false\` / absent : visible immédiatement
- \`true\` : délai de 1 000 ms
- \`"short"\` : 300 ms
- \`"long"\` : 1 000 ms
- \`number\` : délai personnalisé en millisecondes`,
  shortDescription: 'Indicateur de chargement animé disponible en trois tailles.',
  component: Spinner,
  styleFn: useStyles,
} satisfies Story;

export const Sizes = () => (
  <Box display="flex" flexDirection="row" style={{ alignItems: 'center' }} gap={16}>
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </Box>
);

/**
 * `delay` retarde l'apparition du spinner pour éviter un flash sur les opérations rapides :
 * rien ne s'affiche avant que le délai ne soit écoulé. `'short'` attend 300 ms, `'long'`
 * (comme `true`) 1 000 ms ; un `number` accepte n'importe quel délai personnalisé en
 * millisecondes. C'est cette même prop que `Button` expose sous le nom `loadingDelay`, pour
 * régler le retard de son propre spinner pendant `isLoading`.
 */
export const WithDelay = () => (
  <Box display="flex" flexDirection="row" style={{ alignItems: 'center' }} gap={16}>
    <Spinner size="md" delay="short" key="short" />
    <Spinner size="md" delay="long" key="long" />
  </Box>
);

export * as Sources from './Spinner.stories.sources';
