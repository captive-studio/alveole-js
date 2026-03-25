import { Box, Button, Card, Page, Section, Typography } from '@alveole/components';
import { CustomPalette, CustomTypography, useTheme } from '@alveole/theme';
import React from 'react';
import { StoriesScreen } from '../screens/StoriesScreen';
import { StoryDetailScreen } from '../screens/StoryDetailScreen';
import { ThemeConstantDetailScreen } from '../screens/ThemeConstantDetailScreen';
import { ThemeConstantsScreen } from '../screens/ThemeConstantsScreen';
import { ThemePaletteScreen } from '../screens/ThemePaletteScreen';
import { ThemeTypographyScreen } from '../screens/ThemeTypographyScreen';
import { StorybookModule } from '../types';

type BlankPage = {
  title?: string;
  description?: string;
  render: () => React.ReactNode;
};

type UIKitRoute =
  | { name: 'home' }
  | { name: 'components' }
  | { name: 'component-detail'; story: StorybookModule }
  | { name: 'theme-home' }
  | { name: 'theme-colors' }
  | { name: 'theme-typography' }
  | { name: 'constants' }
  | { name: 'constant-detail'; constantName: string; constantValue: unknown }
  | { name: 'blank' };

export type UIKitPageProps = {
  stories: StorybookModule[];
  constants: Record<string, unknown>;
  palette?: Record<string, any>;
  typography?: Record<string, unknown>;
  title?: string;
  description?: string;
  blankPage?: BlankPage;
};

type MenuCardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

const MenuCard = ({ title, description, onPress }: MenuCardProps) => {
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

const InternalHeader = ({ canGoBack, onBack }: InternalHeaderProps) => {
  if (!canGoBack) return null;

  return (
    <Section withPaddingY>
      <Box>
        <Button title="Retour" variant="tertiary" size="sm" onPress={onBack} />
      </Box>
    </Section>
  );
};

const HomeScreen = ({
  title,
  description,
  blankPage,
  onOpenComponents,
  onOpenTheme,
  onOpenConstants,
  onOpenBlank,
}: {
  title: string;
  description: string;
  blankPage?: BlankPage;
  onOpenComponents: () => void;
  onOpenTheme: () => void;
  onOpenConstants: () => void;
  onOpenBlank: () => void;
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

const ThemeHomeScreen = ({
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

export const UIKitPage = ({
  stories,
  constants,
  palette = CustomPalette,
  typography = CustomTypography,
  title = 'UI Kit',
  description = 'Documentation du design system',
  blankPage,
}: UIKitPageProps) => {
  const [history, setHistory] = React.useState<UIKitRoute[]>([{ name: 'home' }]);
  const route = history[history.length - 1];
  const canGoBack = history.length > 1;

  const push = React.useCallback((nextRoute: UIKitRoute) => {
    setHistory(current => [...current, nextRoute]);
  }, []);

  const goBack = React.useCallback(() => {
    setHistory(current => (current.length > 1 ? current.slice(0, -1) : current));
  }, []);

  const beforeContent = <InternalHeader canGoBack={canGoBack} onBack={goBack} />;

  if (route.name === 'home') {
    return (
      <HomeScreen
        title={title}
        description={description}
        blankPage={blankPage}
        onOpenComponents={() => push({ name: 'components' })}
        onOpenTheme={() => push({ name: 'theme-home' })}
        onOpenConstants={() => push({ name: 'constants' })}
        onOpenBlank={() => push({ name: 'blank' })}
      />
    );
  }

  if (route.name === 'components') {
    return (
      <StoriesScreen
        beforeContent={beforeContent}
        stories={stories}
        title="UI Kit - Composants"
        description="Catalogue des composants"
        createLabel={blankPage ? (blankPage.title ?? 'Page vierge') : undefined}
        onCreatePress={blankPage ? () => push({ name: 'blank' }) : undefined}
        onSelectStory={story => push({ name: 'component-detail', story })}
      />
    );
  }

  if (route.name === 'component-detail') {
    return (
      <StoryDetailScreen beforeContent={beforeContent} story={route.story} notFoundMessage="Composant introuvable" />
    );
  }

  if (route.name === 'theme-home') {
    return (
      <ThemeHomeScreen
        beforeContent={beforeContent}
        onOpenColors={() => push({ name: 'theme-colors' })}
        onOpenTypography={() => push({ name: 'theme-typography' })}
      />
    );
  }

  if (route.name === 'theme-colors') {
    return (
      <ThemePaletteScreen
        beforeContent={beforeContent}
        palette={palette}
        title="UI Kit - Couleurs du thème"
        description="Palette et couleurs du thème"
      />
    );
  }

  if (route.name === 'theme-typography') {
    return (
      <ThemeTypographyScreen
        beforeContent={beforeContent}
        typography={typography}
        title="UI Kit - Textes du thème"
        description="Styles de texte du thème"
      />
    );
  }

  if (route.name === 'constants') {
    return (
      <ThemeConstantsScreen
        beforeContent={beforeContent}
        constants={constants}
        title="UI Kit - Constantes"
        description="Constantes exposées par le thème"
        onSelectConstant={({ name, value }) =>
          push({ name: 'constant-detail', constantName: name, constantValue: value })
        }
      />
    );
  }

  if (route.name === 'constant-detail') {
    return (
      <ThemeConstantDetailScreen beforeContent={beforeContent} name={route.constantName} value={route.constantValue} />
    );
  }

  if (route.name === 'blank' && blankPage) {
    return (
      <Page
        scrollable
        title={blankPage.title ?? 'Page vierge'}
        description={blankPage.description ?? 'Zone de test libre'}
        beforeContent={beforeContent}
      >
        <Section withPaddingY>{blankPage.render()}</Section>
      </Page>
    );
  }

  return null;
};
