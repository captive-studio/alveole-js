import { Accordion, Box, Page, PageHeader, Typography, useToast } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable } from 'react-native';
import { ScreenZone } from '../components/ScreenZone';

type ColorEntry = { path: string; value: string };
type ColorSection = { title: string; entries: ColorEntry[]; deprecated?: boolean };

function flattenColors(obj: Record<string, unknown>, prefix = ''): ColorEntry[] {
  const entries: ColorEntry[] = [];
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') {
      entries.push({ path, value: val });
    } else if (val && typeof val === 'object') {
      entries.push(...flattenColors(val as Record<string, unknown>, path));
    }
  }
  return entries;
}

const DEPRECATED_KEYS = [
  'primary',
  'transparent',
  'danger',
  'info',
  'success',
  'warning',
  'link',
  'text',
  'border',
  'background',
  'system',
];

function buildSections(palette: Record<string, unknown>): ColorSection[] {
  const sections: ColorSection[] = [];

  for (const [modeKey, modeVal] of Object.entries(palette)) {
    if (modeKey === 'light') {
      if (modeVal && typeof modeVal === 'object') {
        for (const [groupKey, groupVal] of Object.entries(modeVal as Record<string, unknown>)) {
          const entries = flattenColors({ [groupKey]: groupVal }, modeKey);
          if (entries.length > 0) {
            sections.push({ title: `${modeKey} / ${groupKey}`, entries });
          }
        }
      }
    }
  }

  const deprecatedEntries: ColorEntry[] = [];
  for (const key of DEPRECATED_KEYS) {
    const val = palette[key];
    if (val !== undefined) {
      if (typeof val === 'string') {
        deprecatedEntries.push({ path: key, value: val });
      } else if (val && typeof val === 'object') {
        deprecatedEntries.push(...flattenColors(val as Record<string, unknown>, key));
      }
    }
  }
  if (deprecatedEntries.length > 0) {
    sections.push({ title: 'Deprecated', entries: deprecatedEntries, deprecated: true });
  }

  return sections;
}

const ColorSwatch = ({ entry }: { entry: ColorEntry }) => {
  const toast = useToast();
  const { color, radius } = useTheme();
  const tokenName = entry.path.split('.').pop() ?? entry.path;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(entry.value).then(() => {
        toast.present('Copié !', entry.value, { variant: 'success', duration: 1500 });
      });
    }
  };

  return (
    <Pressable accessibilityRole="button" onPress={handleCopy} style={{ width: 120, marginBottom: 8 }}>
      {({ pressed }) => (
        <Box
          style={{
            borderRadius: radius('md'),
            overflow: 'hidden',
            opacity: pressed ? 0.8 : 1,
            borderWidth: 1,
            borderColor: color.light.border['default-grey'],
          }}
        >
          <Box style={{ height: 56, backgroundColor: entry.value }} />
          <Box
            style={{
              paddingHorizontal: 8,
              paddingVertical: 6,
              backgroundColor: color.light.background['default-grey'],
            }}
          >
            <Typography
              style={{ fontSize: 11, fontWeight: '600', color: color.light.text['title-grey'], lineHeight: 14 }}
              numberOfLines={1}
            >
              {tokenName}
            </Typography>
            <Typography
              style={{
                fontSize: 10,
                color: color.light.text['mention-grey'],
                fontFamily: 'monospace',
                lineHeight: 14,
                marginTop: 2,
              }}
              numberOfLines={1}
            >
              {entry.value}
            </Typography>
          </Box>
        </Box>
      )}
    </Pressable>
  );
};

export type ThemePaletteScreenProps = {
  palette: Record<string, unknown>;
  title?: string;
  description?: string;
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

export const ThemePaletteScreen = ({
  palette,
  title = 'UI Kit - Couleurs du thème',
  description = 'Palette et couleurs du thème',
  beforeContent,
  sidebar,
  footerContent,
}: ThemePaletteScreenProps) => {
  const { grilles, color } = useTheme();
  const sections = React.useMemo(() => buildSections(palette), [palette]);

  const initialOpen = React.useMemo(() => sections.filter(s => !s.deprecated).map(s => s.title), [sections]);
  const [openSections, setOpenSections] = React.useState<string[]>(initialOpen);

  return (
    <Page
      scrollable
      title={title}
      description={description}
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
    >
      <ScreenZone largeur={grilles['12 colonnes']}>
        <PageHeader
          title={title}
          breadcrumbsProps={{ getHref: (segment, _index, path) => (segment === 'theme' ? null : path) }}
        />
        <Typography style={{ fontSize: 14, color: color.light.text['mention-grey'], marginBottom: 24 }}>
          {'Cliquez sur un swatch pour copier sa valeur dans le presse-papiers.'}
        </Typography>
        <Accordion type="multiple" value={openSections} onValueChange={setOpenSections}>
          {sections.map(section => (
            <Accordion.Item
              key={section.title}
              value={section.title}
              label={section.title}
              variant="alt"
              labelChildren={
                <Typography style={{ fontSize: 11, color: color.light.text['mention-grey'] }}>
                  {`${section.entries.length} token${section.entries.length > 1 ? 's' : ''}`}
                </Typography>
              }
              noPadding
            >
              <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 8 }}>
                {section.entries.map(entry => (
                  <ColorSwatch key={entry.path} entry={entry} />
                ))}
              </Box>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScreenZone>
    </Page>
  );
};
