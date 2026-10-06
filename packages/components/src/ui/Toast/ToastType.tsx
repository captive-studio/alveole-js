import React from 'react';
import { Box } from '../../core/Box';
import { Leading, LeadingSlot } from '../Leading';
import { useStyles } from './Toast.styles';
import type { ToastAPIOptions } from './ToastContext';

type ToastVariant = NonNullable<ToastAPIOptions['variant']>;

export type ToastTypeProps = {
  variant: ToastVariant;
  leading?: Leading;
};

/**
 * Ce que la pastille du toast affiche : l'icone du `variant` par defaut, remplacee par
 * `leading` quand l'appelant en donne un, et retiree par `leading={null}`.
 */
export const contenuDuToast = (variant: ToastVariant, leading?: Leading): Leading => {
  if (leading !== undefined) return leading;
  switch (variant) {
    case 'success':
      return 'CircleCheck';
    case 'error':
      return 'OctagonAlert';
    case 'info':
      return 'Info';
    case 'warning':
      return 'TriangleAlert';
    default:
      return null;
  }
};

export function ToastType({ variant, leading }: ToastTypeProps) {
  const styles = useStyles();

  const iconBlockStyle = React.useMemo(() => {
    switch (variant) {
      case 'default':
        return styles.iconBlockDefault;
      case 'success':
        return styles.iconBlockSuccess;
      case 'error':
        return styles.iconBlockError;
      case 'info':
        return styles.iconBlockInfo;
      case 'warning':
        return styles.iconBlockWarning;
      default:
        ((_: never) => {})(variant);
    }
  }, [styles, variant]);

  const contenu = contenuDuToast(variant, leading);

  if (contenu == null) return null;

  return (
    <Box style={[styles.iconBlock, iconBlockStyle]}>
      <LeadingSlot contenu={contenu} apparence={{ size: 'sm', color: '#FFFFFF' }} />
    </Box>
  );
}
