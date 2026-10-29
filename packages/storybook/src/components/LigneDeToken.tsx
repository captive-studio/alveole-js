import { Box, Typography, useToast } from '@alveole/components';
import { Spacings, useTheme } from '@alveole/theme';
import type React from 'react';
import { Pressable } from 'react-native';
import type { TokenSemantique } from '../couleurs/catalogueDesCouleurs';
import { copier } from '../pressePapiers';

/**
 * Sur le web, Pressable rend un `<button>`, qui centre son texte. Box ne transmet pas
 * `textAlign` : chaque texte de la ligne se cale donc lui-meme a gauche.
 */
const Texte = (props: React.ComponentProps<typeof Typography>) => <Typography textAlign="left" {...props} />;

/** La largeur des colonnes nuance et hex : alignees d'une ligne a l'autre. */
const LARGEUR_DE_COLONNE = 160;

/** Une ligne de la page des tokens : swatch, chemin complet, nuance referencee et hex. */
export const LigneDeToken = ({ token }: { token: TokenSemantique }) => {
  const { color } = useTheme();
  const toast = useToast();
  const nuance = token.nuance ? `${token.nuance.echelle} ${token.nuance.numero}` : 'Valeur directe';

  const copierLaValeur = () => {
    copier(token.hex, () => toast.present('Copié !', token.hex, { variant: 'success', duration: 1500 }));
  };

  return (
    <Pressable accessibilityRole="button" nativeID={token.chemin} onPress={copierLaValeur}>
      <Box
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacings['2W'],
          padding: Spacings['1W'],
        }}
      >
        <Box
          style={{
            width: 32,
            height: 32,
            backgroundColor: token.hex,
            borderWidth: 1,
            borderColor: color.light.border['default-grey'],
          }}
        />
        <Box style={{ flex: 1 }}>
          <Texte style={{ fontFamily: 'monospace', textDecorationLine: token.deprecie ? 'line-through' : 'none' }}>
            {token.chemin}
          </Texte>
          {token.deprecie && (
            <>
              <Texte style={{ color: color.light.text['default-warning'] }}>{'Déprécié'}</Texte>
              {token.remplacant && (
                <Texte style={{ color: color.light.text['mention-grey'] }}>{token.remplacant}</Texte>
              )}
            </>
          )}
        </Box>
        <Texte style={{ width: LARGEUR_DE_COLONNE }}>{nuance}</Texte>
        <Texte style={{ width: LARGEUR_DE_COLONNE, fontFamily: 'monospace' }}>{token.hex}</Texte>
      </Box>
    </Pressable>
  );
};
