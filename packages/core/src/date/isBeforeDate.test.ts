import { isBeforeDate } from './isBeforeDate';

describe('isBeforeDate', () => {
  it('retourne true si la première date est avant la seconde', () => {
    expect(isBeforeDate('2025-07-21', '2025-07-22')).toBe(true);
  });

  it('retourne false si la première date est égale à la seconde', () => {
    expect(isBeforeDate('2025-07-22', '2025-07-22')).toBe(false);
  });

  it('retourne false si la première date est après la seconde', () => {
    expect(isBeforeDate('2025-07-23', '2025-07-22')).toBe(false);
  });

  it('gère les dates avec heures correctement', () => {
    expect(isBeforeDate('2025-07-22T10:00:00Z', '2025-07-22T12:00:00Z')).toBe(true);
    expect(isBeforeDate('2025-07-22T14:00:00Z', '2025-07-22T12:00:00Z')).toBe(false);
  });

  it('retourne false si une date est invalide', () => {
    expect(isBeforeDate('invalid-date', '2025-07-22')).toBe(false);
    expect(isBeforeDate('2025-07-22', 'invalid-date')).toBe(false);
  });
});
