import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { act } from '@testing-library/react';
import { renderWeb } from '../../../__tests__/helpers/renderWeb';
import { DocumentViewerImage } from './DocumentViewerImage';

const rendreLeCadre = () => {
  const { container } = renderWeb(<DocumentViewerImage source="https://exemple.test/image.png" rotation={0} />);
  const cadre = elementDuType(container.querySelector('document-viewer-image'), HTMLElement);
  cadre.getBoundingClientRect = () => new DOMRect(0, 0, 200, 100);

  return { container, cadre };
};

const molette = (cadre: HTMLElement, init: WheelEventInit) => {
  const event = new WheelEvent('wheel', { bubbles: true, cancelable: true, clientX: 50, clientY: 75, ...init });
  act(() => {
    cadre.dispatchEvent(event);
  });
  return event;
};

test('zoome sous le pointeur avec Ctrl + molette, sans laisser zoomer le navigateur', () => {
  const { container, cadre } = rendreLeCadre();

  const event = molette(cadre, { deltaY: -100, ctrlKey: true });

  expect(event.defaultPrevented).toBe(true);
  expect(container.innerHTML).toContain('transform-origin: 25% 75%');
});

test('laisse la molette seule faire defiler la page', () => {
  const { container, cadre } = rendreLeCadre();

  const event = molette(cadre, { deltaY: -100 });

  expect(event.defaultPrevented).toBe(false);
  expect(container.innerHTML).not.toContain('transform-origin: 25% 75%');
});
