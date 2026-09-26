import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Signature } from './Signature';

test('se rend sans boucler', () => {
  renderWeb(<Signature height={200} onChange={() => undefined} />);

  expect(screen.getByRole('button', { name: 'Effacer' })).toBeTruthy();
});
