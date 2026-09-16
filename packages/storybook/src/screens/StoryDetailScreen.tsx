import {
  AnchorHeading,
  Box,
  Button,
  MarkdownDescription,
  Page,
  PageHeader,
  Section,
  Tag,
  Typography,
} from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Linking, ScrollView } from 'react-native';
import { ExampleBlock } from '../components/ExampleBlock';
import { JsonBlock } from '../components/JsonBlock';
import { screenContent } from '../styles';
import { StorybookModule } from '../types';
import { getStoryExamples, getStoryFlags, stripMarkdown } from '../utils';

export type StoryDetailScreenProps = {
  story?: StorybookModule | null;
  notFoundMessage?: string;
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

type MetaCardProps = {
  label: string;
  value: string;
};

const MetaCard = ({ label, value }: MetaCardProps) => {
  const { color, radius, text } = useTheme();

  return (
    <Box
      borderColor={color.light.border['default-grey']}
      borderRadius={radius('md')}
      borderWidth={1}
      display="flex"
      gap={4}
      p={'100'}
      style={{ backgroundColor: color.light.background['alt-grey'], minWidth: 160 }}
    >
      <Typography style={text['Corps de texte'].XS.CapsBold}>{label}</Typography>
      <Typography style={text['Corps de texte'].SM.SemiBold}>{value}</Typography>
    </Box>
  );
};

type DetailTab = {
  value: string;
  label: string;
  content: React.ReactNode;
  scrollable?: boolean;
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

type DetailTabsProps = {
  tabs: DetailTab[];
  defaultValue?: string;
};

const DetailTabs = ({ tabs, defaultValue }: DetailTabsProps) => {
  const initialValue = defaultValue || tabs[0]?.value || '';
  const [activeValue, setActiveValue] = React.useState(initialValue);
  const activeTab = tabs.find(tab => tab.value === activeValue) ?? tabs[0];

  return (
    <Box display="flex" gap={16}>
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
        {tabs.map(tab => (
          <Button
            key={tab.value}
            title={tab.label}
            size="sm"
            variant="tertiary"
            selected={tab.value === activeTab?.value}
            onPress={() => setActiveValue(tab.value)}
          />
        ))}
      </Box>

      {activeTab?.scrollable ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
        >
          {activeTab.content}
        </ScrollView>
      ) : (
        activeTab?.content
      )}
    </Box>
  );
};

export const StoryDetailScreen = ({
  story,
  notFoundMessage = 'Story not found.',
  beforeContent,
  sidebar,
  footerContent,
}: StoryDetailScreenProps) => {
  const { text, color, radius } = useTheme();

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
      <Box {...screenContent}>
        <Section withPaddingY={false}>
          <PageHeader title={meta.title} />
        </Section>
        <Section withPaddingY={false}>
          <Box display="flex" gap={20}>
            <Box
              borderColor={color.light.border['default-grey']}
              borderRadius={radius('lg')}
              borderWidth={1}
              display="flex"
              gap={16}
              p={'150'}
              style={{ backgroundColor: color.light.background['alt-grey'] }}
            >
              <Box
                display="flex"
                gap={12}
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Box display="flex" gap={6} style={{ flex: 1 }}>
                  <MarkdownDescription>{meta.description}</MarkdownDescription>
                </Box>

                {meta.figmaURL ? (
                  <Button title="Ouvrir Figma" variant="primary" onPress={() => Linking.openURL(meta.figmaURL!)} />
                ) : null}
              </Box>

              <Box display="flex" gap={10}>
                <Typography style={text['Corps de texte'].XS.CapsBold}>Tags</Typography>
                <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
                  {meta.tags.map(tag => (
                    <Tag key={tag} color="action" size="md">
                      {tag}
                    </Tag>
                  ))}
                </Box>
              </Box>

              {flags.length > 0 ? (
                <Box display="flex" gap={10}>
                  <Typography style={text['Corps de texte'].XS.CapsBold}>Informations</Typography>
                  <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
                    {flags.map(flag => (
                      <Tag key={flag.key} color="default" size="md">
                        {flag.label}
                      </Tag>
                    ))}
                  </Box>
                </Box>
              ) : null}

              <Box display="flex" flexDirection="row" flexWrap="wrap" gap={12}>
                <MetaCard label="Exemples" value={String(examples.length)} />
                <MetaCard label="Styles" value="Disponibles" />
                {meta.props != null ? <MetaCard label="Props" value="Documentées" /> : null}
              </Box>
            </Box>

            <DetailTabs
              defaultValue="examples"
              tabs={[
                {
                  value: 'examples',
                  label: 'Examples',
                  content: examplesContent,
                  scrollable: true,
                },
                {
                  value: 'styles',
                  label: 'Styles',
                  content: <JsonBlock value={meta.styleFn()} />,
                  scrollable: true,
                },
                ...(meta.props != null
                  ? [
                      {
                        value: 'props',
                        label: 'Props',
                        content: <JsonBlock value={meta.props} />,
                        scrollable: true,
                      },
                    ]
                  : []),
              ]}
            />
          </Box>
        </Section>
      </Box>
    </Page>
  );
};
