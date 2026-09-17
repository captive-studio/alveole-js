import { DocumentViewerRotation } from './DocumentViewer.types';

export type PDFDocumentProxyLike = {
  destroy?: () => void | Promise<void>;
  getPage: (page: number) => Promise<{
    getViewport: (options: { scale: number; rotation: DocumentViewerRotation }) => { width: number; height: number };
    render: (options: {
      canvasContext: CanvasRenderingContext2D;
      viewport: { width: number; height: number };
      transform?: [number, number, number, number, number, number];
    }) => { promise: Promise<void>; cancel?: () => void } | null;
    cleanup?: () => void;
  }>;
  numPages: number;
};

export type PdfJsModule = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (source: string | { url: string }) => {
    promise: Promise<PDFDocumentProxyLike>;
    destroy: () => void;
  };
};

/**
 * L'URL d'un asset de pdf.js, servi a cote du bundle Expo plutot que publie sur npm : le
 * chemin depend du prefixe sous lequel l'application est montee, retrouve a partir du script
 * `/_expo/...` que la page a elle-meme charge.
 */
export const urlDeLAssetPdfJs = (filename: string, contexte: { scriptUrl: string | null; origin: string }) => {
  const scriptUrl = contexte.scriptUrl ? new URL(contexte.scriptUrl, contexte.origin) : null;
  const basePath = scriptUrl?.pathname.split('/_expo/')[0] ?? '';
  const normalizedBasePath = basePath === '/' ? '' : basePath;

  return `${contexte.origin}${normalizedBasePath}/${filename}`;
};

const getPdfJsAssetUrl = (filename: string) => {
  const expoScript = document.querySelector<HTMLScriptElement>('script[src*="/_expo/"]');

  return urlDeLAssetPdfJs(filename, { scriptUrl: expoScript?.src ?? null, origin: window.location.origin });
};

/**
 * Le chargement de pdf.js, memoise : un import dynamique plutot qu'un import statique, pour
 * ne jamais l'embarquer dans le bundle natif, qui n'en a pas l'usage. `new Function` construit
 * l'import a l'execution : un `import()` litteral serait transforme par le bundler en une
 * dependance statique, ce qui reintroduirait le meme poids qu'on cherche a eviter.
 */
export const loadPdfJs = (() => {
  let promise: Promise<PdfJsModule> | null = null;

  return () => {
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('PDF.js is only available in the browser.'));
    }

    if (promise) return promise;

    const dynamicImport = new Function('url', 'return import(url);') as (
      url: string,
    ) => Promise<{ default?: PdfJsModule }>;

    promise = dynamicImport(getPdfJsAssetUrl('pdf.min.mjs')).then(module => {
      const pdfjs = (module.default ?? module) as PdfJsModule;
      pdfjs.GlobalWorkerOptions.workerSrc = getPdfJsAssetUrl('pdf.worker.min.mjs');
      return pdfjs;
    });

    return promise;
  };
})();
