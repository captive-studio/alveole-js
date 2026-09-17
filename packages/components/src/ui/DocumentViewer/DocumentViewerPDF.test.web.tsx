import { act, fireEvent } from '@testing-library/react';
import { renderWeb, screen } from '../../../__tests__/helpers/renderWeb';
import { DocumentViewerPDF } from './DocumentViewerPDF';

const mockDocument = { getPage: jest.fn().mockReturnValue(new Promise(() => {})), destroy: jest.fn() };

jest.mock('./chargementDePdfJs', () => ({ loadPdfJs: jest.fn() }));

// jsdom n'implemente pas `ResizeObserver` : la mesure du cadre repose dessus (voir
// useTailleParResizeObserver), et ce faux suffit a la rendre observable sous test sans jamais
// declencher d'observation reelle. L'assignation est typee, sans cast : c'est ce qui force le
// faux a respecter la signature du vrai `ResizeObserver` - un constructeur a un argument de
// moins ou un `unobserve` manquant serait refuse ici par le compilateur, pas seulement par un
// analyseur externe.
class ResizeObserverDeTest implements ResizeObserver {
  constructor(private readonly callback: ResizeObserverCallback) {}
  observe(_element: Element) {}
  unobserve(_element: Element) {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverDeTest;

const { loadPdfJs } = jest.requireMock('./chargementDePdfJs') as { loadPdfJs: jest.Mock };

/** Simule le pdfjs charge dynamiquement, avec un document qui resout ou echoue. */
const pdfjsQuiCharge = (chargement: { promise: Promise<unknown>; destroy: jest.Mock }) => ({
  getDocument: jest.fn(() => chargement),
});

const chargementQuiResout = (resultat: unknown) => ({ promise: Promise.resolve(resultat), destroy: jest.fn() });
const chargementQuiEchoue = (erreur: unknown) => {
  const promise = Promise.reject(erreur);
  // Le rejet est cree ici, avant que `act()` ne l'attende plus bas : sans ce filet immediat,
  // Node le signale comme rejet non gere entre les deux.
  promise.catch(() => undefined);

  return { promise, destroy: jest.fn() };
};

beforeEach(() => {
  jest.clearAllMocks();
  loadPdfJs.mockResolvedValue(pdfjsQuiCharge(chargementQuiResout(mockDocument)));
});

/** Attend que la promesse de `loadPdfJs`, puis celle du document, se soient resolues. */
const attendreLeChargement = async () => {
  await act(async () => {
    const pdfjs = await loadPdfJs();
    await pdfjs.getDocument().promise.catch(() => undefined);
  });
};

describe('DocumentViewerPDF, ce qu il affiche selon le chargement', () => {
  it('ne montre pas l erreur tant que le document n a pas echoue', async () => {
    renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} />);

    await attendreLeChargement();

    expect(screen.queryByText('Le PDF ne peut pas être affiché')).toBeNull();
  });

  it('previent l appelant une fois le document charge', async () => {
    const onReady = jest.fn();
    renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} onReady={onReady} />);

    await attendreLeChargement();

    expect(onReady).toHaveBeenCalledWith(mockDocument);
  });

  it('affiche l erreur quand le chargement du document echoue', async () => {
    const chargement = chargementQuiEchoue(new Error('corrompu'));
    loadPdfJs.mockResolvedValue(pdfjsQuiCharge(chargement));
    renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} />);

    await act(async () => {
      const pdfjs = await loadPdfJs();
      await pdfjs.getDocument().promise.catch(() => undefined);
    });

    expect(screen.getByText('Le PDF ne peut pas être affiché')).toBeTruthy();
  });

  // Une navigation rapide entre deux fiches annule le chargement precedent : ce n'est pas
  // une erreur a montrer, contrairement a un document reellement corrompu.
  it('n affiche pas d erreur quand le chargement est annule', async () => {
    const erreurDAnnulation = new Error('annule');
    erreurDAnnulation.name = 'AbortException';
    const chargement = chargementQuiEchoue(erreurDAnnulation);
    loadPdfJs.mockResolvedValue(pdfjsQuiCharge(chargement));
    renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} />);

    await act(async () => {
      const pdfjs = await loadPdfJs();
      await pdfjs.getDocument().promise.catch(() => undefined);
    });

    expect(screen.queryByText('Le PDF ne peut pas être affiché')).toBeNull();
  });

  it('accepte un libelle d erreur personnalise', async () => {
    const chargement = chargementQuiEchoue(new Error('corrompu'));
    loadPdfJs.mockResolvedValue(pdfjsQuiCharge(chargement));
    renderWeb(
      <DocumentViewerPDF source="x.pdf" page={1} rotation={0} errorLabel="Impossible d'afficher ce document" />,
    );

    await act(async () => {
      const pdfjs = await loadPdfJs();
      await pdfjs.getDocument().promise.catch(() => undefined);
    });

    expect(screen.getByText("Impossible d'afficher ce document")).toBeTruthy();
  });

  // Changer de source doit laisser une chance au nouveau document : l'erreur du precedent
  // ne doit pas rester affichee dessus.
  it('efface l erreur precedente quand la source change', async () => {
    const echec = chargementQuiEchoue(new Error('corrompu'));
    loadPdfJs.mockResolvedValue(pdfjsQuiCharge(echec));
    const { rerender } = renderWeb(<DocumentViewerPDF source="a.pdf" page={1} rotation={0} />);
    await act(async () => {
      const pdfjs = await loadPdfJs();
      await pdfjs.getDocument().promise.catch(() => undefined);
    });
    expect(screen.getByText('Le PDF ne peut pas être affiché')).toBeTruthy();

    loadPdfJs.mockResolvedValue(pdfjsQuiCharge(chargementQuiResout(mockDocument)));
    rerender(<DocumentViewerPDF source="b.pdf" page={1} rotation={0} />);

    expect(screen.queryByText('Le PDF ne peut pas être affiché')).toBeNull();
  });
});

