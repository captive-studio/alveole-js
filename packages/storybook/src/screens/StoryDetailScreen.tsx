import { Box, Button, Page, Section, Tabs, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { Linking } from 'react-native';
import { JsonBlock } from '../components/JsonBlock';
import { StorybookModule } from '../types';
import { getStoryExamples, getStoryFlags } from '../utils';

export type StoryDetailScreenProps = {
  story?: StorybookModule | null;
  notFoundMessage?: string;
  beforeContent?: React.ReactNode;
};

type DetailPillProps = {
  label: string;
  tone?: 'tag' | 'info';
};

const DetailPill = ({ label, tone = 'info' }: DetailPillProps) => {
  const { color, radius, text, spacing } = useTheme();

  return (
    <Box
      borderColor={tone === 'tag' ? color.light.border['action-low-primary'] : color.light.border['default-grey']}
      borderRadius={radius('full')}
      borderWidth={1}
      style={{
        backgroundColor:
          tone === 'tag' ? color.light.background['contrast-info'] : color.light.background['default-grey'],
        paddingLeft: spacing('1W'),
        paddingRight: spacing('1W'),
        paddingTop: spacing('0,5V'),
        paddingBottom: spacing('0,5V'),
      }}
    >
      <Typography
        style={[
          text['Corps de texte'].XS.CapsBold,
          {
            color: tone === 'tag' ? color.light.text['default-info'] : color.light.text['default-grey'],
          },
        ]}
      >
        {label}
      </Typography>
    </Box>
  );
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

export const StoryDetailScreen = ({
  story,
  notFoundMessage = 'Story not found.',
  beforeContent,
}: StoryDetailScreenProps) => {
  const { text, color, radius } = useTheme();

  if (!story) {
    return (
      <Page title="Story not found" description={notFoundMessage} beforeContent={beforeContent}>
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
    <Box display="flex" gap={24} mt={'1,5V'}>
      {examples.map(([key, Example]) => (
        <Box
          key={key}
          borderColor={color.light.border['default-grey']}
          borderRadius={radius('lg')}
          borderWidth={1}
          display="flex"
          gap={16}
          p={'150'}
          style={{ backgroundColor: color.light.background['alt-grey'] }}
        >
          {!isTemplate ? (
            <Box display="flex" gap={6}>
              <Typography style={text.Titres['H5 - XS']}>{key}</Typography>
            </Box>
          ) : null}

          <Box
            borderColor={color.light.border['default-grey']}
            borderWidth={1}
            borderRadius={radius('md')}
            p={'100'}
            style={{
              backgroundColor: color.light.background['default-grey'],
              minHeight: isTemplate ? 420 : undefined,
            }}
          >
            <Example />
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Page scrollable title={meta.title} description={meta.description} beforeContent={beforeContent}>
      <Section withPaddingY>
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
                <Typography style={text.Titres['H3 - MD']}>{meta.title}</Typography>
                <Typography style={text['Corps de texte'].MD.Regular}>{meta.description}</Typography>
              </Box>

              {meta.figmaURL ? (
                <Button title="Ouvrir Figma" variant="primary" onPress={() => Linking.openURL(meta.figmaURL!)} />
              ) : null}
            </Box>

            <Box display="flex" gap={10}>
              <Typography style={text['Corps de texte'].XS.CapsBold}>Tags</Typography>
              <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
                {meta.tags.map(tag => (
                  <DetailPill key={tag} label={tag} tone="tag" />
                ))}
              </Box>
            </Box>

            {flags.length > 0 ? (
              <Box display="flex" gap={10}>
                <Typography style={text['Corps de texte'].XS.CapsBold}>Informations</Typography>
                <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
                  {flags.map(flag => (
                    <DetailPill key={flag.key} label={flag.label} />
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
