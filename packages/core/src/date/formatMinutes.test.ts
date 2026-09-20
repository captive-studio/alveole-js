import { formatMinutes } from './formatMinutes';

describe('formatMinutes', () => {
  it('retourne "Vide" pour une durée nulle', () => {
    expect(formatMinutes(0)).toBe('Vide');
  });

  it('retourne le fallback fourni pour une durée nulle', () => {
    expect(formatMinutes(0, 'Aucune')).toBe('Aucune');
  });

  it('accorde la minute au singulier', () => {
    expect(formatMinutes(1)).toBe('1 minute');
  });

  it('accorde les minutes au pluriel', () => {
    expect(formatMinutes(30)).toBe('30 minutes');
  });

  it('affiche une heure pleine sans « et » orphelin', () => {
    expect(formatMinutes(60)).toBe('1 heure');
  });

  it('accorde les heures au pluriel', () => {
    expect(formatMinutes(120)).toBe('2 heures');
  });

  it('joint les heures et les minutes par « et »', () => {
    expect(formatMinutes(90)).toBe('1 heure et 30 minutes');
  });
});
