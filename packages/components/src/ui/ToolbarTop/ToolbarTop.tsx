import { Box } from '../../core/Box';
import { useStyles } from './ToolbarTop.styles';
import { ToolbarTopProps } from './ToolbarTop.types';
import { ToolbarTopInformation } from './ToolbarTopInformation';
import { ToolbarTopNavigation } from './ToolbarTopNavigation';
import { bordureDeLaBarre, dispositionDeLaBarre } from './toolbarTopStyling';

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
      style={[dispositionDeLaBarre(styles, variant), style, bordureDeLaBarre(styles, withBorder)]}
      {...toolbarProps}
    >
      {navigation}
      {contenu}
    </Box>
  );
};
