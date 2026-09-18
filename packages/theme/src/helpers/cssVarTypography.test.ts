import { toCSSVarTypography } from './cssVarTypography';

// Une feuille de l'arbre typographique se reconnait a son `fontSize` numerique. Sur web,
// ses metriques ne sont plus des valeurs mais des references aux variables CSS du theme,
// dont le nom vient du chemin dans l'arbre (assaini segment par segment).
describe('toCSSVarTypography', () => {
  it('remplace les metriques d une feuille par des references de variables CSS', () => {
    const typography = { 'Titres alternatifs': { XS: { fontSize: 48 } } };

    expect(toCSSVarTypography(typography)).toEqual({
      'Titres alternatifs': {
        XS: {
          fontSize: 'var(--typography-titres-alternatifs-xs-font-size)',
          fontFamily: 'var(--typography-titres-alternatifs-xs-font-family)',
          fontWeight: 'var(--typography-titres-alternatifs-xs-font-weight)',
          lineHeight: 'var(--typography-titres-alternatifs-xs-line-height)',
        },
      },
    });
  });

  // Un `letterSpacing` non nul est une metrique a part entiere : la feuille recoit sa
  // reference de variable au meme titre que la taille ou la hauteur de ligne.
  it('reference l espacement des lettres quand il est non nul', () => {
    const typography = { Etiquettes: { XS: { fontSize: 12, letterSpacing: -0.5 } } };

    expect(toCSSVarTypography(typography).Etiquettes.XS.letterSpacing).toBe(
      'var(--typography-etiquettes-xs-letter-spacing)',
    );
  });

  // `letter-spacing: 0` est la valeur par defaut de CSS : lui donner une variable n'ajouterait
  // qu'une reference inerte. La valeur nulle reste telle quelle, sans devenir une variable.
  it('ne transforme pas en variable un espacement des lettres nul', () => {
    const typography = { Corps: { M: { fontSize: 16, letterSpacing: 0 } } };

    expect(toCSSVarTypography(typography).Corps.M.letterSpacing).toBe(0);
  });

  // Certaines feuilles imposent une casse (`uppercase` sur les etiquettes) : c'est une
  // metrique de rendu, elle passe donc elle aussi par une variable.
  it('reference la transformation de casse quand elle est presente', () => {
    const typography = { Etiquettes: { XS: { fontSize: 12, textTransform: 'uppercase' } } };

    expect(toCSSVarTypography(typography).Etiquettes.XS.textTransform).toBe(
      'var(--typography-etiquettes-xs-text-transform)',
    );
  });

  // Seules les feuilles (objets a `fontSize`) sont traduites. Une valeur primitive croisee
  // dans l'arbre n'est pas une feuille typographique : elle traverse la transformation intacte.
  it('laisse intactes les valeurs non-objet rencontrees dans l arbre', () => {
    const typography = { Corps: { M: { fontSize: 16 }, defaut: 'M' } };

    expect(toCSSVarTypography(typography).Corps.defaut).toBe('M');
  });
});
