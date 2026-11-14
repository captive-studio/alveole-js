import { choisirJour, composerDate, dureeRelative, formeDuJour, joursDuMois, libelleDePlage } from './plage';

test('aligne le premier jour du mois sur le lundi', () => {
  // 1er octobre 2026 : un jeudi, donc trois cases vides avant
  const jours = joursDuMois(2026, 9);

  expect(jours.slice(0, 4)).toEqual([null, null, null, 1]);
  expect(jours[jours.length - 1]).toBe(31);
});

test('le premier choix pose le début, le second la fin', () => {
  const debut = new Date(2026, 9, 14);
  const fin = new Date(2026, 9, 22);

  expect(choisirJour({}, debut)).toEqual({ debut });
  expect(choisirJour({ debut }, fin)).toEqual({ debut, fin });
});

test('un second choix antérieur au début échange les bornes', () => {
  const debut = new Date(2026, 9, 22);
  const fin = new Date(2026, 9, 14);

  expect(choisirJour({ debut }, fin)).toEqual({ debut: fin, fin: debut });
});

test('un choix sur une plage complète en recommence une', () => {
  const jour = new Date(2026, 9, 3);

  expect(choisirJour({ debut: new Date(2026, 9, 1), fin: new Date(2026, 9, 2) }, jour)).toEqual({ debut: jour });
});

test('compose la date en UTC ou en heure locale', () => {
  const jour = new Date(2026, 9, 27);

  expect(composerDate(jour, '01:00', true).toISOString()).toBe('2026-10-27T01:00:00.000Z');
  expect(composerDate(jour, '23:59', false)).toEqual(new Date(2026, 9, 27, 23, 59));
});

test('lit une durée relative saisie', () => {
  expect(dureeRelative('4d')).toBe('4d');
  expect(dureeRelative(' 8W ')).toBe('8w');
  expect(dureeRelative('4 jours')).toBeUndefined();
  expect(dureeRelative('0h')).toBeUndefined();
});

test('affiche une plage relative ou absolue', () => {
  expect(libelleDePlage({ type: 'relative', duree: '14d' })).toBe('14D');
  expect(
    libelleDePlage(
      {
        type: 'absolue',
        debut: new Date('2026-10-27T01:00:00Z'),
        fin: new Date('2026-10-30T23:59:00Z'),
        utc: true,
      },
      'en',
    ),
  ).toBe('Oct 27, 1:00 AM UTC–Oct 30, 11:59 PM UTC');
});

test('arrondit la pastille aux bornes et aux bords de semaine, jamais hors plage', () => {
  const plage = { debut: new Date(2026, 9, 14), fin: new Date(2026, 9, 22) };

  expect(formeDuJour(new Date(2026, 9, 14), 2, plage)).toEqual({ dansPlage: true, debut: true, fin: false });
  expect(formeDuJour(new Date(2026, 9, 18), 6, plage)).toEqual({ dansPlage: true, debut: false, fin: true });
  expect(formeDuJour(new Date(2026, 9, 12), 0, plage)).toEqual({ dansPlage: false, debut: false, fin: false });
});
