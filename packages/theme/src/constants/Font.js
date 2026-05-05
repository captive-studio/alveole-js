export const FontsMap = {
  // Barlow
  'Barlow-Light': require('../../assets/fonts/Barlow/Barlow-Light.ttf'),
  'Barlow-Regular': require('../../assets/fonts/Barlow/Barlow-Regular.ttf'),
  'Barlow-Medium': require('../../assets/fonts/Barlow/Barlow-Medium.ttf'),
  'Barlow-SemiBold': require('../../assets/fonts/Barlow/Barlow-SemiBold.ttf'),
  'Barlow-Bold': require('../../assets/fonts/Barlow/Barlow-Bold.ttf'),
  // Inter
  'Inter-Light': require('../../assets/fonts/Inter/Inter-Light.ttf'),
  'Inter-Regular': require('../../assets/fonts/Inter/Inter-Regular.ttf'),
  'Inter-Medium': require('../../assets/fonts/Inter/Inter-Medium.ttf'),
  'Inter-SemiBold': require('../../assets/fonts/Inter/Inter-SemiBold.ttf'),
  'Inter-Bold': require('../../assets/fonts/Inter/Inter-Bold.ttf'),
};
export const Fonts = Object.fromEntries(Object.keys(FontsMap).map(font => [font, font]));
