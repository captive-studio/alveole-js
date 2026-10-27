import { act, fireEvent } from '@testing-library/react';
import { renderWeb, screen } from '../../../__tests__/helpers/renderWeb';
import { DocumentViewer } from './DocumentViewer';

const viewer = (allowFullscreen = true) =>
  renderWeb(
    <DocumentViewer
      title="Document"
      type="image"
      source="https://exemple.test/image.png"
      allowFullscreen={allowFullscreen}
    />,
  );

afterEach(() => {
  Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: undefined });
});

test('masque le bouton plein ecran quand le navigateur ne le permet pas', () => {
  viewer();

  expect(screen.queryByLabelText('Afficher en plein ecran')).toBeNull();
});

test('masque le bouton plein ecran sans allowFullscreen', () => {
  Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: true });
  viewer(false);

  expect(screen.queryByLabelText('Afficher en plein ecran')).toBeNull();
});

test('entre en plein ecran sur le visualiseur, puis suit la sortie par Echap', () => {
  Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: true });
  let enPleinEcran: Element | null = null;
  Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => enPleinEcran });
  const requestFullscreen = jest.fn(function (this: Element) {
    enPleinEcran = this;
    document.dispatchEvent(new Event('fullscreenchange'));
    return Promise.resolve();
  });
  Element.prototype.requestFullscreen = requestFullscreen;
  const { container } = viewer();

  fireEvent.click(screen.getByLabelText('Afficher en plein ecran'));

  expect(requestFullscreen.mock.contexts[0]).toBe(container.querySelector('document-viewer'));
  expect(screen.getByLabelText('Quitter le plein ecran')).toBeTruthy();

  act(() => {
    enPleinEcran = null;
    document.dispatchEvent(new Event('fullscreenchange'));
  });

  expect(screen.getByLabelText('Afficher en plein ecran')).toBeTruthy();
});
