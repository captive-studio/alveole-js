import { Accordion, Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { ColorSwatch } from '../components/ColorSwatch';
import { EcranDeCatalogue, filDuTheme } from '../components/EcranDeCatalogue';
import { buildSections, ColorSection, compteDeJetons, sectionsOuvertesAuDepart } from './paletteSections';

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
          {compteDeJetons(section)}
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
  const { color } = useTheme();
  const sections = React.useMemo(() => buildSections(palette), [palette]);

  const [openSections, setOpenSections] = React.useState(() => sectionsOuvertesAuDepart(sections));

  return (
    <EcranDeCatalogue
      title={title}
      description={description}
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
      breadcrumbsProps={filDuTheme}
    >
      <Typography style={{ fontSize: 14, color: color.light.text['mention-grey'], marginBottom: 24 }}>
        {'Cliquez sur un swatch pour copier sa valeur dans le presse-papiers.'}
      </Typography>
      <Accordion type="multiple" value={openSections} onValueChange={setOpenSections}>
        {sections.map(section => (
          <SectionDeCouleurs key={section.title} section={section} />
        ))}
      </Accordion>
    </EcranDeCatalogue>
  );
};
