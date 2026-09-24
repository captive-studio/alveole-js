import { Accordion, Box, Typography, useToast } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import { EcranDeCatalogue, filDuTheme } from '../components/EcranDeCatalogue';
import { buildGroups, type CSSVarEntry } from './variablesCSSDuTheme';

// ─── Preview components ────────────────────────────────────────────────────────

const ColorPreview = ({ value }: { value: string }) => (
  <Box
    style={{
      width: 28,
      height: 28,
      borderRadius: 6,
      backgroundColor: value,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      flexShrink: 0,
    }}
  />
);

const SpacingPreview = ({ value }: { value: string }) => {
  const px = parseInt(value, 10);
  const width = Math.min(px, 96);
  return (
    <Box
      style={{
        width,
        height: 12,
        borderRadius: 2,
        backgroundColor: '#3B82F6',
        flexShrink: 0,
        alignSelf: 'center',
      }}
    />
  );
};

const RadiusPreview = ({ value }: { value: string }) => {
  const px = Math.min(parseInt(value, 10), 14);
  return (
    <Box
      style={{
        width: 28,
        height: 28,
        borderRadius: px,
        borderWidth: 2,
        borderColor: '#3B82F6',
        flexShrink: 0,
      }}
    />
  );
};

const ElevationPreview = ({ value }: { value: string }) =>
  Platform.OS === 'web' ? (
    <Box
      style={{
        width: 28,
        height: 28,
        borderRadius: 4,
        backgroundColor: 'white',
        boxShadow: value,
        flexShrink: 0,
      }}
    />
  ) : null;

// ─── Row ──────────────────────────────────────────────────────────────────────

const VarRow = ({ entry }: { entry: CSSVarEntry }) => {
  const { color } = useTheme();
  const toast = useToast();

  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(entry.name).then(() => {
        toast.present('Copié !', entry.name, { variant: 'success', duration: 1500 });
      });
    }
  };

  return (
    <Pressable accessibilityRole="button" onPress={copy}>
      {({ pressed }) => (
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 6,
            backgroundColor: pressed ? color.light.background['transparent-hover'] : 'transparent',
          }}
        >
          {entry.preview === 'color' && <ColorPreview value={entry.rawValue} />}
          {entry.preview === 'spacing' && <SpacingPreview value={entry.rawValue} />}
          {entry.preview === 'radius' && <RadiusPreview value={entry.rawValue} />}
          {entry.preview === 'elevation' && <ElevationPreview value={entry.rawValue} />}
          {entry.preview === 'none' && <Box style={{ width: 28 }} />}

          <Box style={{ flex: 1, gap: 1 }}>
            <Typography
              style={{
                fontSize: 12,
                fontFamily: 'monospace',
                color: color.light.text['title-grey'],
                lineHeight: 16,
              }}
              numberOfLines={1}
            >
              {entry.name}
            </Typography>
            <Typography
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                color: color.light.text['mention-grey'],
                lineHeight: 14,
              }}
              numberOfLines={1}
            >
              {entry.rawValue}
            </Typography>
          </Box>

          <Typography style={{ fontSize: 11, color: color.light.text['mention-grey'] }}>{'⎘'}</Typography>
        </Box>
      )}
    </Pressable>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export type ThemeCSSVariablesScreenProps = {
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

const COLLAPSED_BY_DEFAULT = ['Typographies', 'Fonts', 'Couleurs palette'];

export const ThemeCSSVariablesScreen = ({ beforeContent, sidebar, footerContent }: ThemeCSSVariablesScreenProps) => {
  const { color } = useTheme();
  const groups = React.useMemo(() => buildGroups(), []);
  const total = groups.reduce((sum, g) => sum + g.vars.length, 0);

  const initialOpen = React.useMemo(
    () => groups.filter(g => !COLLAPSED_BY_DEFAULT.some(prefix => g.title.startsWith(prefix))).map(g => g.title),
    [groups],
  );
  const [openGroups, setOpenGroups] = React.useState<string[]>(initialOpen);

  return (
    <EcranDeCatalogue
      title="Variables CSS"
      description="Toutes les variables CSS injectées par le ThemeProvider"
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
      breadcrumbsProps={filDuTheme}
    >
      <Typography style={{ fontSize: 14, color: color.light.text['mention-grey'], marginBottom: 8 }}>
        {`${total} variables injectées dans `}
        <Typography style={{ fontSize: 14, fontFamily: 'monospace', color: color.light.text['default-grey'] }}>
          {':root'}
        </Typography>
        {' par le ThemeProvider sur web. Cliquez sur une ligne pour copier le nom de la variable.'}
      </Typography>
      <Typography
        style={{ fontSize: 13, color: color.light.text['mention-grey'], marginBottom: 24, fontFamily: 'monospace' }}
      >
        {'color: var(--background-action-high-primary);'}
      </Typography>
      <Accordion type="multiple" value={openGroups} onValueChange={setOpenGroups}>
        {groups.map(g => (
          <Accordion.Item
            key={g.title}
            value={g.title}
            label={g.title}
            variant="alt"
            labelChildren={
              <Typography style={{ fontSize: 11, color: color.light.text['mention-grey'] }}>
                {`${g.vars.length} var${g.vars.length > 1 ? 's' : ''}`}
              </Typography>
            }
            noPadding
          >
            {g.vars.map(v => (
              <VarRow key={v.name} entry={v} />
            ))}
          </Accordion.Item>
        ))}
      </Accordion>
    </EcranDeCatalogue>
  );
};
