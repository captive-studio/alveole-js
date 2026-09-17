import { AnchorHeading, Box, MarkdownDescription } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { descriptionDeLExemple, sourceDeLExemple } from '../screens/sourcesDExemples';
import { StorybookModule } from '../types';
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

export type ExemplesDeLaStoryProps = {
  story: StorybookModule;
  exemples: Exemple[];
  /** Un gabarit se montre seul, en pleine page : ni titre ni description au-dessus du cadre. */
  gabarit: boolean;
};

/** Les demonstrations d'une fiche, les unes sous les autres. */
export const ExemplesDeLaStory = ({ story, exemples, gabarit }: ExemplesDeLaStoryProps) => (
  // Le premier exemple se detache de la barre d'onglets comme les exemples se detachent
  // entre eux : a 6 px son titre se lisait comme le libelle de l'onglet actif.
  <Box display="flex" gap={40} mt={'5W'}>
    {exemples.map(([nom, Rendu]) => (
      <UnExemple key={nom} story={story} nom={nom} Rendu={Rendu} gabarit={gabarit} />
    ))}
  </Box>
);
