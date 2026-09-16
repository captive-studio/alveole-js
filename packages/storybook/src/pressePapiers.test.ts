import { copier } from './pressePapiers';

const avecPressePapiers = (clipboard: unknown) =>
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: clipboard && { clipboard } });

afterEach(() => {
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: undefined });
});

it('ne copie rien quand le navigateur n offre pas de presse-papiers', () => {
  avecPressePapiers(undefined);
  const quandCopie = jest.fn();

  expect(copier('#151617', quandCopie)).toBe(false);
  expect(quandCopie).not.toHaveBeenCalled();
});

it('copie la valeur quand le presse-papiers est disponible', () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  avecPressePapiers({ writeText });

  expect(copier('#151617', jest.fn())).toBe(true);
  expect(writeText).toHaveBeenCalledWith('#151617');
});

// L'annonce attend la promesse : dire « copié » avant que le navigateur ait accepté annoncerait
// une copie qui peut encore échouer.
it('n annonce la copie qu une fois le navigateur d accord', async () => {
  let accepter: () => void = () => undefined;
  const writeText = jest.fn().mockReturnValue(new Promise<void>(resolve => (accepter = resolve)));
  avecPressePapiers({ writeText });
  const quandCopie = jest.fn();

  copier('#151617', quandCopie);
  expect(quandCopie).not.toHaveBeenCalled();

  accepter();
  await Promise.resolve();

  expect(quandCopie).toHaveBeenCalledTimes(1);
});
