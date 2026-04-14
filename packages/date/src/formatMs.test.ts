import { formatMs } from './formatMs';

describe('formatMs', () => {
  it('formate 0 ms', () => {
    expect(formatMs(0)).toBe('00:00,00');
  });

  it('formate un petit nombre de ms (< 1s)', () => {
    expect(formatMs(90)).toBe('00:00,09');
    expect(formatMs(999)).toBe('00:00,99');
  });

  it('passe correctement la seconde entière', () => {
    expect(formatMs(1000)).toBe('00:01,00');
    expect(formatMs(1599)).toBe('00:01,59');
  });

  it('formate avec padding sur 2 chiffres', () => {
    expect(formatMs(5560)).toBe('00:05,56');
  });

  it('gère les minutes et seconds correctement', () => {
    expect(formatMs(61_090)).toBe('01:01,09');
    expect(formatMs(123_456)).toBe('02:03,45');
  });

  it('gère des durées plus longues', () => {
    expect(formatMs(10 * 60_000 + 1_000 + 90)).toBe('10:01,09');
  });
});
