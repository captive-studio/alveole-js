import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Image } from './Image';

test('donne un texte alternatif à l’image', () => {
  renderWeb(<Image source="https://exemple.test/photo.jpg" alt="Un chat" width={100} height={100} />);

  expect(screen.getByAltText('Un chat')).toBeTruthy();
});
