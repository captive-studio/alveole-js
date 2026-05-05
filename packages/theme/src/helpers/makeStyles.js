import { useTheme } from '../ThemeProvider';
import { removeUnsupportedCSSProperties } from './removeUnsupportedCSSProperties';
/**
 * Génère les styles pour les composants en injectant le theme
 * @param stylesFn - (theme: Theme) => CSSProperties
 * @returns Des proprité css avec les valeurs du thème injecté
 */
export function makeStyles(stylesFn) {
  return () => {
    const theme = useTheme();
    const styles = stylesFn(theme);
    return removeUnsupportedCSSProperties(styles);
  };
}
