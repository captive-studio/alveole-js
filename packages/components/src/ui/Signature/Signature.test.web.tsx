import { render, screen } from '@/__tests__/helpers/render.web';
import { Signature } from './Signature';

test('se rend sans boucler', () => {
  render(<Signature height={200} onChange={() => undefined} />);

  expect(screen.getByRole('button', { name: 'Effacer' })).toBeTruthy();
});
