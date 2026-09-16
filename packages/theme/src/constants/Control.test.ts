import { ControlSizes } from './Control';

const CRANS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

describe.each(['desktop', 'mobile'] as const)('ControlSizes %s', densite => {
  // L'echelle actuelle du Button n'est pas monotone : xs mesure 36 px, soit plus que
  // sm a 32 px. La couche control existe d'abord pour rendre cette regression impossible.
  it('croit strictement du plus petit cran au plus grand', () => {
    const hauteurs = CRANS.map(cran => ControlSizes[densite][cran].height);

    expect(hauteurs).toEqual([...hauteurs].sort((a, b) => a - b));
    expect(new Set(hauteurs).size).toBe(hauteurs.length);
  });

  it('associe un padding horizontal et un espacement interne a chaque cran', () => {
    CRANS.forEach(cran => {
      expect(ControlSizes[densite][cran].paddingInline).toBeGreaterThan(0);
      expect(ControlSizes[densite][cran].gap).toBeGreaterThan(0);
    });
  });

});

// Les outils pros (Primer, Atlassian) sont compacts, le grand public tactile (Base) est
// genereux. Captive est pro sur desktop et au doigt sur mobile : une valeur unique
// trancherait arbitrairement en faveur d'un des deux usages (ADR 0013).
it('est plus compacte sur desktop que sur mobile', () => {
  expect(ControlSizes.desktop.md.height).toBeLessThan(ControlSizes.mobile.md.height);
});
