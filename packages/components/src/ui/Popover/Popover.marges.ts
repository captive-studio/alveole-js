// Un popover se decale d'un cran a l'oppose de son ancrage, pour ne pas coller au declencheur.
// Ancre a gauche, il pousse sa marge a droite, et ainsi de suite. Ces quatre cas tenaient dans
// quatre ternaires au milieu du composant, ou ils faisaient a eux seuls la moitie de sa complexite.
const MARGE_PAR_ANCRAGE = { left: 'mr', top: 'mb', right: 'ml', bottom: 'mt' } as const;

export const margesDePopover = (placement: string | undefined, cran: string | number) =>
  Object.fromEntries(
    Object.entries(MARGE_PAR_ANCRAGE)
      .filter(([ancrage]) => placement?.includes(ancrage))
      .map(([, marge]) => [marge, cran]),
  );
