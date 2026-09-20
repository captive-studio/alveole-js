import { CSSProperties } from 'react';

// Les trois pieces visibles d'un interrupteur - le bouton, son pouce et son libelle - reagissent
// aux memes deux etats, chacune avec sa propre couche de styles. Le composant empilait les neuf
// combinaisons a la main, en plein milieu de son rendu.
type TableDApparence<Couche> = {
  switchButton: Couche;
  switchButtonChecked: Couche;
  switchButtonDisabled: Couche;
  switchThumb: Couche;
  switchThumbChecked: Couche;
  switchThumbDisabled: Couche;
  switchLabel: Couche;
  switchLabelChecked: Couche;
  switchLabelDisabled: Couche;
};

export type EtatDuSwitch = {
  value: boolean;
  disabled?: boolean;
  noPadding?: boolean;
  style?: CSSProperties;
};

export const apparenceDuSwitch = <Couche extends object>(
  styles: TableDApparence<Couche>,
  { value, disabled, noPadding, style }: EtatDuSwitch,
) => ({
  bouton: {
    ...styles.switchButton,
    ...style,
    ...(value ? styles.switchButtonChecked : {}),
    ...(disabled ? styles.switchButtonDisabled : {}),
  },
  pouce: {
    ...styles.switchThumb,
    ...(value ? styles.switchThumbChecked : {}),
    ...(disabled ? styles.switchThumbDisabled : {}),
  },
  libelle: {
    ...styles.switchLabel,
    ...(value ? styles.switchLabelChecked : {}),
    ...(disabled ? styles.switchLabelDisabled : {}),
    ...(noPadding ? { padding: 0, marginRight: 0 } : {}),
  },
});
