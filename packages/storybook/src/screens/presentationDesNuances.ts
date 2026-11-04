import { useTheme } from '@alveole/theme';
import type { Nuance } from '../couleurs/catalogueDesCouleurs';

export const pageDesTokens = '/theme/tokens-semantiques';

/** Les styles de la page, tous tires du theme. */
export const useStylesDesNuances = () => {
  const { text, color } = useTheme();
  const { text: texte, border, background } = color.light;
  return {
    titreDeFamille: text.Titres['H4 - SM'],
    nomFort: text['Corps de texte'].SM.Bold,
    petit: text['Corps de texte'].XS.Regular,
    petitGras: text['Corps de texte'].XS.Bold,
    rubrique: { ...text['Corps de texte'].XS.CapsBold, color: texte['mention-grey'] },
    discret: { color: texte['mention-grey'] },
    alerte: { color: texte['default-warning'] },
    mono: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    filet: border['default-grey'],
    surbrillance: background['alt-grey'],
  };
};

/** Une nuance se designe par son echelle et son numero : `Neutre 900`. */
export const nomDe = (nuance: Nuance) => `${nuance.echelle} ${nuance.numero}`;

/** Un nombre et son mot, accorde : `1 token`, `2 tokens`. */
export const compte = (nombre: number, mot: string) => `${nombre} ${mot}${nombre > 1 ? 's' : ''}`;

/** Une nuance qu'aucun token actif ne cite : un token deprecie ne la fait pas vivre. */
export const sansUsage = (nuance: Nuance) => nuance.tokens.length === 0;

export const libelleSansUsage = 'sans usage';

/** La largeur d'une colonne etroite : numero, hex, compte hors bande. */
export const largeurDeColonne = 72;
