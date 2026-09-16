import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const barreDOutils = ({ text, color, spacing, radius }: Theme) =>
  ({
    toolbar: {
      padding: spacing('1W'),
      borderColor: color.light.border['default-grey'],
      borderWidth: 1,
      borderStyle: 'solid',
      borderTopLeftRadius: radius('md'),
      borderTopRightRadius: radius('md'),
      backgroundColor: color.light.background['alt-grey'],
      display: 'flex',
      flexDirection: 'row',
      gap: spacing('1W'),
      justifyContent: 'space-between',
    },
    toolbarAction: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacing('1W'),
      justifyContent: 'flex-end',
    },
    toolbarTitle: {
      ...text['Corps de texte'].MD.SemiBold,
      color: color.light.text['default-grey'],
      paddingLeft: spacing('1W'),
      marginTop: 'auto',
      marginBottom: 'auto',
      userSelect: 'none',
    },
    toolbarState: {
      ...text['Corps de texte'].SM.Regular,
      color: color.light.text['mention-grey'],
      userSelect: 'none',
      fontVariant: 'tabular-nums',
    },
    toolbarDivider: {
      width: 1,
      height: '50%',
      backgroundColor: color.light.border['default-grey'],
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  }) satisfies Table;

const cadre = ({ color, spacing, radius, isVariant }: Theme) =>
  ({
    viewerWrapper: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
    },
    viewerContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      padding: spacing('1W'),
      borderColor: color.light.border['default-grey'],
      borderWidth: 1,
      borderStyle: 'solid',
      borderTopWidth: 0,
      borderBottomLeftRadius: radius('md'),
      borderBottomRightRadius: radius('md'),
      backgroundColor: color.light.background['default-grey'],
      overflow: 'hidden',
    },
    children: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: isVariant('tablet') ? '60%' : '40%',
      maxWidth: isVariant('tablet') ? '60%' : '40%',
      minWidth: 0,
      flexShrink: 1,
      borderColor: color.light.border['default-grey'],
      borderWidth: 1,
      borderStyle: 'solid',
      borderLeft: 0,
      borderTopRightRadius: radius('md'),
      borderBottomRightRadius: radius('md'),
      backgroundColor: color.light.background['default-grey'],
      overflow: 'auto',
    },
  }) satisfies Table;

const apercuImage = () =>
  ({
    viewerImageContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      cursor: 'crosshair',
      userSelect: 'none',
    },
    viewerImageZoomLayer: {
      width: '100%',
      height: '100%',
      transitionProperty: 'transform',
      transitionDuration: '120ms',
      transitionTimingFunction: 'ease-out',
      transitionDelay: '0ms',
    },
  }) satisfies Table;

const apercuPdf = ({ text, color }: Theme) =>
  ({
    viewerPdfContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      cursor: 'crosshair',
      userSelect: 'none',
    },
    viewerPdfStage: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    },
    viewerPdfCanvasWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transitionProperty: 'transform',
      transitionDuration: '120ms',
      transitionTimingFunction: 'ease-out',
      transitionDelay: '0ms',
    },
    viewerPdfCanvas: {
      display: 'block',
      maxWidth: '100%',
    },
    viewerPdfOverlay: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.light.background['default-grey'],
    },
    viewerPdfErrorLabel: {
      ...text['Corps de texte'].SM.Regular,
      color: color.light.text['default-error'],
      userSelect: 'none',
      textAlign: 'center',
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({
  ...barreDOutils(theme),
  ...cadre(theme),
  ...apercuImage(),
  ...apercuPdf(theme),
}));
