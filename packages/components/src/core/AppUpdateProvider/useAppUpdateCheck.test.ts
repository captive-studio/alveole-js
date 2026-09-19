import { urlMagasinApplication } from './useAppUpdateCheck';

describe('urlMagasinApplication', () => {
  it('retourne l’URL App Store sur iOS', () => {
    expect(urlMagasinApplication('ios', '6759812160', undefined, null)).toBe('https://apps.apple.com/app/id6759812160');
  });

  it('retourne l’URL du Play Store avec androidPackageId sur Android', () => {
    expect(urlMagasinApplication('android', '6759812160', 'com.captive.app', null)).toBe(
      'market://details?id=com.captive.app',
    );
  });

  it('retombe sur applicationId sur Android sans androidPackageId', () => {
    expect(urlMagasinApplication('android', '6759812160', undefined, 'com.fallback.app')).toBe(
      'market://details?id=com.fallback.app',
    );
  });

  it('retombe sur une chaîne vide sur Android sans androidPackageId ni applicationId', () => {
    expect(urlMagasinApplication('android', '6759812160', undefined, null)).toBe('market://details?id=');
  });
});
