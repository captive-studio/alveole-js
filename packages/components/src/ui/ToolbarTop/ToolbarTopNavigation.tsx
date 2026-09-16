import { Box } from '../../core/Box';
import { ButtonIcon } from '../Button';
import { useStyles } from './ToolbarTop.styles';
import { Navigation } from './ToolbarTop.types';

/**
 * Le geste de retour, quand il y en a un. La fleche par defaut ramene en arriere : c'est le cas
 * de loin le plus frequent, et l'appelant qui replie ou qui ferme designe la sienne.
 *
 * L'union entiere est exigee en entree, et non les trois champs a plat : c'est elle qui apprend
 * au compilateur qu'un geste vient toujours avec son nom, et donc que le bouton est nomme.
 */
export const ToolbarTopNavigation = ({ onNavigate, navigationIcon = 'ChevronLeft', navigationLabel }: Navigation) => {
  const styles = useStyles();

  if (!onNavigate) return null;

  return (
    <Box tag="toolbar-navigation" style={styles.toolbarNavigation}>
      <ButtonIcon
        variant="tertiary"
        size="lg"
        iconSize="md"
        icon={navigationIcon}
        accessibilityLabel={navigationLabel}
        onPress={onNavigate}
      />
    </Box>
  );
};
