import { Box, MarkdownDescription, Tag, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { StorybookMeta } from '../types';
import { getStoryFlags } from '../utils';
import { PageTitle } from './PageTitle';

/**
 * Ce que la fiche annonce : son titre, sa description, ses tags et ses indicateurs. Les lignes
 * de l'annonce se lisent d'affilee, sans separateur.
 */
export const EnTeteDeFiche = ({ meta }: { meta: StorybookMeta }) => {
  const { color, text } = useTheme();

  return (
    <Box display="flex" gap={16}>
      <PageTitle title={meta.title} />
      {/* La premiere phrase va au bout de la colonne de lecture : c'est ce que la page
          annonce, et le lien qui la suit ne doit pas lui prendre de largeur. */}
      <Box display="flex" gap={12} style={{ alignItems: 'flex-start' }}>
        <MarkdownDescription taille="LG">{meta.description}</MarkdownDescription>

        {/* Sortie laterale, pas action de la page : un lien, comme le « View in Figma » de
            Primer. Le bleu plein d'un bouton ferait passer Figma avant la lecture. */}
        {meta.figmaURL ? (
          <a href={meta.figmaURL} rel="noreferrer" style={{ textDecoration: 'none' }} target="_blank">
            <Typography
              style={{ ...text['Corps de texte'].SM.SemiBold, color: color.light.text['action-high-primary'] }}
            >
              Ouvrir Figma
            </Typography>
          </a>
        ) : null}
      </Box>

      {/* Une seule rangee : les deux familles se lisent pareil, et un libelle pose au-dessus de
          trois badges pese plus que ce qu'il explique. Le bleu d'action des tags et le gris des
          informations suffisent a les distinguer. */}
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
        {meta.tags.map(tag => (
          <Tag key={tag} color="action" size="md">
            {tag}
          </Tag>
        ))}
        {getStoryFlags(meta).map(flag => (
          <Tag key={flag.key} color="default" size="md">
            {flag.label}
          </Tag>
        ))}
      </Box>
    </Box>
  );
};
