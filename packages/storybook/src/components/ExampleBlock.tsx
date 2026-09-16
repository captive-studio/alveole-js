import { Box, Button, Highlight, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { decouperSource } from '../storySource';

/** Au delà, la source prend plus de place que ce qu'elle documente. Voir docs/adr/0012. */
const LIGNES_VISIBLES = 12;

export type ExampleBlockProps = {
  /** La démonstration : le composant rendu tel qu'une application cliente l'obtiendrait. */
  children: React.ReactNode;
  /** Le code de l'exemple, entier. Ce qui est replié reste copiable en totalité. */
  source?: string | null;
  /** Les gabarits sont des écrans entiers : ils réclament de la hauteur, pas un centrage. */
  pleinEcran?: boolean;
};

/**
 * Le bloc d'exemple : une démonstration et sa source, dans un seul cadre. La barre qui les
 * sépare porte la langue et les commandes, et dit où finit ce qu'on montre et où commence
 * la façon de l'écrire.
 */
export const ExampleBlock = ({ children, source, pleinEcran = false }: ExampleBlockProps) => {
  const { color, radius, spacingValue, text } = useTheme();
  const [deplie, setDeplie] = React.useState(false);

  const { visible, tronque } = decouperSource(source ?? '', LIGNES_VISIBLES);

  const copier = () => {
    if (source && typeof navigator !== 'undefined') navigator.clipboard?.writeText(source);
  };

  return (
    <Box
      borderColor={color.light.border['default-grey']}
      borderRadius={radius('md')}
      borderWidth={1}
      style={{ overflow: 'hidden' }}
    >
      <Box
        p={'150'}
        style={{
          backgroundColor: color.light.background['default-grey'],
          alignItems: pleinEcran ? undefined : 'center',
          justifyContent: 'center',
          minHeight: pleinEcran ? 420 : 160,
        }}
      >
        {children}
      </Box>

      {source ? (
        <>
          <Box
            borderColor={color.light.border['default-grey']}
            style={{
              alignItems: 'center',
              backgroundColor: color.light.background['alt-grey'],
              borderTopWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // Les côtés s'alignent sur la colonne du code, qui est le contenu principal du
              // bas du bloc ; la hauteur reste au plus juste de ce que la barre porte.
              paddingLeft: spacingValue('2W'),
              paddingRight: spacingValue('2W'),
              paddingTop: spacingValue('1W'),
              paddingBottom: spacingValue('1W'),
              borderBottomWidth: 1,
            }}
          >
            <Typography style={{ ...text['Corps de texte'].XS.CapsBold, color: color.light.text['mention-grey'] }}>
              tsx
            </Typography>

            <Button title="Copier" size="sm" variant="tertiary" startIcon="Copy" onPress={copier} />
          </Box>

          <Highlight language="tsx" variant="embedded">
            {deplie ? source : visible}
          </Highlight>

          {tronque ? (
            <Box
              borderColor={color.light.border['default-grey']}
              style={{
                alignItems: 'center',
                backgroundColor: color.light.background['alt-grey'],
                borderTopWidth: 1,
              }}
            >
              <Button
                title={deplie ? 'Replier' : 'Afficher tout'}
                size="sm"
                variant="tertiary"
                endIcon={deplie ? 'ChevronUp' : 'ChevronDown'}
                onPress={() => setDeplie(!deplie)}
              />
            </Box>
          ) : null}
        </>
      ) : null}
    </Box>
  );
};
