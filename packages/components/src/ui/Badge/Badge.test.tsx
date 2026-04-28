import { render } from '@/__tests__/helpers';
import { LucideIcon } from '../LucideIcon';
import { Badge } from './Badge';

describe('Badge', () => {
  it.each(['default', 'info', 'success', 'error', 'new', 'warning'] as const)('rend le texte du badge %s', variant => {
    const { getByText } = render(
      <Badge size="md" variant={variant}>
        Badge {variant}
      </Badge>,
    );

    expect(getByText(`Badge ${variant}`)).toBeTruthy();
  });

  it('rend le texte avec une icone', () => {
    const { getByText, getByProps, getByType } = render(
      <Badge icon="Check" size="sm" variant="success">
        Badge icon
      </Badge>,
    );

    const badge = getByProps({ tag: 'badge' });
    const icon = getByType(LucideIcon);

    expect(badge).toBeTruthy();
    expect(icon.props).toEqual(expect.objectContaining({ name: 'Check', size: 'xs' }));
    expect(getByText('Badge icon')).toBeTruthy();
  });
});
