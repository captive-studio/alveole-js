import { getDurationBetweenTimes } from './getDurationBetweenTimes';

describe('getDurationBetweenTimes', () => {
  it('retourne la durée entre deux heures', () => {
    expect(getDurationBetweenTimes('07:00', '12:00')).toBe('05:00');
  });

  it('retourne la durée avec des minutes', () => {
    expect(getDurationBetweenTimes('01:00', '02:30')).toBe('01:30');
  });

  it('retourne 00:00 si la durée est nulle', () => {
    expect(getDurationBetweenTimes('08:00', '08:00')).toBe('00:00');
  });

  it('retourne 00:00 si end est avant start', () => {
    expect(getDurationBetweenTimes('10:00', '09:00')).toBe('00:00');
  });

  it('retourne la defaultValue si la durée est nulle', () => {
    expect(getDurationBetweenTimes('08:00', '08:00', { defaultValue: '—' })).toBe('—');
  });

  it('retourne la defaultValue si end est avant start', () => {
    expect(getDurationBetweenTimes('10:00', '09:00', { defaultValue: '—' })).toBe('—');
  });

  it('retourne 00:00 si la durée est négative même sans options', () => {
    expect(getDurationBetweenTimes('23:59', '00:00')).toBe('00:00');
  });
});
