import { Box, Page, Section } from '@alveole/components';
import { MenuCard } from '../components/MenuCard';

export type UIKitHomePageProps = {
  title?: string;
  description?: string;
  onOpenComponents: () => void;
  onOpenTheme: () => void;
  onOpenConstants: () => void;
};

export const UIKitHomePage = ({
  title = 'UI Kit',
  description = 'Documentation du design system',
  onOpenComponents,
  onOpenTheme,
  onOpenConstants,
}: UIKitHomePageProps) => {
  return (
    <Page scrollable title={title} description={description}>
      <Section withPaddingY>
        <Box display="flex" gap={16}>
          <MenuCard
            title="Composants"
            description="Liste des composants disponibles pour le développement."
            onPress={onOpenComponents}
          />
          <MenuCard
            title="Thème"
            description="Thème de l’application, liste des tokens issus du design system."
            onPress={onOpenTheme}
          />
          <MenuCard
            title="Constantes"
            description="Liste des constantes de thème exposées par la librairie."
            onPress={onOpenConstants}
          />
        </Box>
      </Section>
    </Page>
  );
};
