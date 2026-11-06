import React from 'react';
import { Platform } from 'react-native';
import { ButtonIcon } from '../Button';
import { LucideIconName } from '../LucideIcon/LucideIcon.props';
import { TextInputElement, TextInputProps } from './TextInput.types';
import { TextInputInline } from './TextInputInline';

// En natif, une hauteur en pourcentage dans ce cadre de hauteur automatique
// peut étirer toute la saisie. Le bouton y garde la hauteur de son cran.
const boutonAccole = {
  ...(Platform.OS === 'web' ? { height: '100%' as const } : {}),
  borderRadius: 0,
  paddingTop: 0,
  paddingBottom: 0,
};

/** L'oeil montre l'action et non l'etat : ouvert pour reveler, barre pour masquer. */
export const iconeDeLOeil = (masque: boolean): LucideIconName => (masque ? 'Eye' : 'EyeOff');

/** Le mot de passe : une saisie ordinaire, masquee, qu'un oeil permet de reveler. */
export const TextInputPassword = React.forwardRef<TextInputElement, TextInputProps>(
  function TextInputPassword(props, ref) {
    const [masque, setMasque] = React.useState(true);

    return (
      <TextInputInline
        secureTextEntry={masque}
        autoComplete="current-password"
        textContentType="password"
        autoCapitalize="none"
        endAdornment={
          <ButtonIcon
            size="sm"
            variant="tertiary"
            style={boutonAccole}
            icon={iconeDeLOeil(masque)}
            accessibilityLabel={masque ? 'Afficher le mot de passe' : 'Masquer le mot de passe'}
            onPress={() => setMasque(actuel => !actuel)}
          />
        }
        {...props}
        ref={ref}
      />
    );
  },
);
