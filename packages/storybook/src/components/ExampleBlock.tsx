import { Box, Button, Highlight, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { decouperSource } from '../storySource';

/** Au delà, la source prend plus de place que ce qu'elle documente. */
const LIGNES_VISIBLES = 12;

/** La scène de la démonstration : le composant y est posé comme dans une application. */
const Scene = ({ children, pleinEcran }: { children: React.ReactNode; pleinEcran: boolean }) => {
  const { color } = useTheme();

  return (
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
  );
};

/**
 * La barre qui sépare la démonstration de sa source : elle dit où finit ce qu'on montre et
 * où commence la façon de l'écrire, ce qu'une ligne seule ne dirait pas.
 */
const BarreDeSource = ({ onCopier }: { onCopier: () => void }) => {
  const { color, spacingValue, text } = useTheme();

  return (
    <Box
      borderColor={color.light.border['default-grey']}
      style={{
        alignItems: 'center',
        backgroundColor: color.light.background['alt-grey'],
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // Les côtés s'alignent sur la colonne du code, qui est le contenu principal du bas
        // du bloc ; la hauteur reste au plus juste de ce que la barre porte.
        paddingLeft: spacingValue('2W'),
        paddingRight: spacingValue('2W'),
        paddingTop: spacingValue('1W'),
        paddingBottom: spacingValue('1W'),
      }}
    >
      <Typography style={{ ...text['Corps de texte'].XS.CapsBold, color: color.light.text['mention-grey'] }}>
        tsx
      </Typography>

      <Button title="Copier" size="sm" variant="tertiary" startIcon="Copy" onPress={onCopier} />
    </Box>
  );
};

const CommandeDeRepli = ({ deplie, onBascule }: { deplie: boolean; onBascule: () => void }) => {
  const { color } = useTheme();

  return (
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
        onPress={onBascule}
      />
    </Box>
  );
};

export type ExampleBlockProps = {
  /** La démonstration : le composant rendu tel qu'une application cliente l'obtiendrait. */
  children: React.ReactNode;
  /** Le code de l'exemple, entier. Ce qui est replié reste copiable en totalité. */
  source?: string | null;
  /** Les gabarits sont des écrans entiers : ils réclament de la hauteur, pas un centrage. */
  pleinEcran?: boolean;
};

/** Le bloc d'exemple : une démonstration et sa source, dans un seul cadre. */
export const ExampleBlock = ({ children, source, pleinEcran = false }: ExampleBlockProps) => {
  const { color, radius } = useTheme();
  const [deplie, setDeplie] = React.useState(false);

  const { visible, tronque } = decouperSource(source ?? '', LIGNES_VISIBLES);

  // La source entière, repliée ou non : copier un extrait tronqué donnerait du code qui ne
  // compile pas, ce qui est pire que pas de bouton.
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
      <Scene pleinEcran={pleinEcran}>{children}</Scene>

      {source ? (
        <>
          <BarreDeSource onCopier={copier} />

          <Highlight language="tsx" variant="embedded">
            {deplie ? source : visible}
          </Highlight>

          {tronque ? <CommandeDeRepli deplie={deplie} onBascule={() => setDeplie(!deplie)} /> : null}
        </>
      ) : null}
    </Box>
  );
};
