import { format } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
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

export const FilterDate = (props: FilterDateProps) => {
  const { title, local = 'fr', from, to, value, onChange } = props;

  const actionLabel = local === 'fr' ? 'Effacer' : 'Clear';
  const yearsLabel = local === 'fr' ? 'Années' : 'Years';
  const monthsLabel = local === 'fr' ? 'Mois' : 'Months';

  const fromYear = from === 'today' ? new Date().getFullYear() : from;
  const toYear = to === 'today' ? new Date().getFullYear() : to;

  const yearsList = Array.from({ length: toYear - fromYear + 1 }, (_, i) => fromYear + i);
  const monthsList = local === 'fr' ? monthsFr : monthsEn;

  const [open, setOpen] = React.useState(false);

  const [years, setYears] = React.useState<number[]>(value.years);
  const [months, setMonths] = React.useState<number[]>(value.months);
  const yearsScrollRef = React.useRef<ScrollView>(null);

  const styles = useStyles();

  const disabledReset = React.useMemo(() => years.length === 0 && months.length === 0, [months.length, years.length]);
  const hasValues = React.useMemo(() => years.length > 0 || months.length > 0, [months.length, years.length]);

  const scrollYearsToEnd = React.useCallback(() => {
    yearsScrollRef.current?.scrollToEnd({ animated: false });
  }, []);

  React.useEffect(() => {
    if (open) {
      requestAnimationFrame(scrollYearsToEnd);
    }
  }, [open, scrollYearsToEnd]);

  const handleReset = React.useCallback(() => {
    setYears([]);
    setMonths([]);
    onChange?.({ years: [], months: [] }, []);
  }, [onChange]);

  const handlePressYear = React.useCallback(
    (y: number) => {
      let newYears = years;
      if (newYears.includes(y)) newYears = newYears.filter(v => v !== y);
      else newYears = [...newYears, y];

      setYears(newYears);
      onChange?.({ years: newYears, months }, filerDateValueToDates({ years: newYears, months }, from, to));
    },
    [from, months, onChange, to, years],
  );

  const handlePressMonth = React.useCallback(
    (m: number) => {
      let newMonths = months;
      if (newMonths.includes(m)) newMonths = newMonths.filter(v => v !== m);
      else newMonths = [...newMonths, m];

      setMonths(newMonths);
      onChange?.({ years, months: newMonths }, filerDateValueToDates({ years, months: newMonths }, from, to));
    },
    [from, months, onChange, to, years],
  );

  return (
    <React.Fragment>
      <Button
        variant="secondary"
        title={title}
        endIcon="ChevronDown"
        size="sm"
        selected={hasValues}
        expanded={open}
        onPress={() => setOpen(true)}
      />

      <BottomSheet
        fitContent
        title={title}
        open={open}
        setOpen={setOpen}
        action={
          <Button title={actionLabel} variant="tertiary" size="sm" disabled={disabledReset} onPress={handleReset} />
        }
      >
        <Box style={styles.container}>
          <Box style={styles.partContainer}>
            <Typography style={styles.partTitle}>{yearsLabel}</Typography>

            <ScrollView
              ref={yearsScrollRef}
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              style={[styles.filtersHorizontalScroll, { width: '100%' }]}
              contentContainerStyle={styles.filtersScroll}
              onContentSizeChange={scrollYearsToEnd}
            >
              {yearsList.map(y => (
                <Box key={`year--${y}`}>
                  <FilterDateButton
                    type="year"
                    title={y}
                    selected={years.includes(y)}
                    onPress={() => handlePressYear(y)}
                  />
                </Box>
              ))}
            </ScrollView>
          </Box>

          <Box style={styles.partContainer}>
            <Typography style={styles.partTitle}>{monthsLabel}</Typography>

            <Grid gap={'1W'} pl={'2W'} pr={'2W'}>
              {monthsList.map(m => (
                <Grid.Column key={`month--${m.value}`} size={4}>
                  <FilterDateButton
                    type="month"
                    title={m.label}
                    selected={months.includes(m.value)}
                    onPress={() => handlePressMonth(m.value)}
                  />
                </Grid.Column>
              ))}
            </Grid>
          </Box>
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
