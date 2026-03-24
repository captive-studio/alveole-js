import { Badge, Box, Card, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { Pressable } from 'react-native';
import { StorybookModule } from '../types';
import { getStoryFlags } from '../utils';

export type StoryCardProps = {
  story: StorybookModule;
  onPress?: (story: StorybookModule) => void;
};

export const StoryCard = ({ story, onPress }: StoryCardProps) => {
  const { text } = useTheme();
  const meta = story.default;
  const flags = getStoryFlags(meta);

  return (
    <Pressable onPress={onPress ? () => onPress(story) : undefined}>
      <Card height={'100%'}>
        <Card.Section display="flex" gap={12} p={'100'}>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
            {meta.tags.map(tag => (
              <Badge key={tag} variant="info" size="sm">
                {tag}
              </Badge>
            ))}
            {flags.map(flag => (
              <Badge key={flag.key} variant="default" size="sm">
                {flag.label}
              </Badge>
            ))}
          </Box>
          <Typography style={text.Titres['H5 - XS']}>{meta.title}</Typography>
          <Typography style={text['Corps de texte'].SM.Regular}>{meta.description}</Typography>
        </Card.Section>
      </Card>
    </Pressable>
  );
};
