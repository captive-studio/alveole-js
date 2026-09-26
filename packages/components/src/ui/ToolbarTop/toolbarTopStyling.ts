import { CSSProperties } from 'react';
import { useStyles } from './ToolbarTop.styles';
import { ToolbarTopVariant } from './ToolbarTop.types';

type Styles = ReturnType<typeof useStyles>;

/** Le socle de la barre, puis ce que sa variante en change. */
export const dispositionDeLaBarre = (styles: Styles, variant: ToolbarTopVariant) => {
  const parVariante = {
    default: {},
    large: styles.largeToolbarContainer,
    compactLarge: styles.compactLargetoolbarContainer,
  };

  return { ...styles.toolbarContainer, ...parVariante[variant] };
};

export const bordureDeLaBarre = (styles: Styles, withBorder: boolean) =>
  withBorder ? styles.toolbarInformationWithBorder : {};

export const styleDuBlocDInformation = (styles: Styles, compact: boolean) => ({
  ...styles.toolbarInformation,
  ...(compact ? styles.compactLargeInformations : {}),
});

/** Le style de l'appelant passe en dernier : il sert a corriger ce que la variante a decide. */
export const styleDuTitre = (styles: Styles, grandTitre: boolean, typographyStyle: CSSProperties = {}) => ({
  ...styles.toolbarInformationTitleText,
  ...(grandTitre ? styles.largeInformationTitleText : {}),
  ...typographyStyle,
});

export const styleDuSousTitre = (styles: Styles, grandTitre: boolean, typographyStyle: CSSProperties = {}) => ({
  ...styles.toolbarInformationTitleSubText,
  ...(grandTitre ? styles.largeToolbarInformationTitleSubText : {}),
  ...typographyStyle,
});
