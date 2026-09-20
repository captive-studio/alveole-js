import { AnchorHeading, Box, MarkdownDescription, Tag, Typography } from '@alveole/components';
import { FOCUS_ATTRIBUTE, useTheme } from '@alveole/theme';
import { descriptionDeLExemple, sourceDeLExemple } from '../screens/sourcesDExemples';
import { StorybookMeta, StorybookModule } from '../types';
import { getStoryFlags } from '../utils';
import { ExampleBlock } from './ExampleBlock';

export type Exemple = [nom: string, Rendu: () => React.ReactNode];

type UnExempleProps = { story: StorybookModule; nom: string; Rendu: Exemple[1]; gabarit: boolean };

/**
 * Une demonstration. Le titre et la description appartiennent au document : ils restent dans le
 * flux de la page, hors de tout cadre, pour pouvoir etre ancres et repris dans un sommaire. Le
 * cadre n'entoure que ce qui est montre.
 */
const UnExemple = ({ story, nom, Rendu, gabarit }: UnExempleProps) => {
  const { text } = useTheme();
  const description = descriptionDeLExemple(story, nom);

  return (
    <Box display="flex" gap={12}>
      {!gabarit ? (
        <Box display="flex" gap={6}>
          <AnchorHeading style={text.Titres['H5 - XS']}>{nom}</AnchorHeading>
          {description ? <MarkdownDescription>{description}</MarkdownDescription> : null}
        </Box>
      ) : null}

      <ExampleBlock source={sourceDeLExemple(story, nom)} pleinEcran={gabarit}>
        <Rendu />
      </ExampleBlock>
    </Box>
  );
};

/**
 * Les tags et le lien Figma : ils documentent l'onglet Examples qu'on regarde, pas la fiche en
 * general, et vivent sous la barre d'onglets comme chez Primer plutot qu'au-dessus, dans un
 * en-tete commun a tous les onglets.
 */
const StatutDeLaFiche = ({ meta }: { meta: StorybookMeta }) => {
  const { color, text } = useTheme();

  return (
    <Box display="flex" flexDirection="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
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

      {meta.figmaURL ? (
        <a
          href={meta.figmaURL}
          rel="noreferrer"
          style={{ textDecoration: 'none' }}
          target="_blank"
          {...{ [FOCUS_ATTRIBUTE]: 'ring' }}
        >
          <Typography style={{ ...text['Corps de texte'].SM.Bold, color: color.light.text['action-high-primary'] }}>
            Ouvrir Figma
          </Typography>
        </a>
      ) : null}
    </Box>
  );
};

export type ExemplesDeLaStoryProps = {
  story: StorybookModule;
  exemples: Exemple[];
  /** Un gabarit se montre seul, en pleine page : ni titre ni description au-dessus du cadre. */
  gabarit: boolean;
};

/** Les demonstrations d'une fiche, les unes sous les autres, sous le statut de la fiche. */
export const ExemplesDeLaStory = ({ story, exemples, gabarit }: ExemplesDeLaStoryProps) => (
  // Le premier exemple se detache de la barre d'onglets comme les exemples se detachent
  // entre eux : a 6 px son titre se lisait comme le libelle de l'onglet actif.
  <Box display="flex" gap={40} mt={'5W'}>
    <StatutDeLaFiche meta={story.default} />

    {exemples.map(([nom, Rendu]) => (
      <UnExemple key={nom} story={story} nom={nom} Rendu={Rendu} gabarit={gabarit} />
    ))}
  </Box>
);
