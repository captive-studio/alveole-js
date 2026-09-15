import { Box, Card, Page, PageHeader, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { TextStyle, View } from 'react-native';
import { screenContent } from '../styles';

export type ThemeTypographyScreenProps = {
  typography: Record<string, unknown>;
  title?: string;
  description?: string;
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

type StyleEntry = {
  label: string;
  style: TextStyle;
};

const isLeafStyle = (value: unknown): value is TextStyle =>
  typeof value === 'object' && value !== null && typeof (value as Record<string, unknown>).fontSize === 'number';

const flattenStyles = (value: unknown, prefix = ''): StyleEntry[] => {
  if (isLeafStyle(value)) {
    return prefix ? [{ label: prefix, style: value }] : [];
  }
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) => {
      if (typeof v !== 'object' || v === null) return [];
      const label = prefix ? `${prefix} ${k}` : k;
      return flattenStyles(v, label);
    });
  }
  return [];
};

const getFontInfo = (style: TextStyle): { family: string; weight: string } => {
  const fontFamily = (style.fontFamily as string) ?? '';
  const fontWeight = (style.fontWeight as string) ?? '';

  if (fontFamily.includes(',')) {
    const family = fontFamily.split(',')[0]?.trim() ?? '';
    const weightLabels: Record<string, string> = {
      '300': 'Light',
      '400': 'Regular',
      '500': 'Medium',
      '600': 'SemiBold',
      '700': 'Bold',
    };
    return { family, weight: weightLabels[fontWeight] ?? fontWeight };
  }

  const [family = '', weight = ''] = fontFamily.split('-');
  return { family, weight };
};

const DIVIDER_COLOR = '#E5E7EB';
const MUTED_COLOR = '#6B7280';
const PREVIEW_WIDTH = 96;

const TableHeader = ({ labelStyle }: { labelStyle: TextStyle }) => (
  <Box display="flex" gap={0}>
    <Box display="flex" flexDirection="row" style={{ paddingVertical: 8 }}>
      <Box style={{ width: PREVIEW_WIDTH }}>
        <Typography style={labelStyle}>Aperçu</Typography>
      </Box>
      <Box style={{ flex: 2 }}>
        <Typography style={labelStyle}>Nom</Typography>
      </Box>
      <Box style={{ flex: 1 }}>
        <Typography style={labelStyle}>Police</Typography>
      </Box>
      <Box style={{ flex: 1 }}>
        <Typography style={labelStyle}>Graisse</Typography>
      </Box>
      <Box style={{ flex: 1 }}>
        <Typography style={labelStyle}>Taille</Typography>
      </Box>
      <Box style={{ flex: 1 }}>
        <Typography style={labelStyle}>Hauteur</Typography>
      </Box>
    </Box>
    <View style={{ height: 1, backgroundColor: DIVIDER_COLOR }} />
  </Box>
);

const TableRow = ({ entry, valueStyle }: { entry: StyleEntry; valueStyle: TextStyle }) => {
  const { family, weight } = getFontInfo(entry.style);

  return (
    <Box display="flex" gap={0}>
      <Box display="flex" flexDirection="row" style={{ paddingVertical: 12, alignItems: 'center' }}>
        <Box style={{ width: PREVIEW_WIDTH }}>
          <Typography style={entry.style}>Aa</Typography>
        </Box>
        <Box style={{ flex: 2 }}>
          <Typography style={valueStyle}>{entry.label}</Typography>
        </Box>
        <Box style={{ flex: 1 }}>
          <Typography style={[valueStyle, { color: MUTED_COLOR }]}>{family}</Typography>
        </Box>
        <Box style={{ flex: 1 }}>
          <Typography style={[valueStyle, { color: MUTED_COLOR }]}>{weight}</Typography>
        </Box>
        <Box style={{ flex: 1 }}>
          <Typography style={[valueStyle, { color: MUTED_COLOR }]}>{entry.style.fontSize}px</Typography>
        </Box>
        <Box style={{ flex: 1 }}>
          <Typography style={[valueStyle, { color: MUTED_COLOR }]}>{entry.style.lineHeight}px</Typography>
        </Box>
      </Box>
      <View style={{ height: 1, backgroundColor: DIVIDER_COLOR }} />
    </Box>
  );
};

export const ThemeTypographyScreen = ({
  typography,
  title = 'UI Kit - Theme typography',
  description = 'Theme text styles',
  beforeContent,
  sidebar,
  footerContent,
}: ThemeTypographyScreenProps) => {
  const { text } = useTheme();

  const labelStyle = text['Corps de texte'].XS.SemiBold;
  const valueStyle = text['Corps de texte'].SM.Regular;

  const categories = Object.entries(typography).map(([key, value]) => ({
    key,
    entries: flattenStyles(value),
  }));

  return (
    <Page
      scrollable
      title={title}
      description={description}
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
    >
      <Box {...screenContent}>
        <Section withPaddingY={false}>
          <PageHeader
            title={title}
            breadcrumbsProps={{ getHref: (segment, _index, path) => (segment === 'theme' ? null : path) }}
          />
        </Section>
        <Section withPaddingY={false}>
          <Box display="flex" gap={16}>
            {categories.map(({ key, entries }) => (
              <Card key={key}>
                <Box display="flex" gap={16} p="150">
                  <Typography style={text.Titres['H4 - SM']}>{key}</Typography>
                  <Box display="flex" gap={0}>
                    <TableHeader labelStyle={labelStyle} />
                    {entries.map(entry => (
                      <TableRow key={entry.label} entry={entry} valueStyle={valueStyle} />
                    ))}
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Section>
      </Box>
    </Page>
  );
};
