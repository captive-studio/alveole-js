import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button } from '../Button';
import { TextInput } from '../FormControl';
import { LucideIcon } from '../LucideIcon';
import { Popover } from '../Popover';
import { DureeRelative, dureeRelative, libelleDePlage, PlageDeTemps, TimeRangeInput } from '../TimeRangeInput';
import { useStyles } from './FilterTimeRange.styles';

export type FilterTimeRangeProps = {
  title: string;
  local?: 'fr' | 'en';
  value?: PlageDeTemps;
  onChange: (plage: PlageDeTemps) => void;
};

const presets: Record<'fr' | 'en', { duree: DureeRelative; label: string }[]> = {
  fr: [
    { duree: '1h', label: 'Dernière heure' },
    { duree: '24h', label: 'Dernières 24 heures' },
    { duree: '7d', label: '7 derniers jours' },
    { duree: '14d', label: '14 derniers jours' },
    { duree: '30d', label: '30 derniers jours' },
    { duree: '90d', label: '90 derniers jours' },
  ],
  en: [
    { duree: '1h', label: 'Last hour' },
    { duree: '24h', label: 'Last 24 hours' },
    { duree: '7d', label: 'Last 7 days' },
    { duree: '14d', label: 'Last 14 days' },
    { duree: '30d', label: 'Last 30 days' },
    { duree: '90d', label: 'Last 90 days' },
  ],
};

const libelles = (local: 'fr' | 'en') =>
  local === 'fr'
    ? { absolue: 'Date absolue', saisie: 'Plage libre : 2h, 4d, 8w…' }
    : { absolue: 'Absolute date', saisie: 'Custom range: 2h, 4d, 8w…' };

type ListeDesPlagesProps = Pick<FilterTimeRangeProps, 'title' | 'value'> & {
  local: 'fr' | 'en';
  onChoisir: (plage: PlageDeTemps) => void;
  onAbsolue: () => void;
};

const ListeDesPlages = ({ title, local, value, onChoisir, onAbsolue }: ListeDesPlagesProps) => {
  const styles = useStyles();
  const mots = libelles(local);
  const [saisie, setSaisie] = React.useState('');

  const validerSaisie = () => {
    const duree = dureeRelative(saisie);
    if (duree) onChoisir({ type: 'relative', duree });
  };

  return (
    <Box tag="filter-time-range-container" style={styles.container}>
      <Typography tag="filter-time-range-titre" style={styles.titre}>
        {title}
      </Typography>
      <TextInput
        value={saisie}
        placeholder={mots.saisie}
        onChangeText={setSaisie}
        onSubmitEditing={validerSaisie}
        startAdornment={
          <Box tag="filter-time-range-adornment" style={styles.adornment}>
            <LucideIcon name="Search" size="sm" />
          </Box>
        }
      />
      {presets[local].map(preset => {
        const choisi = value?.type === 'relative' && value.duree === preset.duree;
        return (
          <Button
            key={preset.duree}
            title={preset.label}
            variant="tertiary"
            contentAlign="start"
            fullWidth
            selected={choisi}
            leading={choisi ? 'Check' : undefined}
            onPress={() => onChoisir({ type: 'relative', duree: preset.duree })}
          />
        );
      })}
      <Button
        title={mots.absolue}
        variant="tertiary"
        contentAlign="start"
        fullWidth
        selected={value?.type === 'absolue'}
        trailing="ArrowRight"
        onPress={onAbsolue}
      />
    </Box>
  );
};

/** Filtre sur une plage de temps : plages relatives prédéfinies ou saisies, ou plage absolue au calendrier. */
export const FilterTimeRange = (props: FilterTimeRangeProps) => {
  const { title, local = 'fr', value, onChange } = props;
  const [open, setOpen] = React.useState(false);
  const [absolue, setAbsolue] = React.useState(false);

  const changerOuverture = (ouvert: boolean) => {
    setOpen(ouvert);
    if (!ouvert) setAbsolue(false);
  };

  const choisir = (plage: PlageDeTemps) => {
    onChange(plage);
    changerOuverture(false);
  };

  return (
    <Popover
      placement="bottom-start"
      scrollable={false}
      open={open}
      setOpen={changerOuverture}
      renderTrigger={() => (
        <Button
          variant="secondary"
          size="sm"
          title={value ? libelleDePlage(value, local) : title}
          trailing="ChevronDown"
          selected={!!value}
          expanded={open}
          onPress={() => changerOuverture(!open)}
        />
      )}
    >
      {absolue ? (
        <TimeRangeInput
          title={title}
          local={local}
          value={value?.type === 'absolue' ? value : undefined}
          onApply={choisir}
          onCancel={() => setAbsolue(false)}
        />
      ) : (
        <ListeDesPlages
          title={title}
          local={local}
          value={value}
          onChoisir={choisir}
          onAbsolue={() => setAbsolue(true)}
        />
      )}
    </Popover>
  );
};
