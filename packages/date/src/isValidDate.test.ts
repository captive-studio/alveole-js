import { isValidDate } from './isValidDate';

describe('isValidDate', () => {
  it('retourne true pour une string ISO valide', () => {
    expect(isValidDate('2025-07-22')).toBe(true);
  });

  it('retourne true pour un objet Date valide', () => {
    expect(isValidDate(new Date('2025-07-22T10:00:00Z'))).toBe(true);
    expect(isValidDate('2025-07-22T10:00:00Z')).toBe(true);
    expect(isValidDate('2025-10-16T14:07:54.137+02:00')).toBe(true);
    expect(isValidDate('2025-10-22T12:20')).toBe(true);
  });

  it('retourne false pour un objet Date invalide', () => {
    expect(isValidDate(new Date('invalid-date'))).toBe(false);
  });

  it('retourne false pour une valeur qui n’est ni string ni Date', () => {
    expect(isValidDate(123)).toBe(false);
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
    expect(isValidDate({})).toBe(false);
    expect(isValidDate('75')).toBe(false);
  });
});
