import { act } from '@testing-library/react';
import { renderWeb } from '../../../__tests__/helpers/renderWeb';
import { DocumentViewerImage } from './DocumentViewerImage';

test("place l'origine du zoom sous le pointeur, en pourcentage du cadre", () => {
  const { container } = renderWeb(<DocumentViewerImage source="https://exemple.test/image.png" rotation={0} />);
  const cadre = container.querySelector('document-viewer-image') as HTMLElement;
  cadre.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 100 }) as DOMRect;

  // jsdom n'implemente pas `PointerEvent` : `fireEvent.pointerMove` enverrait un `Event` sans
  // coordonnees. Un `MouseEvent` du meme nom les porte, et React le traite comme un pointermove.
  act(() => {
    cadre.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: 50, clientY: 75 }));
  });

  expect(container.innerHTML).toContain('transform-origin: 25% 75%');
});
