import { urlMagasinApplication } from './useAppUpdateCheck';

describe('urlMagasinApplication', () => {
  it('retourne l’URL App Store sur iOS', () => {
    expect(
      urlMagasinApplication('ios', { iosAppId: '6759812160', androidPackageId: undefined, applicationId: null }),
    ).toBe('https://apps.apple.com/app/id6759812160');
  });

  it('retourne l’URL du Play Store avec androidPackageId sur Android', () => {
    expect(
      urlMagasinApplication('android', {
        iosAppId: '6759812160',
        androidPackageId: 'com.captive.app',
        applicationId: null,
      }),
    ).toBe('market://details?id=com.captive.app');
  });

  it('retombe sur applicationId sur Android sans androidPackageId', () => {
    expect(
      urlMagasinApplication('android', {
        iosAppId: '6759812160',
        androidPackageId: undefined,
        applicationId: 'com.fallback.app',
      }),
    ).toBe('market://details?id=com.fallback.app');
  });

  it('retombe sur une chaîne vide sur Android sans androidPackageId ni applicationId', () => {
    expect(
      urlMagasinApplication('android', { iosAppId: '6759812160', androidPackageId: undefined, applicationId: null }),
    ).toBe('market://details?id=');
  });
});
