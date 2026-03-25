import { Box, Card, Page, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { useWindowDimensions } from 'react-native';
import { JsonBlock } from '../components/JsonBlock';

interface PaletteScale {
  [key: string]: PaletteValue;
}

type PaletteValue = string | PaletteScale;

const PaletteValueView = ({ label, value }: { label?: string; value: PaletteValue }) => {
  const { text } = useTheme();

  return (
    <Box display="flex" gap={8}>
      {label ? <Typography style={text['Corps de texte'].XS.SemiBold}>{label}</Typography> : null}
      {typeof value === 'string' ? <Box height={48} width={48} borderRadius={8} backgroundColor={value} /> : null}
      <JsonBlock value={value} />
      {typeof value === 'object'
        ? Object.entries(value).map(([childLabel, childValue]) => (
            <PaletteValueView key={childLabel} label={childLabel} value={childValue} />
          ))
        : null}
    </Box>
  );
};

export type ThemePaletteScreenProps = {
  palette: Record<string, PaletteValue>;
  title?: string;
  description?: string;
  beforeContent?: React.ReactNode;
};

export const ThemePaletteScreen = ({
  palette,
  title = 'UI Kit - Theme colors',
  description = 'Theme palette',
  beforeContent,
}: ThemePaletteScreenProps) => {
  const { text } = useTheme();
  const { width } = useWindowDimensions();
  const columns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;

  return (
    <Page scrollable title={title} description={description} beforeContent={beforeContent}>
      <Section withPaddingY>
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={16}>
          {Object.entries(palette).map(([key, value]) => (
            <Box key={key} width={columns === 1 ? '100%' : columns === 2 ? '48%' : '31%'}>
              <Card>
                <Box display="flex" gap={16} p={'100'}>
                  <Typography style={text.Titres['H5 - XS']}>{key}</Typography>
                  <PaletteValueView value={value} />
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Section>
    </Page>
  );
};