describe('DocumentViewerPDF, le zoom au survol', () => {
  /** L'echelle appliquee au canvas : portee par la boite qui l entoure. */
  const echelleDuCanvas = (conteneur: HTMLElement) => {
    const enveloppe = conteneur.querySelector('canvas')!.parentElement as HTMLElement;
    return window.getComputedStyle(enveloppe).transform;
  };

  it('grossit la page quand le pointeur la survole', async () => {
    const { container } = renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} />);
    await attendreLeChargement();
    const zone = container.querySelector('document-viewer-pdf')!;

    fireEvent.mouseEnter(zone);

    expect(echelleDuCanvas(container)).toContain('2');
  });

  it('revient a l echelle normale quand le pointeur s en va', async () => {
    const { container } = renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} />);
    await attendreLeChargement();
    const zone = container.querySelector('document-viewer-pdf')!;

    fireEvent.mouseEnter(zone);
    fireEvent.mouseLeave(zone);

    expect(echelleDuCanvas(container)).not.toContain('2');
  });
});

describe('DocumentViewerPDF, le rendu de la page', () => {
  const cadreDeTailleValide = () =>
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 800,
      height: 600,
      top: 0,
      left: 0,
      right: 800,
      bottom: 600,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

  afterEach(() => jest.restoreAllMocks());

  it('ne demande pas la page tant que le cadre n a pas ete mesure', async () => {
    renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} />);

    await attendreLeChargement();

    expect(mockDocument.getPage).not.toHaveBeenCalled();
  });

  it('demande la page des que le cadre est mesure', async () => {
    cadreDeTailleValide();
    renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} />);

    await attendreLeChargement();

    expect(mockDocument.getPage).toHaveBeenCalledWith(1);
  });

  // Une navigation rapide entre deux pages annule le rendu precedent : ce n'est pas une
  // erreur a montrer, contrairement a une page reellement introuvable.
  it('n affiche pas d erreur quand le rendu de la page est annule', async () => {
    cadreDeTailleValide();
    const erreurDAnnulation = new Error('annule');
    erreurDAnnulation.name = 'AbortException';
    const document = { getPage: jest.fn().mockRejectedValue(erreurDAnnulation), destroy: jest.fn() };
    document.getPage().catch(() => undefined);
    loadPdfJs.mockResolvedValue(pdfjsQuiCharge(chargementQuiResout(document)));

    renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} />);
    await attendreLeChargement();
    await act(() => document.getPage().catch(() => undefined));

    expect(screen.queryByText('Le PDF ne peut pas être affiché')).toBeNull();
  });

  it('affiche l erreur quand la page ne peut pas se rendre', async () => {
    cadreDeTailleValide();
    const document = { getPage: jest.fn().mockRejectedValue(new Error('page corrompue')), destroy: jest.fn() };
    document.getPage().catch(() => undefined);
    loadPdfJs.mockResolvedValue(pdfjsQuiCharge(chargementQuiResout(document)));

    renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} />);
    await attendreLeChargement();
    await act(() => document.getPage().catch(() => undefined));

    expect(screen.getByText('Le PDF ne peut pas être affiché')).toBeTruthy();
  });
});

describe('DocumentViewerPDF, ce qu il detruit', () => {
  it('detruit le document precedent une fois le nouveau charge', async () => {
    const premier = { getPage: jest.fn().mockReturnValue(new Promise(() => {})), destroy: jest.fn() };
    const second = { getPage: jest.fn().mockReturnValue(new Promise(() => {})), destroy: jest.fn() };
    loadPdfJs.mockResolvedValue(pdfjsQuiCharge(chargementQuiResout(premier)));
    const { rerender } = renderWeb(<DocumentViewerPDF source="a.pdf" page={1} rotation={0} />);
    await attendreLeChargement();

    loadPdfJs.mockResolvedValue(pdfjsQuiCharge(chargementQuiResout(second)));
    rerender(<DocumentViewerPDF source="b.pdf" page={1} rotation={0} />);
    await attendreLeChargement();

    expect(premier.destroy).toHaveBeenCalled();
  });

  it('detruit le document au demontage', async () => {
    const { unmount } = renderWeb(<DocumentViewerPDF source="x.pdf" page={1} rotation={0} />);
    await attendreLeChargement();

    unmount();

    expect(mockDocument.destroy).toHaveBeenCalled();
  });
});
