import { isAfterDate } from './isAfterDate';

describe('isAfterDate', () => {
  it('retourne true pour une date après une date de référence', () => {
    expect(isAfterDate('2025-07-22', '2025-07-21')).toBe(true);
  });

  it('retourne false pour une date avant une date de référence', () => {
    expect(isAfterDate('2025-07-21', '2025-07-22')).toBe(false);
  });
});
