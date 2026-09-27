import { pdfJsDuModule, urlDeLAssetPdfJs } from './chargementDePdfJs';

describe('urlDeLAssetPdfJs', () => {
  it('sert l asset a la racine quand l application n est montee sous aucun prefixe', () => {
    const url = urlDeLAssetPdfJs('pdf.min.mjs', {
      scriptUrl: '/_expo/static/js/web/entry.js',
      origin: 'https://exemple.test',
    });

    expect(url).toBe('https://exemple.test/pdf.min.mjs');
  });

  // L'application peut etre servie sous un chemin (ex. une preview de branche) : l'asset doit
  // suivre le meme prefixe que le script qui l'a chargee.
  it('conserve le prefixe sous lequel l application est montee', () => {
    const url = urlDeLAssetPdfJs('pdf.min.mjs', {
      scriptUrl: '/preview/1234/_expo/static/js/web/entry.js',
      origin: 'https://exemple.test',
    });

    expect(url).toBe('https://exemple.test/preview/1234/pdf.min.mjs');
  });

  // Un script servi depuis une URL absolue peut porter un double slash en tete de chemin :
  // le prefixe deduit vaut alors `/` seul, qui n'est pas un vrai prefixe, plutot que de
  // dupliquer un slash devant le nom de l'asset.
  it('traite un double slash en tete de chemin comme une absence de prefixe', () => {
    const url = urlDeLAssetPdfJs('pdf.min.mjs', {
      scriptUrl: 'https://exemple.test//_expo/static/js/web/entry.js',
      origin: 'https://exemple.test',
    });

    expect(url).toBe('https://exemple.test/pdf.min.mjs');
  });

  // Sans script `/_expo/` trouve, il n'y a pas de prefixe a deduire : l'asset se sert depuis
  // la racine plutot que d'echouer.
  it('sert l asset a la racine quand aucun script Expo n est trouve', () => {
    const url = urlDeLAssetPdfJs('pdf.worker.min.mjs', { scriptUrl: null, origin: 'https://exemple.test' });

    expect(url).toBe('https://exemple.test/pdf.worker.min.mjs');
  });
});

describe('pdfJsDuModule', () => {
  const pdfjs = { GlobalWorkerOptions: { workerSrc: '' }, getDocument: jest.fn() };

  // Selon le bundler qui l'a produit, un module ESM importe dynamiquement range ses exports
  // sous `default`.
  it('lit pdf.js sous l export par defaut', () => {
    expect(pdfJsDuModule({ default: pdfjs })).toBe(pdfjs);
  });

  it('lit pdf.js a la racine du module quand il n a pas d export par defaut', () => {
    expect(pdfJsDuModule(pdfjs)).toBe(pdfjs);
  });

  // Un asset remplace ou mal servi livrerait autre chose : l'echec doit se lire au chargement,
  // pas plus loin sous la forme d'un appel a une fonction absente.
  it('refuse un module qui n est pas pdf.js', () => {
    expect(() => pdfJsDuModule({ default: {} })).toThrow("Le module charge n'est pas pdf.js.");
  });
});
