import { SIZE_MAP, SpinnerProps, STROKE_MAP } from './Spinner.shared';
import { useStyles } from './Spinner.styles';
import { useDelaiDAffichage } from './useDelaiDAffichage';
import { useRotation } from './useRotation';

/**
 * Ce que le spinner natif et le spinner web ont en commun : seul leur dessin differe, un cercle
 * SVG d'un cote, une bordure CSS de l'autre.
 */
export const useSpinner = ({ size = 'md', delay }: SpinnerProps, useNativeDriver: boolean) => ({
  styles: useStyles(),
  spin: useRotation(useNativeDriver),
  visible: useDelaiDAffichage(delay),
  px: SIZE_MAP[size],
  strokeWidth: STROKE_MAP[size],
});
