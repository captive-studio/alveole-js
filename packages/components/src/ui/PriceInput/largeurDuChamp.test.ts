import { largeurDuChamp } from './largeurDuChamp';

describe('largeurDuChamp', () => {
  it('donne au champ la largeur exacte de ses chiffres', () => {
    expect(largeurDuChamp('1250')).toBe('4ch');
  });

  it('compte les centimes et la virgule tapés', () => {
    expect(largeurDuChamp('12,50')).toBe('5ch');
  });
});
