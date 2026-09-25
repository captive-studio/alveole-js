import React from 'react';
import { ButtonIcon } from '../Button';
import { TextInputElement, TextInputProps } from './TextInput.types';
import { TextInputInline } from './TextInputInline';

// Le bouton se colle au bord du champ : ni coins arrondis, ni retrait vertical.
const boutonAccole = { height: '100%', borderRadius: 0, paddingTop: 0, paddingBottom: 0 } as const;

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
            icon={masque ? 'EyeClosed' : 'Eye'}
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
