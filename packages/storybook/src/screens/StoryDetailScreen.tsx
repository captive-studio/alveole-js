import { AnchorHeading, Box, MarkdownDescription, Page, Section, Tabs, Tag, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { ExampleBlock } from '../components/ExampleBlock';
import { JsonBlock } from '../components/JsonBlock';
import { PageTitle } from '../components/PageTitle';
import { StoryLayout } from '../components/StoryLayout';
import { StorySummary } from '../components/StorySummary';
import { StorybookModule } from '../types';
import { getStoryExamples, getStoryFlags, stripMarkdown } from '../utils';

export type StoryDetailScreenProps = {
  story?: StorybookModule | null;
  notFoundMessage?: string;
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

type StorySourceValue = string | (() => string);

type StorySourcesExport = {
  storySources?: Record<string, StorySourceValue>;
  storyDescriptions?: Record<string, string>;
} & Record<string, unknown>;

const getSources = (story: StorybookModule): StorySourcesExport | undefined =>
  (story as unknown as { Sources?: StorySourcesExport }).Sources;

const getStoryExampleSource = (story: StorybookModule, exampleName: string): string | null => {
  const sources = getSources(story);
  const source = sources?.storySources?.[exampleName] ?? sources?.[exampleName];

  if (typeof source === 'string') return source;
  if (typeof source === 'function') {
    const value = source();
    return typeof value === 'string' ? value : null;
  }

  return null;
};

const getStoryExampleDescription = (story: StorybookModule, exampleName: string): string | null => {
  const description = getSources(story)?.storyDescriptions?.[exampleName];
  return typeof description === 'string' ? description : null;
};

export const StoryDetailScreen = ({
  story,
  notFoundMessage = 'Story not found.',
  beforeContent,
  sidebar,
  footerContent,
}: StoryDetailScreenProps) => {
  const { color, spacingValue, text } = useTheme();

  if (!story) {
    return (
      <Page
        title="Story not found"
        description={notFoundMessage}
        sidebar={sidebar}
        beforeContent={beforeContent}
        footerContent={footerContent}
      >
        <Section withPaddingY>
          <Typography style={text['Corps de texte'].MD.Regular}>{notFoundMessage}</Typography>
        </Section>
      </Page>
    );
  }

  const meta = story.default;
  const flags = getStoryFlags(meta);
  const examples = getStoryExamples(story);
  const isTemplate = meta.tags.includes('Template');

  const examplesContent = (
    <Box display="flex" gap={40} mt={'1,5V'}>
      {examples.map(([key, Example]) => {
        const source = getStoryExampleSource(story, key);
        const description = getStoryExampleDescription(story, key);

        // Le titre et la description appartiennent au document : ils restent dans le flux de
        // la page, hors de tout cadre, pour pouvoir être ancrés et repris dans un sommaire.
        // Le cadre n'entoure que ce qui est démontré.
        return (
          <Box key={key} display="flex" gap={12}>
            {!isTemplate ? (
              <Box display="flex" gap={6}>
                <AnchorHeading style={text.Titres['H5 - XS']}>{key}</AnchorHeading>
                {description ? <MarkdownDescription>{description}</MarkdownDescription> : null}
              </Box>
            ) : null}

            <ExampleBlock source={source} pleinEcran={isTemplate}>
              <Example />
            </ExampleBlock>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Page
      scrollable
      title={meta.title}
      description={meta.shortDescription ?? stripMarkdown(meta.description)}
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
    >
      {/*
        La fiche declare une zone et un sommaire ; sa colonne de lecture est ce qui reste.
        C'est la construction des catalogues de reference : aucun des deux ne choisit la
        largeur de son texte. Le titre entre dans la zone avec le reste, sinon il garde le
        bord gauche de la page pendant que le corps se centre.
        `Section` n'a plus rien a border ici : son padding s'ajouterait a celui de la zone.
      */}
      <StoryLayout sommaire={examples.length > 0 ? <StorySummary exemples={examples.map(([key]) => key)} /> : null}>
        {/* Ce que la fiche annonce d'un cote, ce qu'elle montre de l'autre : les trois
            references laissent 55 a 75 px entre les deux, et rien ne separe les lignes de
            l'annonce, qui se lisent d'affilee. */}
        <Box display="flex" gap={spacingValue('6W')}>
          <Box display="flex" gap={16}>
            <PageTitle title={meta.title} />
            <Box
              display="flex"
              gap={12}
              style={{
                alignItems: 'flex-start',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Box display="flex" style={{ flex: 1 }}>
                <MarkdownDescription>{meta.description}</MarkdownDescription>
              </Box>

              {/* Sortie laterale, pas action de la page : un lien, comme le « View in Figma »
                  de Primer. Le bleu plein d'un bouton ferait passer Figma avant la lecture. */}
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

            {/* Une seule rangee : les deux familles se lisent pareil, et un libelle pose
                au-dessus de trois badges pese plus que ce qu'il explique. Le bleu d'action
                des tags et le gris des informations suffisent a les distinguer. */}
            <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
              {meta.tags.map(tag => (
                <Tag key={tag} color="action" size="md">
                  {tag}
                </Tag>
              ))}
              {flags.map(flag => (
                <Tag key={flag.key} color="default" size="md">
                  {flag.label}
                </Tag>
              ))}
            </Box>
          </Box>

          <Tabs
            defaultValue="examples"
            tabs={[
              {
                value: 'examples',
                label: 'Examples',
                content: examplesContent,
              },
              {
                value: 'styles',
                label: 'Styles',
                content: <JsonBlock value={meta.styleFn()} />,
              },
              ...(meta.props != null
                ? [
                    {
                      value: 'props',
                      label: 'Props',
                      content: <JsonBlock value={meta.props} />,
                    },
                  ]
                : []),
            ]}
          />
        </Box>
      </StoryLayout>
    </Page>
  );
};
