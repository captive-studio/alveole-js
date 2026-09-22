import { Box, Page, Section, Tabs, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { EnTeteDeFiche } from '../components/EnTeteDeFiche';
import { Exemple, ExemplesDeLaStory } from '../components/ExemplesDeLaStory';
import { JsonBlock } from '../components/JsonBlock';
import { StoryLayout } from '../components/StoryLayout';
import { StorySummary } from '../components/StorySummary';
import { StorybookModule } from '../types';
import { getStoryExamples } from '../utils';
import { resumeDeLaFiche } from './sourcesDExemples';

export type StoryDetailScreenProps = {
  story?: StorybookModule | null;
  notFoundMessage?: string;
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

type CadreProps = Omit<StoryDetailScreenProps, 'story' | 'notFoundMessage'>;

/** L'URL peut nommer une fiche disparue : la page se charge quand meme et le dit. */
const FicheIntrouvable = ({ message, ...cadre }: { message: string } & CadreProps) => {
  const { text } = useTheme();

  return (
    <Page title="Story not found" description={message} {...cadre}>
      <Section withPaddingY>
        <Typography style={text['Corps de texte'].MD.Regular}>{message}</Typography>
      </Section>
    </Page>
  );
};

/** Les onglets de la fiche. Les props n'ont d'onglet que si la fiche en declare. */
const ongletsDeLaFiche = (meta: StorybookModule['default'], exemples: React.ReactNode) => [
  { value: 'examples', label: 'Examples', content: exemples },
  { value: 'styles', label: 'Styles', content: <JsonBlock value={meta.styleFn()} /> },
  ...(meta.props != null ? [{ value: 'props', label: 'Props', content: <JsonBlock value={meta.props} /> }] : []),
];

export const StoryDetailScreen = ({
  story,
  notFoundMessage = 'Story not found.',
  ...cadre
}: StoryDetailScreenProps) => {
  const { spacingValue } = useTheme();

  if (!story) return <FicheIntrouvable message={notFoundMessage} {...cadre} />;

  const meta = story.default;
  const exemples = getStoryExamples(story) as Exemple[];
  const gabarit = meta.tags.includes('Template');

  return (
    <Page scrollable title={meta.title} description={resumeDeLaFiche(meta)} {...cadre}>
      {/*
        La fiche declare une zone et un sommaire ; sa colonne de lecture est ce qui reste.
        C'est la construction des catalogues de reference : aucun des deux ne choisit la
        largeur de son texte. Le titre entre dans la zone avec le reste, sinon il garde le
        bord gauche de la page pendant que le corps se centre.
        `Section` n'a plus rien a border ici : son padding s'ajouterait a celui de la zone.
      */}
      <StoryLayout sommaire={exemples.length > 0 ? <StorySummary exemples={exemples.map(([nom]) => nom)} /> : null}>
        {/* Ce que la fiche annonce d'un cote, ce qu'elle montre de l'autre : les trois
            references laissent 55 a 75 px entre les deux. */}
        <Box display="flex" gap={spacingValue('6W')}>
          <EnTeteDeFiche meta={meta} />
          <Tabs
            defaultValue="examples"
            urlAnchorPrefix="story"
            tabs={ongletsDeLaFiche(meta, <ExemplesDeLaStory story={story} exemples={exemples} gabarit={gabarit} />)}
          />
        </Box>
      </StoryLayout>
    </Page>
  );
};
