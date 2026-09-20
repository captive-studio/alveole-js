import { format } from 'date-fns/format';
import { enUS } from 'date-fns/locale/en-US';
import { fr } from 'date-fns/locale/fr';
import React from 'react';
import { ScrollView } from 'react-native';
import { Box, BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { Grid } from '../Grid';
import { useStyles } from './FilterDate.styles';

export type FilterDateValue = { years: number[]; months: number[] };

export type FilterDateProps = BoxProps & {
  title: string;
  local?: 'fr' | 'en';
  /** Année de départ */
  from: number | 'today';
  /** Année de fin */
  to: number | 'today';
  value: FilterDateValue;
  onChange?: (value: FilterDateValue, stringValues: `${string}-${string}`[]) => void;
};

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const monthsFr = Array.from({ length: 12 }, (_, month) => ({
  label: capitalize(format(new Date(2026, month, 1), 'MMMM', { locale: fr })),
  value: month + 1,
  toString: format(new Date(2026, month, 1), 'MM'),
}));

const monthsEn = Array.from({ length: 12 }, (_, month) => ({
  label: capitalize(format(new Date(2026, month, 1), 'MMMM', { locale: enUS })),
  value: month + 1,
  toString: format(new Date(2026, month, 1), 'MM'),
}));

export const filerDateValueToDates = (
  values: FilterDateValue,
  from: FilterDateProps['from'],
  to: FilterDateProps['to'],
): `${string}-${string}`[] => {
  if (values.months.length === 0 && values.years.length === 0) return [];

  const fromYear = from === 'today' ? new Date().getFullYear() : from;
  const toYear = to === 'today' ? new Date().getFullYear() : to;

  const yearsOnly = values.months.length === 0 && values.years.length > 0;
  const monthsOnly = values.months.length > 0 && values.years.length === 0;
  const yearsList = Array.from({ length: toYear - fromYear + 1 }, (_, i) => fromYear + i);

  if (yearsOnly) return values.years.flatMap(y => monthsFr.map(m => `${y}-${m.toString}` as const));
  if (monthsOnly)
    return values.months.flatMap(m => yearsList.map(y => `${y}-${format(new Date(2026, m - 1, 1), 'MM')}` as const));

  return values.years.flatMap(y => values.months.map(m => `${y}-${format(new Date(2026, m - 1, 1), 'MM')}` as const));
};

// Les libelles n'existent qu'en deux jeux : les choisir un par un au fil du rendu laissait la
// langue se decider a trois endroits differents.
const libelles = (local: NonNullable<FilterDateProps['local']>) =>
  local === 'fr'
    ? { action: 'Effacer', annees: 'Années', mois: 'Mois', listeMois: monthsFr }
    : { action: 'Clear', annees: 'Years', mois: 'Months', listeMois: monthsEn };

const anneesEntre = (from: FilterDateProps['from'], to: FilterDateProps['to']) => {
  const fromYear = from === 'today' ? new Date().getFullYear() : from;
  const toYear = to === 'today' ? new Date().getFullYear() : to;

  return Array.from({ length: toYear - fromYear + 1 }, (_, i) => fromYear + i);
};

// Annees et mois se selectionnent de la meme facon : on bascule une valeur dans une liste, puis
// on republie les deux listes ensemble. Ecrit deux fois dans le composant, ce basculement en
// faisait la moitie du corps sans rien devoir au rendu.
const useSelectionPeriode = ({
  value,
  from,
  to,
  onChange,
}: Pick<FilterDateProps, 'value' | 'from' | 'to' | 'onChange'>) => {
  const [years, setYears] = React.useState<number[]>(value.years);
  const [months, setMonths] = React.useState<number[]>(value.months);

  const publier = (nouvellesAnnees: number[], nouveauxMois: number[]) => {
    setYears(nouvellesAnnees);
    setMonths(nouveauxMois);
    onChange?.(
      { years: nouvellesAnnees, months: nouveauxMois },
      filerDateValueToDates({ years: nouvellesAnnees, months: nouveauxMois }, from, to),
    );
  };

  const basculer = (liste: number[], valeur: number) =>
    liste.includes(valeur) ? liste.filter(v => v !== valeur) : [...liste, valeur];

  return {
    years,
    months,
    vide: years.length === 0 && months.length === 0,
    handleReset: () => publier([], []),
    handlePressYear: (y: number) => publier(basculer(years, y), months),
    handlePressMonth: (m: number) => publier(years, basculer(months, m)),
  };
};

// La bande des annees defile horizontalement et doit toujours s'ouvrir sur l'annee la plus
// recente : ce recalage a l'ouverture et au changement de contenu est le seul comportement
// propre a cette section.
const SectionAnnees = ({
  titre,
  annees,
  selection,
  onPress,
  ouvert,
}: {
  titre: string;
  annees: number[];
  selection: number[];
  onPress: (annee: number) => void;
  ouvert: boolean;
}) => {
  const styles = useStyles();
  const yearsScrollRef = React.useRef<ScrollView>(null);

  const scrollYearsToEnd = React.useCallback(() => {
    yearsScrollRef.current?.scrollToEnd({ animated: false });
  }, []);

  React.useEffect(() => {
    if (ouvert) {
      requestAnimationFrame(scrollYearsToEnd);
    }
  }, [ouvert, scrollYearsToEnd]);

  return (
    <Box style={styles.partContainer}>
      <Typography style={styles.partTitle}>{titre}</Typography>

      <ScrollView
        ref={yearsScrollRef}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        style={[styles.filtersHorizontalScroll, { width: '100%' }]}
        contentContainerStyle={styles.filtersScroll}
        onContentSizeChange={scrollYearsToEnd}
      >
        {annees.map(y => (
          <Box key={`year--${y}`}>
            <FilterDateButton type="year" title={y} selected={selection.includes(y)} onPress={() => onPress(y)} />
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
};

const SectionMois = ({
  titre,
  mois,
  selection,
  onPress,
}: {
  titre: string;
  mois: typeof monthsFr;
  selection: number[];
  onPress: (mois: number) => void;
}) => {
  const styles = useStyles();

  return (
    <Box style={styles.partContainer}>
      <Typography style={styles.partTitle}>{titre}</Typography>

      <Grid gap={'1W'} pl={'2W'} pr={'2W'}>
        {mois.map(m => (
          <Grid.Column key={`month--${m.value}`} size={4}>
            <FilterDateButton
              type="month"
              title={m.label}
              selected={selection.includes(m.value)}
              onPress={() => onPress(m.value)}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Box>
  );
};

export const FilterDate = (props: FilterDateProps) => {
  const { title, local = 'fr', from, to, value, onChange } = props;

  const styles = useStyles();
  const mots = libelles(local);
  const [open, setOpen] = React.useState(false);

  const { years, months, vide, handleReset, handlePressYear, handlePressMonth } = useSelectionPeriode({
    value,
    from,
    to,
    onChange,
  });

  return (
    <React.Fragment>
      <Button
        variant="secondary"
        title={title}
        endIcon="ChevronDown"
        size="sm"
        selected={!vide}
        expanded={open}
        onPress={() => setOpen(true)}
      />

      <BottomSheet
        fitContent
        title={title}
        open={open}
        setOpen={setOpen}
        action={<Button title={mots.action} variant="tertiary" size="sm" disabled={vide} onPress={handleReset} />}
      >
        <Box style={styles.container}>
          <SectionAnnees
            titre={mots.annees}
            annees={anneesEntre(from, to)}
            selection={years}
            onPress={handlePressYear}
            ouvert={open}
          />

          <SectionMois titre={mots.mois} mois={mots.listeMois} selection={months} onPress={handlePressMonth} />
        </Box>
      </BottomSheet>
    </React.Fragment>
  );
};

type FilterDateButtonProps = {
  title: string | number;
  type: 'month' | 'year';
  selected: boolean;
  onPress: () => void;
};

const FilterDateButton = (props: FilterDateButtonProps) => {
  const { title, type, selected, onPress } = props;

  return (
    <Button
      title={`${title}`}
      variant="secondary"
      size={type === 'month' ? 'md' : 'sm'}
      onPress={onPress}
      selected={selected}
    />
  );
};
