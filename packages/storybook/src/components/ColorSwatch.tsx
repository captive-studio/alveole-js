import { Box, Typography, useToast } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { Pressable } from 'react-native';
import { copier } from '../pressePapiers';
import { ColorEntry } from '../screens/paletteSections';

/**
 * Une couleur de la palette, cliquable pour copier sa valeur. Le nom affiche est la derniere
 * marche du chemin : le chemin entier tient rarement sur la largeur d'une pastille, et c'est la
 * feuille qui identifie le jeton.
 */
export const ColorSwatch = ({ entry }: { entry: ColorEntry }) => {
  const toast = useToast();
  const { color, radius } = useTheme();
  // Le repli sur le chemin entier ne sert qu'au typage : `split` rend toujours au moins un
  // element, donc `pop` ne rend jamais `undefined` ici.
  const tokenName = entry.path.split('.').pop() ?? entry.path;

  const handleCopy = () => {
    copier(entry.value, () => toast.present('Copié !', entry.value, { variant: 'success', duration: 1500 }));
  };

  return (
    <Pressable accessibilityRole="button" onPress={handleCopy} style={{ width: 120, marginBottom: 8 }}>
      {({ pressed }) => (
        <Box
          style={{
            borderRadius: radius('md'),
            overflow: 'hidden',
            opacity: pressed ? 0.8 : 1,
            borderWidth: 1,
            borderColor: color.light.border['default-grey'],
          }}
        >
          <Box style={{ height: 56, backgroundColor: entry.value }} />
          <Box
            style={{
              paddingHorizontal: 8,
              paddingVertical: 6,
              backgroundColor: color.light.background['default-grey'],
            }}
          >
            <Typography
              style={{ fontSize: 11, fontWeight: '600', color: color.light.text['title-grey'], lineHeight: 14 }}
              numberOfLines={1}
            >
              {tokenName}
            </Typography>
            <Typography
              style={{
                fontSize: 10,
                color: color.light.text['mention-grey'],
                fontFamily: 'monospace',
                lineHeight: 14,
                marginTop: 2,
              }}
              numberOfLines={1}
            >
              {entry.value}
            </Typography>
          </Box>
        </Box>
      )}
    </Pressable>
  );
};
