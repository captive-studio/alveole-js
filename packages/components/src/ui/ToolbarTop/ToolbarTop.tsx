import { Box } from '../../core/Box';
import { useStyles } from './ToolbarTop.styles';
import { ToolbarTopProps } from './ToolbarTop.types';
import { ToolbarTopInformation } from './ToolbarTopInformation';
import { ToolbarTopNavigation } from './ToolbarTopNavigation';

export * from './ToolbarTop.types';

export const ToolbarTop = (props: ToolbarTopProps) => {
  const {
    variant = 'default',
    style,
    title,
    onNavigate: _onNavigate,
    navigationIcon: _navigationIcon,
    navigationLabel: _navigationLabel,
    AvatarProps,
    sousTitre,
    actions,
    withBorder = false,
    typographyStyle,
    ...toolbarProps
  } = props;

  const styles = useStyles();
  const empilee = variant === 'large';
  const disposition = {
    default: {},
    large: styles.largeToolbarContainer,
    compactLarge: styles.compactLargetoolbarContainer,
  };

  // Les props sont transmises entieres, et non recomposees champ par champ : reassembler les
  // trois separerait le geste de son nom, et il faudrait un cast pour recoller l'union.
  const navigation = <ToolbarTopNavigation {...props} />;
  const contenu = (
    <>
      <ToolbarTopInformation
        title={title}
        sousTitre={sousTitre}
        AvatarProps={AvatarProps}
        typographyStyle={typographyStyle}
        grandTitre={variant !== 'default'}
        compact={variant === 'compactLarge'}
      />
      {actions && (
        <Box tag="toolbar-actions" style={styles.toolbarActions}>
          {actions}
        </Box>
      )}
    </>
  );

  return (
    <Box
      tag="toolbar"
      style={[
        styles.toolbarContainer,
        disposition[variant],
        style,
        withBorder ? styles.toolbarInformationWithBorder : {},
      ]}
      {...toolbarProps}
    >
      {navigation}
      {/* La variante `large` passe le titre sous la fleche : les deux ne sont plus cote a cote,
          et c'est le seul point ou la structure change. */}
      {empilee ? <Box tag="toolbar-bas">{contenu}</Box> : contenu}
    </Box>
  );
};
