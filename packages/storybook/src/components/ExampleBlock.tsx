import { Box, Button, Highlight, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';
import { decouperSource } from '../storySource';

/** Au delà, la source prend plus de place que ce qu'elle documente. */
const LIGNES_VISIBLES = 12;

/** L'écart entre deux points de la trame : assez lâche pour rester un fond, pas une texture. */
const PAS_DE_LA_TRAME = 16;

/**
 * La scène de la démonstration : le composant y est posé comme dans une application.
 *
 * Son fond reste celui de la page : le gris appartient au bloc de code juste en dessous, et
 * le reprendre ici effacerait la frontière entre ce qu'on montre et la façon de l'écrire. La
 * trame dit « surface de démonstration » sans dépenser une seconde valeur de fond.
 */
const Scene = ({ children, pleinEcran }: { children: React.ReactNode; pleinEcran: boolean }) => {
  const { color } = useTheme();
  const trameId = `trame-${React.useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <Box
      p={Platform.OS === 'web' ? '3W' : '1W'}
      style={{
        backgroundColor: color.light.background['default-grey'],
        ...(Platform.OS === 'web' && {
          backgroundImage: `radial-gradient(circle, ${color.light.border['default-grey']} 1px, transparent 1px)`,
          backgroundSize: `${PAS_DE_LA_TRAME}px ${PAS_DE_LA_TRAME}px`,
        }),
        alignItems: pleinEcran ? undefined : 'center',
        justifyContent: 'center',
        minHeight: pleinEcran ? 420 : 160,
      }}
    >
      {Platform.OS !== 'web' && (
        <Svg
          width="100%"
          height="100%"
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
          accessible={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <Defs>
            <Pattern id={trameId} width={PAS_DE_LA_TRAME} height={PAS_DE_LA_TRAME} patternUnits="userSpaceOnUse">
              <Circle
                cx={PAS_DE_LA_TRAME / 2}
                cy={PAS_DE_LA_TRAME / 2}
                r={1}
                fill={color.light.border['default-grey']}
              />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill={`url(#${trameId})`} />
        </Svg>
      )}
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
        paddingLeft: spacingValue(Platform.OS === 'web' ? '2W' : '1W'),
        paddingRight: spacingValue(Platform.OS === 'web' ? '2W' : '1W'),
        paddingTop: spacingValue('1W'),
        paddingBottom: spacingValue('1W'),
      }}
    >
      <Typography style={{ ...text['Corps de texte'].XS.CapsBold, color: color.light.text['mention-grey'] }}>
        tsx
      </Typography>

      <Button title="Copier" size="sm" variant="tertiary" leading="Copy" onPress={onCopier} />
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
        trailing={deplie ? 'ChevronUp' : 'ChevronDown'}
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
