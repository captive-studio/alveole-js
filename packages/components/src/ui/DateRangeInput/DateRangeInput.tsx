import { enUS } from 'date-fns/locale/en-US';
import { fr } from 'date-fns/locale/fr';
import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button } from '../Button';
import { Calendrier } from './Calendrier';
import { useStyles } from './DateRangeInput.styles';
import { PlageEnCours } from './plage';

/** Deux jours, bornes comprises, sans heure. */
export type PlageDeDates = { debut: Date; fin: Date };

export type DateRangeInputProps = {
  title?: string;
  value?: PlageDeDates;
  local?: 'fr' | 'en';
  onApply: (plage: PlageDeDates) => void;
  /** Affiche le bouton « Retour » quand il est fourni. */
  onCancel?: () => void;
};

export const libellesDuCalendrier = (local: 'fr' | 'en') =>
  local === 'fr'
    ? {
        retour: 'Retour',
        appliquer: 'Appliquer',
        precedent: 'Mois précédent',
        suivant: 'Mois suivant',
        mois: 'Mois',
        annee: 'Année',
        locale: fr,
      }
    : {
        retour: 'Back',
        appliquer: 'Apply',
        precedent: 'Previous month',
        suivant: 'Next month',
        mois: 'Month',
        annee: 'Year',
        locale: enUS,
      };

/** Choix d'une plage de dates au calendrier, sans heure. TimeRangeInput y ajoute les heures et l'UTC. */
export const DateRangeInput = (props: DateRangeInputProps) => {
  const { title, value, local = 'fr', onApply, onCancel } = props;
  const styles = useStyles();
  const mots = libellesDuCalendrier(local);
  const [plage, setPlage] = React.useState<PlageEnCours>({ debut: value?.debut, fin: value?.fin });

  return (
    <Box tag="date-range-input-container" style={styles.container}>
      {title && (
        <Typography tag="date-range-input-titre" style={styles.titre}>
          {title}
        </Typography>
      )}

      <Calendrier plage={plage} onChange={setPlage} mots={mots} />

      <Box tag="date-range-input-actions" style={styles.actions}>
        {onCancel && <Button title={mots.retour} variant="tertiary" size="sm" leading="ArrowLeft" onPress={onCancel} />}
        <Button
          title={mots.appliquer}
          variant="primary"
          size="sm"
          disabled={!plage.debut}
          onPress={() => plage.debut && onApply({ debut: plage.debut, fin: plage.fin ?? plage.debut })}
        />
      </Box>
    </Box>
  );
};
