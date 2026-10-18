import { CSSProperties } from 'react';
import { versStyleTamagui } from './versStyleTamagui';

// `Cible` est la vue ou le texte Tamagui qui recoit les pseudo-etats : chacun garde le type
// que cette cible lui donne.
type StyleDe<Cible, Cle extends string> = Cle extends keyof Cible ? Cible[Cle] : never;

type PseudoEtat = 'pressStyle' | 'focusStyle' | 'focusVisibleStyle' | 'enterStyle' | 'exitStyle' | 'disabledStyle';

type PseudoEtats<Cible> = { hoverStyle?: CSSProperties } & { [Cle in PseudoEtat]?: StyleDe<Cible, Cle> };

/**
 * Le seul endroit ou les pseudo-etats poses par core rejoignent Tamagui. `Box` et
 * `Typography` repandent `pseudoEtats` sur leur vue Tamagui et le reste a part, si bien
 * qu'aucun pseudo-etat ne la rejoint par un autre chemin : la bascule vers les clauses de
 * Tamagui v3 (ADR 0031) ne modifiera que cette fonction.
 */
export const pseudoEtatsTamagui =
  <Cible>() =>
  <Props extends PseudoEtats<Cible>>(props: Props) => {
    const { hoverStyle, pressStyle, focusStyle, focusVisibleStyle, enterStyle, exitStyle, disabledStyle, ...autres } =
      props;
    return {
      pseudoEtats: {
        hoverStyle: versStyleTamagui<StyleDe<Cible, 'hoverStyle'>>(hoverStyle),
        pressStyle,
        focusStyle,
        focusVisibleStyle,
        enterStyle,
        exitStyle,
        disabledStyle,
      },
      autres,
    };
  };
