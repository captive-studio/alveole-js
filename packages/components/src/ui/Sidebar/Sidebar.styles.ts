import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing, spacingValue, isVariant, radius }) => {
  // Titre de groupe et libellé d'item partent de la même verticale, comme chez Primer qui les
  // aligne au pixel. L'item y arrive par trois retraits emboîtés : la marge de son conteneur,
  // le padding de ce conteneur, puis celui de la pastille qui porte le texte. Le titre n'en a
  // qu'un seul, d'où cette somme explicite : sans elle les deux dérivent au premier réglage.
  const desktopContentInset = spacingValue('075') + spacingValue('050') + spacingValue('050');

  return {
    sidebar: {
      backgroundColor: '#FFFFFF',
      borderRightWidth: 1,
      borderColor: color.light.border['default-grey'],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      alignSelf: 'stretch',
    },
    header: {},
    headerContent: {
      display: 'flex',
      flexDirection: 'row',
      padding: spacingValue('050'),
    },
    logo: {
      marginLeft: isVariant('mobile') || isVariant('tablet') ? spacing('150') : 0,
    },
    sidebarContent: {
      flex: 1,
      justifyContent: 'space-between',
      width: '100%',
    },
    scrollView: {
      flex: 1,
      paddingTop: spacing('100'),
      paddingBottom: spacing('100'),
      zIndex: 1000,
      backgroundColor: '#FFFFFF',
    },
    // L'écart qui détache deux groupes appartient au groupe, pas à son titre : porté par le
    // titre, il le collerait à sa propre liste tout en le faisant flotter sous la précédente.
    groupDesktop: {
      // 8, et non 16 : le titre porte déjà 8 de padding haut. C'est la somme des deux qui fait
      // face à l'écart posé au-dessus du séparateur, et qui le laisse à égale distance des
      // deux groupes qu'il sépare.
      marginTop: spacing('050'),
    },
    // Le titre de groupe recule derrière ses items, et ne se signale que par deux dimensions à
    // la fois : ici le gris de mention et la graisse. Les références divergent sur lesquelles
    // (Primer prend graisse et taille à couleur égale, Atlassian la couleur), mais aucune ne
    // cumule couleur plus sombre et graisse supérieure à celles des items. Voir docs/adr/0007.
    groupTitleDesktop: {
      ...text['Corps de texte'].XS.Bold,
      color: color.light.text['mention-grey'],
      paddingLeft: desktopContentInset,
      paddingTop: spacing('050'),
      paddingBottom: spacing('050'),
    },
    groupTitleMobile: {
      ...text['Corps de texte'].MD.Medium,
      color: color.light.text['mention-grey'],
      paddingLeft: spacing('3V'),
      paddingRight: spacing('3V'),
      paddingTop: spacing('2W'),
      paddingBottom: spacing('2W'),
    },
    // 32px de haut en tout : 20 de hauteur de ligne plus 6 de part et d'autre, comme dans la
    // maquette. Le retrait horizontal reste à 8, c'est lui qui porte la verticale du contenu.
    sidebarItemDesktop: {
      borderRadius: spacing('050'),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing('050'),
      paddingTop: spacing('1,5V'),
      paddingBottom: spacing('1,5V'),
      paddingLeft: spacing('1W'),
      paddingRight: spacing('1W'),
      width: '100%',
      color: color.light.text['title-grey'],
      stroke: color.light.text['title-grey'],
    },

    sidebarItemMobile: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing('3V'),
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      paddingTop: spacing('2W'),
      paddingBottom: spacing('2W'),
      width: '100%',
      color: color.light.text['title-grey'],
      stroke: color.light.text['title-grey'],
    },
    sidebarItemSelectedDesktop: {
      backgroundColor: color.light.background['contrast-grey'],
    },
    sidebarItemSelectedMobile: {
      borderRadius: radius('lg'),
      backgroundColor: color.light.background['alt-primary'],
    },
    sidebarItemHover: {
      backgroundColor: color.light.background['default-grey-hover'],
    },
    sidebarItemContainerDesktop: {
      paddingLeft: spacing('050'),
      paddingRight: spacing('050'),
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      marginLeft: spacing('075'),
      marginRight: spacing('025'),
    },
    sidebarItemContainerMobile: {
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      paddingTop: spacing('2W'),
      paddingBottom: spacing('2W'),
      gap: spacing('3V'),
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      borderRadius: radius('md'),
      marginLeft: spacing('075'),
      marginRight: spacing('025'),
    },
    sidebarItemTitleSelectedDesktop: {
      ...text['Corps de texte'].SM.Bold,
      color: color.light.text['default-grey'],
      stroke: color.light.text['default-grey'],
    },
    sidebarItemTitleSelectedMobile: {
      ...text['Corps de texte'].MD.Medium,
      color: color.light.text['default-grey'],
      stroke: color.light.text['mention-grey'],
    },
    sidebarItemTitleDesktop: {
      ...text['Corps de texte'].SM.Regular,
      color: color.light.text['default-grey'],
      stroke: color.light.text['default-grey'],
    },
    sidebarItemTitleMobile: {
      ...text['Corps de texte'].MD.Medium,
      color: color.light.text['default-grey'],
      stroke: color.light.text['default-grey'],
    },
    sidebarItemTitleCurrentHoverDesktop: {
      ...text['Corps de texte'].SM.Bold,
    },

    sidebarItemTitleCurrentHoverMobile: {
      ...text['Corps de texte'].MD.Medium,
      color: color.light.background['action-high-primary'],
    },
    sidebarItemSelectedIndicator: {
      height: '100%',
      width: spacingValue('025'),
      position: 'absolute',
      left: 0,
    },
    sidebarItemSelectedIndicatorContent: {
      width: '100%',
      minHeight: spacing('150'),
      backgroundColor: color.light.border['default-primary'],
      margin: 'auto',
      borderRadius: spacing('050'),
    },
  };
});
