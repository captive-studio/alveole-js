import ReactSignature, { SignatureRef } from '@uiw/react-signature';
import * as React from 'react';
import { Box } from '../../core/Box';
import { SignatureProps } from './Signature';
import { useStyles } from './Signature.styles';
import { SignatureHeader } from './SignatureHeader';

// Conversion pure du trace en data-URL : elle ne depend ni des props ni de l'etat, et la garder
// dans le corps du composant la faisait redefinir a chaque rendu pour rien.
const serializeSvgToBase64 = (svg: SVGSVGElement): Promise<string> =>
  new Promise(resolve => {
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.readAsDataURL(blob);
  });

export const Signature = (props: SignatureProps) => {
  const {
    height,
    style,
    date = new Date(),
    dateLabel = 'Le',
    clearButtonLabel = 'Effacer',
    onChange,
    ...boxProps
  } = props;

  const styles = useStyles();
  const signatureRef = React.useRef<SignatureRef | null>(null);
  const [signatureInstanceVersion, setSignatureInstanceVersion] = React.useState(0);

  React.useEffect(() => {
    const svgEl = signatureRef.current?.svg;
    if (!svgEl) return;

    const handlePointerUp = async () => {
      const svgEl = signatureRef.current?.svg;
      if (!svgEl) return;
      const base64 = await serializeSvgToBase64(svgEl);
      onChange(base64);
    };

    svgEl.addEventListener('pointerup', handlePointerUp);
    return () => {
      svgEl.removeEventListener('pointerup', handlePointerUp);
    };
  }, [signatureInstanceVersion, onChange]);

  // Rappel de `ref` stable : défini en ligne, il changeait d'identité à chaque rendu, donc
  // React le détachait et le rattachait, et chaque rattachement relançait un rendu. La
  // fiche du catalogue ne s'affichait plus du tout (« Maximum update depth exceeded »).
  const attacherSignature = React.useCallback((instance: SignatureRef | null) => {
    if (!instance) return;
    signatureRef.current = instance;
    setSignatureInstanceVersion(version => version + 1);
  }, []);

  const handleClear = () => {
    signatureRef.current?.clear();
    onChange(null);
  };

  return (
    <Box tag="signature" style={[styles.container, style]} {...boxProps}>
      <SignatureHeader date={date} dateLabel={dateLabel} clearButtonLabel={clearButtonLabel} onClear={handleClear} />
      <Box style={{ ...styles.signatureWeb, height }}>
        <ReactSignature
          ref={attacherSignature}
          style={styles.signatureWeb}
          fill={styles.pen.color}
          options={{ size: 12, smoothing: 0.15, thinning: 0.73, streamline: 0.5 }}
        />
      </Box>
    </Box>
  );
};
