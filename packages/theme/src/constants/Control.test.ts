import { ControlSizes } from './Control';

describe('ControlSizes', () => {
  // L'echelle actuelle du Button n'est pas monotone : xs mesure 36 px, soit plus que
  // sm a 32 px. La couche control existe d'abord pour rendre cette regression impossible.
  it('croit strictement du plus petit cran au plus grand', () => {
    const hauteurs = (['xs', 'sm', 'md', 'lg', 'xl'] as const).map(cran => ControlSizes[cran].height);

    expect(hauteurs).toEqual([...hauteurs].sort((a, b) => a - b));
    expect(new Set(hauteurs).size).toBe(hauteurs.length);
  });

  it('associe un padding horizontal et un espacement interne a chaque cran', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach(cran => {
      expect(ControlSizes[cran].paddingInline).toBeGreaterThan(0);
      expect(ControlSizes[cran].gap).toBeGreaterThan(0);
    });
  });
});
