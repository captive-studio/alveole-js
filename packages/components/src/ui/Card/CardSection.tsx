import { Href } from 'expo-router';
import { ReactNode } from 'react';
import { A } from '../../core/A';
import { Box, BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './CardSection.styles';

export type CardSectionVariant = 'default' | 'disabled';

export type CardSectionProps = BoxProps & {
  variant?: CardSectionVariant;
  titre?: string;
  description?: string;
  descriptionLink?: Href & string;
  titreIcone?: LucideIconProps['name'];
  descriptionIcone?: LucideIconProps['name'];
};

// Les deux lignes de la section (titre, description) ont la meme structure : une icone
// optionnelle dans sa propre boite, puis le contenu textuel. Les ecrire deux fois faisait
// porter a CardSection la construction de chaque ligne en plus de son assemblage.
const Ligne = ({
  tag,
  style,
  icone,
  iconeStyle,
  couleurIcone,
  children,
}: {
  tag: string;
  style: BoxProps['style'];
  icone?: LucideIconProps['name'];
  iconeStyle: BoxProps['style'];
  couleurIcone: string | undefined;
  children: ReactNode;
}) => (
  <Box tag={tag} style={style}>
    {icone && (
      <Box tag={`${tag}-icon`} style={iconeStyle}>
        <LucideIcon name={icone} size="sm" color={couleurIcone} />
      </Box>
    )}

    {children}
  </Box>
);

// La teinte desactivee s'applique au texte comme a l'icone : la calculer en un seul endroit
// empeche les deux de diverger, ce que la lecture repetee de `variant` laissait faire.
const useTeinte = (desactive: boolean) => {
  const styles = useStyles();

  return {
    styles,
    styleTexte: desactive ? styles.disabledText : {},
    couleurIcone: (couleurNormale: string | undefined) => (desactive ? styles.disabledText.color : couleurNormale),
  };
};

const LigneTitre = ({
  titre,
  icone,
  desactive,
}: {
  titre?: string;
  icone?: LucideIconProps['name'];
  desactive: boolean;
}) => {
  const { styles, styleTexte, couleurIcone } = useTeinte(desactive);

  return (
    <Ligne
      tag="card-section-title"
      style={styles.title}
      icone={icone}
      iconeStyle={styles.titleIcon}
      couleurIcone={couleurIcone(styles.titleText.color)}
    >
      {titre && <Typography style={[styles.titleText, styleTexte]}>{titre}</Typography>}
    </Ligne>
  );
};

const LigneDescription = ({
  description,
  lien,
  icone,
  desactive,
}: {
  description?: string;
  lien?: Href & string;
  icone?: LucideIconProps['name'];
  desactive: boolean;
}) => {
  const { styles, styleTexte, couleurIcone } = useTeinte(desactive);

  const texte = description && <Typography style={[styles.descriptionText, styleTexte]}>{description}</Typography>;

  return (
    <Ligne
      tag="card-section-description"
      style={styles.description}
      icone={icone}
      iconeStyle={styles.descriptionIcon}
      couleurIcone={couleurIcone(styles.descriptionText.color)}
    >
      {texte && lien ? (
        <A href={lien} style={styles.descriptionLink}>
          {texte}
        </A>
      ) : (
        texte
      )}
    </Ligne>
  );
};

export const CardSection = (props: CardSectionProps) => {
  const {
    variant = 'default',
    titre,
    description,
    descriptionLink,
    titreIcone,
    descriptionIcone,
    style,
    children,
    ...boxProps
  } = props;

  const styles = useStyles();

  const hasTitleRow = !!(titre || titreIcone);
  const hasDescriptionRow = !!(description || descriptionIcone || children);

  if (!hasTitleRow && !hasDescriptionRow) {
    return null;
  }

  const desactive = variant === 'disabled';

  return (
    <Box tag="card-section" style={[styles.cardSection, style]} {...boxProps}>
      {hasTitleRow && <LigneTitre titre={titre} icone={titreIcone} desactive={desactive} />}

      {hasDescriptionRow && (
        <LigneDescription
          description={description}
          lien={descriptionLink}
          icone={descriptionIcone}
          desactive={desactive}
        />
      )}
    </Box>
  );
};
