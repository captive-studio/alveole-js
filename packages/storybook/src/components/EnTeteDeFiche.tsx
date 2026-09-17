import { Box, MarkdownDescription } from '@alveole/components';
import { StorybookMeta } from '../types';
import { PageTitle } from './PageTitle';

/**
 * Ce que la fiche annonce : son titre et sa description. Les tags, les indicateurs et le lien
 * Figma documentent l'onglet qu'on regarde, pas la fiche en general : ils vivent sous la barre
 * d'onglets, dans `ExemplesDeLaStory`, comme chez Primer.
 */
export const EnTeteDeFiche = ({ meta }: { meta: StorybookMeta }) => (
  <Box display="flex" gap={16}>
    <PageTitle title={meta.title} />
    <MarkdownDescription taille="LG">{meta.description}</MarkdownDescription>
  </Box>
);
