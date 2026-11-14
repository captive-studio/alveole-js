import { format } from 'date-fns/format';
import type { Locale } from 'date-fns/locale';
import React from 'react';
import { Pressable } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { ButtonIcon } from '../Button';
import { useStyles } from './Calendrier.styles';
import { choisirJour, formeDuJour, joursDuMois, PlageEnCours } from './plage';

type CalendrierProps = {
  plage: PlageEnCours;
  onChange: (plage: PlageEnCours) => void;
  locale: Locale;
  precedent: string;
  suivant: string;
};

const CaseJour = ({
  jour,
  colonne,
  plage,
  onChange,
}: Pick<CalendrierProps, 'plage' | 'onChange'> & { jour: Date; colonne: number }) => {
  const styles = useStyles();
  const forme = formeDuJour(jour, colonne, plage);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: forme.dansPlage }}
      onPress={() => onChange(choisirJour(plage, jour))}
    >
      <Box
        tag="time-range-input-case-jour"
        style={[
          styles.jour,
          forme.dansPlage && styles.jourDansPlage,
          forme.debut && styles.jourDebut,
          forme.fin && styles.jourFin,
        ]}
      >
        <Typography
          tag="time-range-input-jour"
          style={[styles.texteJour, forme.dansPlage && styles.texteJourDansPlage]}
        >
          {jour.getDate()}
        </Typography>
      </Box>
    </Pressable>
  );
};

/** Un mois navigable, semaine du lundi, où l'on pose les deux bornes d'une plage. */
export const Calendrier = ({ plage, onChange, locale, precedent, suivant }: CalendrierProps) => {
  const styles = useStyles();
  const [mois, setMois] = React.useState(() => {
    const reference = plage.debut ?? new Date();
    return new Date(reference.getFullYear(), reference.getMonth(), 1);
  });
  const changerDeMois = (pas: number) => setMois(new Date(mois.getFullYear(), mois.getMonth() + pas, 1));

  return (
    <React.Fragment>
      <Box tag="time-range-input-entete" style={styles.entete}>
        <ButtonIcon
          icon="ChevronLeft"
          variant="tertiary"
          size="sm"
          accessibilityLabel={precedent}
          onPress={() => changerDeMois(-1)}
        />
        <Typography tag="time-range-input-titre-mois" style={styles.titreMois}>
          {format(mois, 'MMMM yyyy', { locale })}
        </Typography>
        <ButtonIcon
          icon="ChevronRight"
          variant="tertiary"
          size="sm"
          accessibilityLabel={suivant}
          onPress={() => changerDeMois(1)}
        />
      </Box>

      <Box tag="time-range-input-grille" style={styles.grille}>
        {joursDuMois(mois.getFullYear(), mois.getMonth()).map((numero, index) =>
          numero === null ? (
            <Box key={`vide-${index}`} tag="time-range-input-case-vide" style={styles.jour} />
          ) : (
            <CaseJour
              key={numero}
              jour={new Date(mois.getFullYear(), mois.getMonth(), numero)}
              colonne={index % 7}
              plage={plage}
              onChange={onChange}
            />
          ),
        )}
      </Box>
    </React.Fragment>
  );
};
