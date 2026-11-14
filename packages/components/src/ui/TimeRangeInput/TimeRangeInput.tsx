import { enUS } from 'date-fns/locale/en-US';
import { fr } from 'date-fns/locale/fr';
import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { TimeInput } from '../TimeInput';
import { Calendrier } from './Calendrier';
import { composerDate, PlageDeTemps, PlageEnCours } from './plage';
import { useStyles } from './TimeRangeInput.styles';

export type PlageAbsolue = Extract<PlageDeTemps, { type: 'absolue' }>;

export type TimeRangeInputProps = {
  title?: string;
  value?: PlageAbsolue;
  local?: 'fr' | 'en';
  onApply: (plage: PlageAbsolue) => void;
  /** Affiche le bouton « Retour » quand il est fourni. */
  onCancel?: () => void;
};

const libelles = (local: 'fr' | 'en') =>
  local === 'fr'
    ? { retour: 'Retour', appliquer: 'Appliquer', precedent: 'Mois précédent', suivant: 'Mois suivant', locale: fr }
    : { retour: 'Back', appliquer: 'Apply', precedent: 'Previous month', suivant: 'Next month', locale: enUS };

const heureDe = (date: Date | undefined, utc: boolean, defaut: string) => {
  if (!date) return defaut;
  const [h, m] = utc ? [date.getUTCHours(), date.getUTCMinutes()] : [date.getHours(), date.getMinutes()];
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

// Le calendrier travaille en jours locaux : une date UTC y est ramenée à son jour UTC.
const jourDe = (date: Date | undefined, utc: boolean) =>
  date && utc ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) : date;

// Les jours, les heures et le choix UTC ne forment une plage qu'ensemble : une fin avant le début n'en est pas une.
const etatInitial = (value?: PlageAbsolue) => {
  const utc = value?.utc ?? true;
  return {
    utc,
    plage: { debut: jourDe(value?.debut, utc), fin: jourDe(value?.fin, utc) },
    heureDebut: heureDe(value?.debut, utc, '00:00'),
    heureFin: heureDe(value?.fin, utc, '23:59'),
  };
};

const usePlageAbsolue = (value?: PlageAbsolue) => {
  const [initial] = React.useState(() => etatInitial(value));
  const [utc, setUtc] = React.useState(initial.utc);
  const [plage, setPlage] = React.useState<PlageEnCours>(initial.plage);
  const [heureDebut, setHeureDebut] = React.useState(initial.heureDebut);
  const [heureFin, setHeureFin] = React.useState(initial.heureFin);

  const resultat: PlageAbsolue | undefined = plage.debut && {
    type: 'absolue',
    debut: composerDate(plage.debut, heureDebut, utc),
    fin: composerDate(plage.fin ?? plage.debut, heureFin, utc),
    utc,
  };
  const valide = resultat && resultat.fin >= resultat.debut ? resultat : undefined;

  return { utc, setUtc, plage, setPlage, heureDebut, setHeureDebut, heureFin, setHeureFin, valide };
};

/** Choix d'une plage de dates au calendrier, avec heure de début, heure de fin et lecture en UTC. */
export const TimeRangeInput = (props: TimeRangeInputProps) => {
  const { title, value, local = 'fr', onApply, onCancel } = props;
  const styles = useStyles();
  const mots = libelles(local);
  const etat = usePlageAbsolue(value);

  return (
    <Box tag="time-range-input-container" style={styles.container}>
      {title && (
        <Typography tag="time-range-input-titre" style={styles.titre}>
          {title}
        </Typography>
      )}

      <Calendrier
        plage={etat.plage}
        onChange={etat.setPlage}
        locale={mots.locale}
        precedent={mots.precedent}
        suivant={mots.suivant}
      />

      <Box tag="time-range-input-heures" style={styles.heures}>
        <Box tag="time-range-input-heure" style={styles.heure}>
          <TimeInput value={etat.heureDebut} onChange={etat.setHeureDebut} />
        </Box>
        <Box tag="time-range-input-heure" style={styles.heure}>
          <TimeInput value={etat.heureFin} onChange={etat.setHeureFin} />
        </Box>
        <Checkbox label="UTC" checked={etat.utc} onCheckedChange={coche => etat.setUtc(coche === true)} />
      </Box>

      <Box tag="time-range-input-actions" style={styles.actions}>
        {onCancel && <Button title={mots.retour} variant="tertiary" size="sm" leading="ArrowLeft" onPress={onCancel} />}
        <Button
          title={mots.appliquer}
          variant="primary"
          size="sm"
          disabled={!etat.valide}
          onPress={() => etat.valide && onApply(etat.valide)}
        />
      </Box>
    </Box>
  );
};
