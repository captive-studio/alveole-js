import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon } from '../LucideIcon';
import { Spinner } from '../Spinner';
import { ButtonProps, CustomPressableState, EtatDuBouton } from './Button.types';
import { styleDeLIcone, styleDeSurvol, styleDuConteneur, styleDuLibelle } from './buttonStyling';
import { Styles } from './buttonVariants';

type ButtonContentProps = {
  styles: Styles;
  etat: EtatDuBouton;
  state: CustomPressableState;
  /** Vrai quand le bouton est appuye, ou qu'il commande un menu deplie. */
  actif: boolean;
  props: ButtonProps;
};

/**
 * Le contenu du bouton : ce que le Pressable enveloppe. La coque decide de la bordure, des
 * rayons et du focus ; ce composant-ci decide de ce qui se voit dedans.
 */
export const ButtonContent = ({ styles, etat, state, actif, props }: ButtonContentProps) => {
  const { title, startIcon, endIcon, isLoading, ContainerProps = {} } = props;
  const { style, hoverStyle, ...containerProps } = ContainerProps;
  const hovered = !!state.hovered;
  const icone = styleDeLIcone(styles, etat, hovered);

  return (
    <Box
      style={[styleDuConteneur(styles, etat, actif), style]}
      hoverStyle={{ ...styleDeSurvol(styles, etat), ...hoverStyle }}
      {...containerProps}
    >
      {startIcon && <LucideIcon name={startIcon} {...icone} />}
      {!etat.iconeSeule && (
        <Typography user-select="false" style={styleDuLibelle(styles, etat, hovered)}>
          {title}
        </Typography>
      )}
      {isLoading ? (
        <Spinner size="sm" delay="long" style={styles.buttonLoader} />
      ) : (
        endIcon && <LucideIcon name={endIcon} {...icone} />
      )}
    </Box>
  );
};
