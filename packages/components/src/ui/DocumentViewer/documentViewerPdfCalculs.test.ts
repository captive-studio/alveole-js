import {
  echelleAjustee,
  estUneErreurDAnnulationPdf,
  positionEnPourcentage,
  tailleValidee,
} from './documentViewerPdfCalculs';

describe('estUneErreurDAnnulationPdf', () => {
  it('reconnait une exception nommee RenderingCancelledException', () => {
    const erreur = new Error('x');
    erreur.name = 'RenderingCancelledException';
    expect(estUneErreurDAnnulationPdf(erreur)).toBe(true);
  });

  it('reconnait une exception nommee AbortException', () => {
    const erreur = new Error('x');
    erreur.name = 'AbortException';
    expect(estUneErreurDAnnulationPdf(erreur)).toBe(true);
  });

  it('reconnait un worker termine', () => {
    expect(estUneErreurDAnnulationPdf(new Error('Worker was terminated'))).toBe(true);
  });

  it('reconnait un worker deja detruit', () => {
    expect(estUneErreurDAnnulationPdf(new Error("Cannot read properties of null (reading 'sendWithPromise')"))).toBe(
      true,
    );
  });

  it('ne reconnait pas une erreur ordinaire', () => {
    expect(estUneErreurDAnnulationPdf(new Error('fichier corrompu'))).toBe(false);
  });

  // Ce que pdfjs rejette n'est pas toujours une instance d'Error : une promesse peut rejeter
  // avec n'importe quelle valeur.
  it('ne reconnait pas une valeur qui n est pas une erreur', () => {
    expect(estUneErreurDAnnulationPdf('echec')).toBe(false);
  });
});

describe('echelleAjustee', () => {
  it('reduit l echelle pour faire tenir la page dans le cadre le plus etroit', () => {
    expect(echelleAjustee({ pageWidth: 200, pageHeight: 100, viewerWidth: 100, viewerHeight: 100 })).toBe(0.5);
  });

  it('retient la plus petite des deux dimensions contraignantes', () => {
    expect(echelleAjustee({ pageWidth: 100, pageHeight: 200, viewerWidth: 100, viewerHeight: 100 })).toBe(0.5);
  });

  it('multiplie l echelle ajustee par le zoom demande', () => {
    expect(echelleAjustee({ pageWidth: 200, pageHeight: 100, viewerWidth: 100, viewerHeight: 100, zoom: 2 })).toBe(1);
  });
});

describe('positionEnPourcentage', () => {
  it('rend le centre du cadre en pourcentage', () => {
    expect(
      positionEnPourcentage({ clientX: 50, clientY: 25, rect: { left: 0, top: 0, width: 100, height: 50 } }),
    ).toEqual({
      x: 50,
      y: 50,
    });
  });

  // Le pointeur peut deborder du cadre pendant un glisser : la position ne doit jamais sortir
  // de la surface qu'elle decrit, ni au-dela du bord ni en-deca de zero.
  it('borne la position en haut du cadre quand le pointeur deborde par le bas ou la gauche', () => {
    expect(
      positionEnPourcentage({ clientX: -20, clientY: -10, rect: { left: 0, top: 0, width: 100, height: 50 } }),
    ).toEqual({ x: 0, y: 0 });
  });

  it('borne la position en bas du cadre quand le pointeur deborde par le haut ou la droite', () => {
    expect(
      positionEnPourcentage({ clientX: 150, clientY: 200, rect: { left: 0, top: 0, width: 100, height: 50 } }),
    ).toEqual({ x: 100, y: 100 });
  });
});

describe('tailleValidee', () => {
  it('rend la taille quand les deux dimensions sont positives', () => {
    expect(tailleValidee({ width: 320, height: 240 })).toEqual({ width: 320, height: 240 });
  });

  it('rend null quand la largeur est nulle', () => {
    expect(tailleValidee({ width: 0, height: 240 })).toBeNull();
  });

  it('rend null quand la hauteur est nulle', () => {
    expect(tailleValidee({ width: 320, height: 0 })).toBeNull();
  });

  it('rend null quand une dimension est absente', () => {
    expect(tailleValidee({ width: undefined, height: 240 })).toBeNull();
  });
});
