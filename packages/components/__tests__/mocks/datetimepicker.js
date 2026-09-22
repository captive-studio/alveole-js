// Sous Android, `@react-native-community/datetimepicker` appelle
// `TurboModuleRegistry.getEnforcing('RNCDatePicker')` dès l'import, ce qui lève hors d'un
// binaire natif : la suite ne démarre même pas. La variante iOS ne touche pas le module
// natif à l'import, d'où ce mock limité au projet android.
//
// Le sélecteur rend `null` : les tests de ce projet portent sur la valeur affichée par le
// champ, pas sur le calendrier lui-même, qui n'existe de toute façon pas hors appareil.
jest.mock('@react-native-community/datetimepicker', () => ({
  __esModule: true,
  default: () => null,
}));
