import { A, Badge, Box, Card, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { StorybookModule } from '../types';
import { getStoryFlags, stripMarkdown } from '../utils';
import { hauteurDeCarte } from './hauteurDeCarte';

export type StoryCardProps = {
  story: StorybookModule;
  href: string;
};

export const StoryCard = ({ story, href }: StoryCardProps) => {
  const { text, isVariant } = useTheme();
  const meta = story.default;
  const flags = getStoryFlags(meta);
  const height = hauteurDeCarte(isVariant('mobile'));

  const description = meta.shortDescription ?? stripMarkdown(meta.description);

  return (
    <A href={href} style={{ height }}>
      <Card height={height}>
        <Box display="flex" gap={12} p={'100'} style={{ height }}>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
            {meta.tags.map(tag => (
              <Badge key={tag} variant="info" size="sm" style={{ marginRight: 0 }}>
                {tag}
              </Badge>
            ))}
            {flags.map(flag => (
              <Badge key={flag.key} variant="default" size="sm" style={{ marginRight: 0 }}>
                {flag.label}
              </Badge>
            ))}
          </Box>
          <Typography style={text.Titres['H5 - XS']}>{meta.title}</Typography>
          <Typography style={text['Corps de texte'].SM.Regular}>{description}</Typography>
        </Box>
      </Card>
    </A>
  );
};
