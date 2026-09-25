import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { act } from '@testing-library/react';
import { renderWeb } from '../../../__tests__/helpers/renderWeb';
import { DocumentViewerImage } from './DocumentViewerImage';

test("place l'origine du zoom sous le pointeur, en pourcentage du cadre", () => {
  const { container } = renderWeb(<DocumentViewerImage source="https://exemple.test/image.png" rotation={0} />);
  const cadre = elementDuType(container.querySelector('document-viewer-image'), HTMLElement);
  cadre.getBoundingClientRect = () => new DOMRect(0, 0, 200, 100);

  // jsdom n'implemente pas `PointerEvent` : `fireEvent.pointerMove` enverrait un `Event` sans
  // coordonnees. Un `MouseEvent` du meme nom les porte, et React le traite comme un pointermove.
  act(() => {
    cadre.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: 50, clientY: 75 }));
  });

  expect(container.innerHTML).toContain('transform-origin: 25% 75%');
});
