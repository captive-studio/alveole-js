import { fontVariableLines, metricVariableLines, typographyVariableLines } from './typographyVariables';

jest.mock('react-native', () => ({ Platform: { OS: 'web', select: (o: Record<string, unknown>) => o.web } }));

describe('fontVariableLines', () => {
  // Sur le web, `fontStyle` produit la famille avec ses replis et le poids numerique.
  // Le couple identifie une police du catalogue, qui a deja ses propres variables :
  // les variables de typographie s'y referent au lieu de recopier la valeur.
  it('renvoie a la police du catalogue quand la famille et le poids l identifient', () => {
    const catalogue = new Map([[`Geist, sans-serif__600`, 'Geist-Bold']]);

    expect(
      fontVariableLines('  --typography-titres-xs', { fontFamily: 'Geist, sans-serif', fontWeight: '600' }, catalogue),
    ).toEqual([
      '  --typography-titres-xs-font-family: var(--font-Geist-Bold-family);',
      '  --typography-titres-xs-font-weight: var(--font-Geist-Bold-weight);',
    ]);
  });

  // Hors web, `fontStyle` ne pose que `fontFamily`, et il y met directement la cle du
  // catalogue : ni poids, ni famille avec replis. Le couple ne correspond alors a rien,
  // et c'est la famille elle-meme qui identifie la police.
  it('reconnait une police dont la famille est deja la cle du catalogue', () => {
    const catalogue = new Map([[`Geist, sans-serif__600`, 'Geist-Bold']]);

    expect(
      fontVariableLines('  --typography-titres-xs', { fontFamily: 'Geist-Bold', fontWeight: '' }, catalogue),
    ).toEqual([
      '  --typography-titres-xs-font-family: var(--font-Geist-Bold-family);',
      '  --typography-titres-xs-font-weight: var(--font-Geist-Bold-weight);',
    ]);
  });

  // Une police hors catalogue n'a pas de variable `--font-*` a laquelle se referer.
  // Sans ce repli, la variable pointerait vers `var(--font-undefined-family)`, que le
  // navigateur ignore : le texte retomberait sur la police heritee, sans rien signaler.
  it('ecrit la police en clair quand le catalogue ne la connait pas', () => {
    expect(
      fontVariableLines('  --typography-legal-xs', { fontFamily: 'Courier New', fontWeight: '700' }, new Map()),
    ).toEqual(['  --typography-legal-xs-font-family: Courier New;', '  --typography-legal-xs-font-weight: 700;']);
  });

  // `--font-weight: ;` est une declaration invalide : le navigateur jette la regle entiere.
  // Sans poids a ecrire, la ligne ne doit pas exister.
  it('n emet pas de poids quand la police en clair n en a pas', () => {
    expect(
      fontVariableLines('  --typography-legal-xs', { fontFamily: 'Courier New', fontWeight: '' }, new Map()),
    ).toEqual(['  --typography-legal-xs-font-family: Courier New;']);
  });
});

describe('metricVariableLines', () => {
  it('emet la taille de police en pixels', () => {
    expect(metricVariableLines('  --typography-titres-xs', { fontSize: 48 })).toEqual([
      '  --typography-titres-xs-font-size: 48px;',
    ]);
  });

  it('emet la hauteur de ligne en pixels', () => {
    expect(metricVariableLines('  --typography-titres-xs', { fontSize: 48, lineHeight: 56 })).toContain(
      '  --typography-titres-xs-line-height: 56px;',
    );
  });

  it('emet l espacement des lettres en pixels', () => {
    expect(metricVariableLines('  --typography-titres-xs', { fontSize: 48, letterSpacing: -0.5 })).toContain(
      '  --typography-titres-xs-letter-spacing: -0.5px;',
    );
  });

  // Presque tous les jetons du theme portent `letterSpacing: 0`, qui est la valeur par
  // defaut de CSS. L'emettre ajouterait une variable par jeton sans rien changer au rendu.
  it('n emet pas l espacement des lettres quand il est nul', () => {
    expect(metricVariableLines('  --typography-titres-xs', { fontSize: 48, letterSpacing: 0 })).toEqual([
      '  --typography-titres-xs-font-size: 48px;',
    ]);
  });

  it('emet la transformation de casse telle quelle', () => {
    expect(metricVariableLines('  --typography-etiquettes-xs', { fontSize: 12, textTransform: 'uppercase' })).toContain(
      '  --typography-etiquettes-xs-text-transform: uppercase;',
    );
  });
});

describe('typographyVariableLines', () => {
  // Les noms de jetons du theme contiennent des espaces, des majuscules et des virgules
  // (« Titres alternatifs », « H6 - XXS ») : le chemin dans l'arbre devient le nom de la
  // variable, assaini segment par segment.
  it('assemble le nom de la variable a partir du chemin dans l arbre', () => {
    const typography = { 'Titres alternatifs': { XS: { fontSize: 48 } } };

    expect(typographyVariableLines(typography, new Map())).toEqual([
      '  --typography-titres-alternatifs-xs-font-size: 48px;',
    ]);
  });
});
