import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { IconProps, LucideIcon } from '../LucideIcon';
import { EtatDuPointeur } from '../pointeur';
import { Spinner } from '../Spinner';
import { useDelaiDAffichage } from '../Spinner/useDelaiDAffichage';
import { ButtonProps, EtatDuBouton } from './Button.types';
import { styleDeLIcone, styleDeSurvol, styleDuConteneur, styleDuLibelle } from './buttonStyling';
import { Styles } from './buttonVariants';

type ButtonContentProps = {
  styles: Styles;
  etat: EtatDuBouton;
  state: EtatDuPointeur;
  /** Vrai quand le bouton est appuye, ou qu'il commande un menu deplie. */
  actif: boolean;
  props: ButtonProps;
};

/**
 * Ce que le spinner remplace, car il ne s'ajoute jamais : c'est ainsi que le bouton garde sa
 * largeur, regle commune a Primer, Atlassian et Base.
 *
 * L'ordre est celui de Primer : l'icone de tete d'abord, l'icone de fin sinon, et faute des
 * deux le libelle lui-meme - qui reste alors dans le flux en `visibility: hidden`, pour
 * continuer d'imposer sa largeur pendant que le spinner se centre par-dessus.
 */
const placeDuSpinner = (
  visible: boolean,
  startIcon?: ButtonProps['startIcon'],
  endIcon?: ButtonProps['endIcon'],
): 'tete' | 'fin' | 'libelle' | null => {
  if (!visible) return null;
  if (startIcon) return 'tete';
  if (endIcon) return 'fin';

  return 'libelle';
};

type EmplacementProps = { spinner: boolean; nom?: IconProps['name']; apparence: Omit<IconProps, 'name'> };

/** Un cote du libelle : son icone, ou le spinner venu prendre sa place. */
const Emplacement = ({ spinner, nom, apparence }: EmplacementProps) => {
  if (spinner) return <Spinner size="sm" />;

  return nom ? <LucideIcon name={nom} {...apparence} /> : null;
};

/**
 * Le contenu du bouton : ce que le Pressable enveloppe. La coque decide de la bordure, des
 * rayons et du focus ; ce composant-ci decide de ce qui se voit dedans.
 */
export const ButtonContent = ({ styles, etat, state, actif, props }: ButtonContentProps) => {
  const { title, startIcon, endIcon, isLoading, loadingDelay = 'long', ContainerProps = {} } = props;
  const { style, hoverStyle, ...containerProps } = ContainerProps;
  const hovered = !!state.hovered;
  const icone = styleDeLIcone(styles, etat, hovered);

  const place = placeDuSpinner(useDelaiDAffichage(isLoading ? loadingDelay : false) && !!isLoading, startIcon, endIcon);
  const recouvreLeLibelle = place === 'libelle';

  return (
    <Box
      style={[styleDuConteneur(styles, etat, actif), style]}
      hoverStyle={{ ...styleDeSurvol(styles, etat), ...hoverStyle }}
      {...containerProps}
    >
      <Emplacement spinner={place === 'tete'} nom={startIcon} apparence={icone} />
      <Typography
        user-select="false"
        style={{ ...styleDuLibelle(styles, etat, hovered), ...(recouvreLeLibelle ? styles.libelleMasque : {}) }}
      >
        {title}
      </Typography>
      <Emplacement spinner={place === 'fin'} nom={endIcon} apparence={icone} />
      {recouvreLeLibelle && (
        <Box style={styles.buttonLoader}>
          <Spinner size="sm" />
        </Box>
      )}
    </Box>
  );
};
