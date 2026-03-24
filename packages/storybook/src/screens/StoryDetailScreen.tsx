import { Box, Button, Divider, Page, Section, Tabs, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { Linking } from 'react-native';
import { JsonBlock } from '../components/JsonBlock';
import { StorybookModule } from '../types';
import { getStoryExamples, getStoryFlags } from '../utils';

export type StoryDetailScreenProps = {
  story?: StorybookModule | null;
  notFoundMessage?: string;
};

export const StoryDetailScreen = ({ story, notFoundMessage = 'Story not found.' }: StoryDetailScreenProps) => {
  const { text } = useTheme();

  if (!story) {
    return (
      <Page title="Story not found" description={notFoundMessage}>
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
    <Box display="flex" gap={16}>
      {examples.map(([key, Example]) => (
        <Box key={key} display="flex" gap={12}>
          {!isTemplate ? <Typography style={text['Corps de texte'].SM.SemiBold}>{key}</Typography> : null}
          <Box
            borderColor={'#e8e8e8'}
            borderWidth={1}
            borderRadius={8}
            p={'100'}
            style={isTemplate ? { minHeight: 400 } : undefined}
          >
            <Example />
          </Box>
          <Divider />
        </Box>
      ))}
    </Box>
  );

  return (
    <Page scrollable title={meta.title} description={meta.description}>
      <Section withPaddingY>
        <Box display="flex" gap={16}>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
            {meta.tags.map(tag => (
              <Typography key={tag} style={text['Corps de texte'].XS.SemiBold}>
                {tag}
              </Typography>
            ))}
            {flags.map(flag => (
              <Typography key={flag.key} style={text['Corps de texte'].XS.Regular}>
                {flag.label}
              </Typography>
            ))}
          </Box>

          {meta.figmaURL ? (
            <Box style={{ alignItems: 'flex-start' }}>
              <Button title="Open Figma" variant="primary" onPress={() => Linking.openURL(meta.figmaURL!)} />
            </Box>
          ) : null}

          <Tabs
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
    </Page>
  );
};
