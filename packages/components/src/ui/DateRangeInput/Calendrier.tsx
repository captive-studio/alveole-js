import type { Locale } from 'date-fns/locale';
import React from 'react';
import { Pressable } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { ActionMenu } from '../ActionMenu';
import { ButtonIcon } from '../Button';
import { useStyles } from './Calendrier.styles';
import { choisirJour, formeDuJour, joursDuMois, optionsDesAnnees, optionsDesMois, PlageEnCours } from './plage';

type MotsDuCalendrier = { locale: Locale; precedent: string; suivant: string; mois: string; annee: string };

type CalendrierProps = {
  plage: PlageEnCours;
  onChange: (plage: PlageEnCours) => void;
  mots: MotsDuCalendrier;
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
        tag="date-range-input-case-jour"
        style={[
          styles.jour,
          forme.dansPlage && styles.jourDansPlage,
          forme.debut && styles.jourDebut,
          forme.fin && styles.jourFin,
        ]}
      >
        <Typography
          tag="date-range-input-jour"
          style={[styles.texteJour, forme.dansPlage && styles.texteJourDansPlage]}
        >
          {jour.getDate()}
        </Typography>
      </Box>
    </Pressable>
  );
};

// Le mois ou l'année s'affiche en texte ; un clic ouvre la liste des valeurs dans un popover.
const ChoixDansMenu = ({
  nom,
  options,
  valeur,
  onChoix,
}: {
  nom: string;
  options: { value: string; label: string }[];
  valeur: string;
  onChoix: (valeur: string) => void;
}) => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <ActionMenu
      placement="bottom"
      open={open}
      setOpen={setOpen}
      renderTrigger={() => (
        <Pressable accessibilityRole="button" accessibilityLabel={nom} onPress={() => setOpen(!open)}>
          <Typography tag="date-range-input-titre-mois" style={styles.titreMois}>
            {options.find(option => option.value === valeur)?.label}
          </Typography>
        </Pressable>
      )}
    >
      {options.map(option => (
        <ActionMenu.Item
          key={option.value}
          title={option.label}
          selected={option.value === valeur}
          onPress={() => {
            onChoix(option.value);
            setOpen(false);
          }}
        />
      ))}
    </ActionMenu>
  );
};

// Flèches pour le mois voisin, et deux listes pour sauter directement à un mois ou une année.
const EnteteCalendrier = ({
  mois,
  onMois,
  mots,
}: {
  mois: Date;
  onMois: (mois: Date) => void;
  mots: MotsDuCalendrier;
}) => {
  const styles = useStyles();
  const aller = (annee: number, numero: number) => onMois(new Date(annee, numero, 1));

  return (
    <Box tag="date-range-input-entete" style={styles.entete}>
      <ButtonIcon
        icon="ChevronLeft"
        variant="tertiary"
        size="sm"
        accessibilityLabel={mots.precedent}
        onPress={() => aller(mois.getFullYear(), mois.getMonth() - 1)}
      />
      <Box tag="date-range-input-choix-mois" style={styles.choixMois}>
        <ChoixDansMenu
          nom={mots.mois}
          options={optionsDesMois(mots.locale)}
          valeur={String(mois.getMonth())}
          onChoix={numero => aller(mois.getFullYear(), Number(numero))}
        />
        <ChoixDansMenu
          nom={mots.annee}
          options={optionsDesAnnees(mois.getFullYear())}
          valeur={String(mois.getFullYear())}
          onChoix={annee => aller(Number(annee), mois.getMonth())}
        />
      </Box>
      <ButtonIcon
        icon="ChevronRight"
        variant="tertiary"
        size="sm"
        accessibilityLabel={mots.suivant}
        onPress={() => aller(mois.getFullYear(), mois.getMonth() + 1)}
      />
    </Box>
  );
};

/** Un mois navigable, semaine du lundi, où l'on pose les deux bornes d'une plage. */
export const Calendrier = ({ plage, onChange, mots }: CalendrierProps) => {
  const styles = useStyles();
  const [mois, setMois] = React.useState(() => {
    const reference = plage.debut ?? new Date();
    return new Date(reference.getFullYear(), reference.getMonth(), 1);
  });

  return (
    <React.Fragment>
      <EnteteCalendrier mois={mois} onMois={setMois} mots={mots} />

      <Box tag="date-range-input-grille" style={styles.grille}>
        {joursDuMois(mois.getFullYear(), mois.getMonth()).map((numero, index) =>
          numero === null ? (
            <Box key={`vide-${index}`} tag="date-range-input-case-vide" style={styles.jour} />
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
