import { Box, Card, Page, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';

type HomeCardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

const HomeCard = ({ title, description, onPress }: HomeCardProps) => {
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
          <HomeCard
            title="Composants"
            description="Liste des composants disponibles pour le développement."
            onPress={onOpenComponents}
          />
          <HomeCard
            title="Thème"
            description="Thème de l’application, liste des tokens issus du design system."
            onPress={onOpenTheme}
          />
          <HomeCard
            title="Constantes"
            description="Liste des constantes de thème exposées par la librairie."
            onPress={onOpenConstants}
          />
        </Box>
      </Section>
    </Page>
  );
};
