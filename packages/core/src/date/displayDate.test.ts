import { displayDate, displayDatetime } from './displayDate';

describe('displayDate', () => {
  it('formate une date string ISO correctement', () => {
    const result = displayDate('2025-07-22');
    expect(result).toBe('22 July 2025');
  });

  it('formate une date Date correctement', () => {
    const result = displayDate(new Date('2025-07-22T00:00:00Z'));
    expect(result).toBe('22 July 2025');
  });

  it('retourne le fallback si la date est invalide', () => {
    const result = displayDate('invalid-date', { fallback: 'Date inconnue' });
    expect(result).toBe('Date inconnue');
  });

  it('utilise le format personnalisé si fourni', () => {
    const result = displayDate('2025-07-22', { format: 'd MMMM yyyy' });
    expect(result).toBe('22 July 2025');
  });
});

describe('displayDatetime', () => {
  it('formate une date string ISO avec heure', () => {
    const result = displayDatetime('2025-07-22T15:30:00');
    expect(result).toBe('22 July 2025 à 15:30');
  });

  it('retourne le fallback si la date est invalide', () => {
    const result = displayDatetime('invalid-date', { fallback: 'Date/heure inconnue' });
    expect(result).toBe('Date/heure inconnue');
  });

  it('fonctionne avec un objet Date', () => {
    const date = new Date('2025-07-22T10:45:00');
    const result = displayDatetime(date);
    expect(result).toBe('22 July 2025 à 10:45');
  });
});
