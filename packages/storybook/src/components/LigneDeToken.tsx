import { Box, Link, Typography, useToast } from '@alveole/components';
import { contrastRatio, Spacings, useTheme } from '@alveole/theme';
import type React from 'react';
import { Pressable } from 'react-native';
import type { Consommateur, TokenSemantique } from '../couleurs/catalogueDesCouleurs';
import { contrasteDuToken } from '../couleurs/contrasteDuToken';
import { copier } from '../pressePapiers';
import { rapport } from '../screens/presentationDesNuances';

/**
 * Sur le web, Pressable rend un `<button>`, qui centre son texte. Box ne transmet pas
 * `textAlign` : chaque texte de la ligne se cale donc lui-meme a gauche.
 */
const Texte = (props: React.ComponentProps<typeof Typography>) => <Typography textAlign="left" {...props} />;

/** La largeur des colonnes nuance et hex : alignees d'une ligne a l'autre. */
const LARGEUR_DE_COLONNE = 160;

/** L'intitule devant les consommateurs : un token deprecie encore cite est une migration restante. */
const intituleDesConsommateurs = (consommateurs: Consommateur[], deprecie: boolean) => {
  if (consommateurs.length === 0) return { texte: 'sans usage', enMigration: false };
  return deprecie ? { texte: 'Encore utilisé par', enMigration: true } : { texte: 'Utilisé par', enMigration: false };
};

/**
 * Les composants qui citent le token, chacun lie a sa page du catalogue. Hors de la ligne
 * pressable : un lien ne s'imbrique pas dans le `<button>` qu'elle rend sur le web.
 */
const UtilisePar = ({ consommateurs, deprecie }: { consommateurs: Consommateur[]; deprecie: boolean }) => {
  const { color } = useTheme();
  const intitule = intituleDesConsommateurs(consommateurs, deprecie);

  return (
    <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacings['1W'], paddingLeft: Spacings['1W'] }}>
      <Texte
        style={{ color: intitule.enMigration ? color.light.text['default-warning'] : color.light.text['mention-grey'] }}
      >
        {intitule.texte}
      </Texte>
      {consommateurs.map(({ nom, story }) =>
        story ? (
          <Link key={nom} href={`/components/${encodeURIComponent(story)}`}>
            {nom}
          </Link>
        ) : (
          <Texte key={nom}>{nom}</Texte>
        ),
      )}
    </Box>
  );
};

/** Le rapport du token sur son fond, puis son verdict quand il a un sens sans contexte. */
const Contraste = ({ token, fondParDefaut }: { token: TokenSemantique; fondParDefaut: string }) => {
  const contraste = contrasteDuToken(token, { fondParDefaut, contraste: contrastRatio });
  return (
    <Box style={{ width: LARGEUR_DE_COLONNE }}>
      {contraste && <Texte>{`${rapport(contraste.ratio)} sur ${contraste.fond}`}</Texte>}
      {contraste?.verdict && <Texte>{contraste.verdict}</Texte>}
    </Box>
  );
};

/** Une ligne de la page des tokens : swatch, chemin complet, nuance referencee et hex. */
export const LigneDeToken = ({ token, fondParDefaut }: { token: TokenSemantique; fondParDefaut: string }) => {
  const { color } = useTheme();
  const toast = useToast();
  const nuance = token.nuance ? `${token.nuance.echelle} ${token.nuance.numero}` : 'Valeur directe';

  const copierLaValeur = () => {
    copier(token.hex, () => toast.present('Copié !', token.hex, { variant: 'success', duration: 1500 }));
  };

  return (
    <Box>
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
            {token.usage && <Texte style={{ color: color.light.text['mention-grey'] }}>{token.usage}</Texte>}
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
          <Contraste token={token} fondParDefaut={fondParDefaut} />
        </Box>
      </Pressable>
      {token.consommateurs && <UtilisePar consommateurs={token.consommateurs} deprecie={token.deprecie} />}
    </Box>
  );
};
