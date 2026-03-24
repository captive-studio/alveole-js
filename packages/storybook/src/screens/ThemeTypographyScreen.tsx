import { Box, Card, Page, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { useWindowDimensions } from 'react-native';
import { JsonBlock } from '../components/JsonBlock';

export type ThemeTypographyScreenProps = {
  typography: Record<string, unknown>;
  title?: string;
  description?: string;
};

export const ThemeTypographyScreen = ({
  typography,
  title = 'UI Kit - Theme typography',
  description = 'Theme text styles',
}: ThemeTypographyScreenProps) => {
  const { text } = useTheme();
  const { width } = useWindowDimensions();
  const columns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;

  return (
    <Page scrollable title={title} description={description}>
      <Section withPaddingY>
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={16}>
          {Object.entries(typography).map(([key, value]) => (
            <Box key={key} width={columns === 1 ? '100%' : columns === 2 ? '48%' : '31%'}>
              <Card>
                <Card.Section display="flex" gap={16} p={'100'}>
                  <Typography style={text.Titres['H5 - XS']}>{key}</Typography>
                  {typeof value === 'object' && value != null ? (
                    Object.entries(value).map(([subKey, subValue]) => (
                      <Box key={subKey} display="flex" gap={8}>
                        <Typography style={text['Corps de texte'].XS.SemiBold}>{subKey}</Typography>
                        <JsonBlock value={subValue} />
                      </Box>
                    ))
                  ) : (
                    <JsonBlock value={value} />
                  )}
                </Card.Section>
              </Card>
            </Box>
          ))}
        </Box>
      </Section>
    </Page>
  );
};
