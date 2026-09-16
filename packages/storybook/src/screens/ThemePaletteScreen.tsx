import { Accordion, Box, Page, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { ColorSwatch } from '../components/ColorSwatch';
import { PageTitle } from '../components/PageTitle';
import { ScreenZone } from '../components/ScreenZone';
import { buildSections, ColorSection } from './paletteSections';

export type ThemePaletteScreenProps = {
  palette: Record<string, unknown>;
  title?: string;
  description?: string;
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

/** Une famille de couleurs, depliable, avec le nombre de jetons qu'elle contient. */
const SectionDeCouleurs = ({ section }: { section: ColorSection }) => {
  const { color } = useTheme();

  return (
    <Accordion.Item
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
  );
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

  // Les familles s'ouvrent, l'historique reste replie : c'est ce qui reste a migrer, pas ce
  // qu'on vient consulter.
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
        <PageTitle
          title={title}
          breadcrumbsProps={{ getHref: (segment, _index, path) => (segment === 'theme' ? null : path) }}
        />
        <Typography style={{ fontSize: 14, color: color.light.text['mention-grey'], marginBottom: 24 }}>
          {'Cliquez sur un swatch pour copier sa valeur dans le presse-papiers.'}
        </Typography>
        <Accordion type="multiple" value={openSections} onValueChange={setOpenSections}>
          {sections.map(section => (
            <SectionDeCouleurs key={section.title} section={section} />
          ))}
        </Accordion>
      </ScreenZone>
    </Page>
  );
};
