import { Box, Button, Card, Page, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import type { BlankPage } from './UIKitPage';

// Les ecrans d'accueil du kit et leurs briques : de la presentation seule. Le routage, lui,
// vit dans `UIKitPage.tsx`, qui decide quel ecran repond a quelle route. Les separer evite
// qu'un changement de mise en page et un changement de navigation se lisent au meme endroit.

type MenuCardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

export const MenuCard = ({ title, description, onPress }: MenuCardProps) => {
  const { text } = useTheme();

  return (
    <Card onPress={onPress}>
      <Box display="flex" gap={8} p={'150'}>
        <Typography style={text.Titres['H4 - SM']}>{title}</Typography>
        <Typography style={text['Corps de texte'].SM.Regular}>{description}</Typography>
      </Box>
    </Card>
  );
};

type InternalHeaderProps = {
  canGoBack: boolean;
  onBack: () => void;
};

export const InternalHeader = ({ canGoBack, onBack }: InternalHeaderProps) => {
  if (!canGoBack) return null;

  return (
    <Section withPaddingY>
      <Box>
        <Button title="Retour" variant="tertiary" size="sm" onPress={onBack} />
      </Box>
    </Section>
  );
};

export const HomeScreen = ({
  title,
  description,
  blankPage,
  onOpenComponents,
  onOpenTheme,
  onOpenConstants,
  onOpenBlank,
  onOpenPhilosophy,
}: {
  title: string;
  description: string;
  blankPage?: BlankPage;
  onOpenComponents: () => void;
  onOpenTheme: () => void;
  onOpenConstants: () => void;
  onOpenBlank: () => void;
  onOpenPhilosophy: () => void;
}) => {
  return (
    <Page scrollable title={title} description={description}>
      <Section withPaddingY>
        <Box display="flex" gap={16}>
          <MenuCard
            title="Composants"
            description="Catalogue des composants et de leurs variantes."
            onPress={onOpenComponents}
          />
          <MenuCard title="Thème" description="Couleurs et typographies du design system." onPress={onOpenTheme} />
          <MenuCard title="Constantes" description="Constantes exposées par le thème." onPress={onOpenConstants} />
          <MenuCard title="Philosophie" description="Les principes qui guident Alveole." onPress={onOpenPhilosophy} />
          {blankPage ? (
            <MenuCard
              title={blankPage.title ?? 'Page vierge'}
              description={blankPage.description ?? 'Espace de test libre pour expérimenter.'}
              onPress={onOpenBlank}
            />
          ) : null}
        </Box>
      </Section>
    </Page>
  );
};

export const ThemeHomeScreen = ({
  onOpenColors,
  onOpenTypography,
  beforeContent,
}: {
  onOpenColors: () => void;
  onOpenTypography: () => void;
  beforeContent?: React.ReactNode;
}) => {
  return (
    <Page scrollable title="UI Kit - Thème" description="Tokens du thème" beforeContent={beforeContent}>
      <Section withPaddingY>
        <Box display="flex" gap={16}>
          <MenuCard title="Couleurs" description="Palette et couleurs du thème." onPress={onOpenColors} />
          <MenuCard
            title="Typographies"
            description="Styles de texte et hiérarchie typographique."
            onPress={onOpenTypography}
          />
        </Box>
      </Section>
    </Page>
  );
};

/** Ce dont un ecran du kit a besoin pour se rendre : les donnees de la page et le moyen d'avancer. */
