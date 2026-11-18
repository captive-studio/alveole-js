import { Box, Button, Typography } from '@alveole/components';
import { renderSample } from '@alveole/email';
import { CustomPalette } from '@alveole/theme';
import React, { type ReactElement } from 'react';
import { Platform } from 'react-native';

const LARGEURS = { bureau: 640, mobile: 375 };

export type ApercuProps = {
  titre: string;
  mail: ReactElement;
  exemple?: Record<string, string | null>;
};

/** Le mail rendu par `@alveole/email` avec ses donnees d'exemple, en largeur bureau ou mobile. */
export const Apercu = ({ titre, mail, exemple = {} }: ApercuProps) => {
  const [largeur, setLargeur] = React.useState<keyof typeof LARGEURS>('bureau');
  const [hauteur, setHauteur] = React.useState<number>();
  const html = React.useMemo(() => renderSample(mail, exemple), [mail, exemple]);

  if (Platform.OS !== 'web') {
    return <Typography>L’aperçu d’un mail n’est disponible que sur le web.</Typography>;
  }

  return (
    <Box display="flex" gap="2W">
      <Box display="flex" flexDirection="row" gap="4W" flexWrap="wrap" style={{ justifyContent: 'flex-end' }}>
        <Box display="flex" flexDirection="row" gap="1W" role="group" aria-label="Largeur">
          <Button
            variant="secondary"
            size="sm"
            title="Bureau"
            leading="Monitor"
            selected={largeur === 'bureau'}
            onPress={() => setLargeur('bureau')}
          />
          <Button
            variant="secondary"
            size="sm"
            title="Mobile"
            leading="Smartphone"
            selected={largeur === 'mobile'}
            onPress={() => setLargeur('mobile')}
          />
        </Box>
      </Box>
      <iframe
        title={`Aperçu : ${titre}`}
        srcDoc={html}
        // L'iframe prend la hauteur du mail : ni ascenseur interne, ni vide sous un petit composant.
        onLoad={event => setHauteur(event.currentTarget.contentDocument?.documentElement.scrollHeight)}
        style={{
          width: LARGEURS[largeur],
          maxWidth: '100%',
          height: hauteur,
          border: `1px solid ${CustomPalette.light.border['default-grey']}`,
        }}
      />
    </Box>
  );
};
