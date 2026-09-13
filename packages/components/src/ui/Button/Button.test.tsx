import { render } from '@/__tests__/helpers';
import { Button } from './Button';

describe('Button', () => {
  it('expose un etat accessible desactive pendant le chargement', async () => {
    const { getByRole } = await render(<Button variant="primary" title="Enregistrer" isLoading />);

    expect(getByRole('button').props.accessibilityState).toEqual(expect.objectContaining({ disabled: true }));
  });

});
