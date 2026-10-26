import { AlveoleProvider, Box } from '@alveole/components';
import { Spacings } from '@alveole/theme';
import '@alveole/theme/dist/default.css';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUIKitColumn, useUIKitTopBar } from '../components/uiKitNavigation';
import { tamaguiConfig } from '../tamagui.config';
import './global.css';

/**
 * La barre et la colonne sont montées ici, une fois, plutôt que dans chaque écran : `Page`
 * les rendrait à l'intérieur de l'écran courant, que le `Stack` démonte et remonte à chaque
 * navigation - la colonne perdrait alors sa position de scroll à chaque clic. Voir docs/adr/0007.
 */
function UIKitChrome() {
  const { top } = useSafeAreaInsets();
  const topBar = useUIKitTopBar();
  const column = useUIKitColumn();

  return (
    <Box flex={1} style={{ paddingTop: Platform.OS === 'web' ? Spacings['0V'] : top }}>
      {topBar}
      <Box style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        {column}
        <Box flex={1}>
          <Stack screenOptions={{ headerShown: false }} />
        </Box>
      </Box>
    </Box>
  );
}

export default function RootLayout() {
  return (
    <AlveoleProvider tamaguiConfig={tamaguiConfig} loader={false} staticCSS>
      <UIKitChrome />
    </AlveoleProvider>
  );
}
