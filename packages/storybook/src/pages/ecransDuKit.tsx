import { Box, Button, Page, Section } from '@alveole/components';
import { MenuCard } from '../components/MenuCard';
import type { BlankPage } from './UIKitPage';

// Les ecrans d'accueil du kit et leurs briques : de la presentation seule. Le routage, lui,
// vit dans `UIKitPage.tsx`, qui decide quel ecran repond a quelle route. Les separer evite
// qu'un changement de mise en page et un changement de navigation se lisent au meme endroit.

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
