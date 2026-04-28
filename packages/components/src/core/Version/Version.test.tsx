import { render } from '@/__tests__/helpers';
import { displayVersion, Version } from './Version';

describe('Version', () => {
  it.each([
    ['1.2.3', '42', 'App version 1.2.3 (build 42)'],
    ['1.2.3', undefined, 'App version 1.2.3'],
  ])('formate la version', (version, build, expected) => {
    expect(displayVersion(version, build)).toBe(expected);
  });

  it('rend la version Expo avec le build natif', () => {
    const { getByText } = render(<Version />);

    expect(getByText('App version 1.2.3 (build 42)')).toBeTruthy();
  });
});
