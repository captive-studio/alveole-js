import { useTheme } from '@alveole/theme';
import * as React from 'react';
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';
import { Box, BoxProps } from '../../core/Box';
import { useStyles } from './Signature.styles';
import { SignatureHeader } from './SignatureHeader';

export type SignatureProps = Omit<BoxProps, 'children'> & {
  height: number;
  date?: string | Date;
  dateLabel?: string;
  clearButtonLabel?: string;
  onChange: (value: string | null) => void;
  onBegin?: () => void;
  onEnd?: () => void;
};

// Le canevas natif est une WebView : son apparence ne se regle qu'en lui injectant une feuille
// de style. La construire hors du composant garde cette chaine CSS hors de la fonction de rendu,
// dont elle occupait le quart sans rien devoir a l'etat.
const feuilleDeStyleCanvas = ({
  height,
  rayon,
  couleurBordure,
}: {
  height: number;
  rayon: string | number;
  couleurBordure: string;
}) => `
    .m-signature-pad {
      box-shadow: none;
      border-radius: ${rayon}px;
      border-color: ${couleurBordure};
      border-width: 2px;
      height: ${height}px;
    }
    .m-signature-pad--body {border: none; overflow: hidden; border-radius: ${rayon}px}
    .m-signature-pad--footer {display: none; margin: 0px;}
    .button, .description {display: none;}
  `;

// La WebView ne rend le trace qu'a la demande : chaque fin de geste replanifie une lecture 100 ms
// plus tard, si bien qu'un trace continu n'en declenche qu'une. Le minuteur doit etre annule a
// l'effacement comme au demontage, sous peine de lire un canevas disparu. Ce cycle de vie est la
// seule logique du composant : l'isoler laisse la fonction de rendu au rendu.
const useLectureDifferee = (ref: React.RefObject<SignatureViewRef | null>, onChange: SignatureProps['onChange']) => {
  const lectureEnAttente = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const annulerLecture = () => {
    if (lectureEnAttente.current) clearTimeout(lectureEnAttente.current);
    lectureEnAttente.current = null;
  };

  React.useEffect(() => annulerLecture, []);

  return {
    handleOk: (signature: string | null) => onChange(signature),
    handleEnd: () => {
      annulerLecture();
      lectureEnAttente.current = setTimeout(() => {
        ref.current?.readSignature();
        lectureEnAttente.current = null;
      }, 100);
    },
    handleClear: () => {
      annulerLecture();
      onChange(null);
    },
  };
};

export const Signature = (props: SignatureProps) => {
  const { height, date = new Date(), dateLabel = 'Le', clearButtonLabel = 'Effacer', onChange, onBegin, onEnd } = props;

  const { color, spacing, spacingValue } = useTheme();
  const styles = useStyles();

  const ref = React.useRef<SignatureViewRef>(null);
  const { handleOk, handleEnd, handleClear } = useLectureDifferee(ref, onChange);

  const webviewHeightWithBorders = height + spacingValue('200') + spacingValue('100') + 3;

  return (
    <Box height={webviewHeightWithBorders} width={'100%'}>
      <SignatureHeader
        date={date}
        dateLabel={dateLabel}
        clearButtonLabel={clearButtonLabel}
        onClear={() => ref.current?.clearSignature()}
      />
      <Box tag="signature" height={'100%'} onTouchEnd={onEnd} maxH={webviewHeightWithBorders} style={styles.container}>
        <SignatureCanvas
          ref={ref}
          onOK={handleOk}
          onEnd={handleEnd}
          onClear={handleClear}
          penColor={styles.pen.color}
          backgroundColor={styles.pen.backgroundColor}
          dotSize={3.5}
          minWidth={3}
          maxWidth={4}
          onBegin={onBegin}
          androidHardwareAccelerationDisabled
          webviewProps={{ cacheEnabled: false, androidLayerType: 'software' }}
          webStyle={feuilleDeStyleCanvas({
            height,
            rayon: spacing('3V'),
            couleurBordure: color.border['default-grey'],
          })}
        />
      </Box>
    </Box>
  );
};
