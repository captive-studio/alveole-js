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
import { PhilosophyPage } from './PhilosophyPage';

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
  | { name: 'blank' }
  | { name: 'philosophy' };

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

/** Ce dont un ecran du kit a besoin pour se rendre : les donnees de la page et le moyen d'avancer. */
type ContexteDEcran = {
  stories: StorybookModule[];
  constants: Record<string, unknown>;
  palette: Record<string, any>;
  typography: Record<string, unknown>;
  title: string;
  description: string;
  blankPage?: BlankPage;
  beforeContent: React.ReactNode;
  push: (route: UIKitRoute) => void;
};

/**
 * La pile de navigation du kit. Elle vit ici et non dans le composant : la page n'a pas a savoir
 * comment on empile des routes pour savoir laquelle afficher.
 */
const useNavigationDuKit = () => {
  const [history, setHistory] = React.useState<UIKitRoute[]>([{ name: 'home' }]);

  const push = React.useCallback((nextRoute: UIKitRoute) => {
    setHistory(current => [...current, nextRoute]);
  }, []);

  const goBack = React.useCallback(() => {
    setHistory(current => (current.length > 1 ? current.slice(0, -1) : current));
  }, []);

  return { route: history[history.length - 1], canGoBack: history.length > 1, push, goBack };
};

/**
 * Chaque famille d'ecrans rend la route qui la concerne, et `null` sinon : c'est ce `null` qui
 * passe la main a la suivante. Decouper le routage par domaine plutot qu'en une seule chaine
 * garde chaque branche lisible et laisse TypeScript affiner la route sur son `name`.
 */
const ecranDAccueil = (route: UIKitRoute, ctx: ContexteDEcran): React.ReactNode | null => {
  if (route.name === 'home') {
    return (
      <HomeScreen
        title={ctx.title}
        description={ctx.description}
        blankPage={ctx.blankPage}
        onOpenComponents={() => ctx.push({ name: 'components' })}
        onOpenTheme={() => ctx.push({ name: 'theme-home' })}
        onOpenConstants={() => ctx.push({ name: 'constants' })}
        onOpenBlank={() => ctx.push({ name: 'blank' })}
        onOpenPhilosophy={() => ctx.push({ name: 'philosophy' })}
      />
    );
  }

  if (route.name === 'philosophy') return <PhilosophyPage beforeContent={ctx.beforeContent} />;

  if (route.name === 'blank' && ctx.blankPage) {
    const { blankPage } = ctx;

    return (
      <Page
        scrollable
        title={blankPage.title ?? 'Page vierge'}
        description={blankPage.description ?? 'Zone de test libre'}
        beforeContent={ctx.beforeContent}
      >
        <Section withPaddingY>{blankPage.render()}</Section>
      </Page>
    );
  }

  return null;
};

const ecranDesComposants = (route: UIKitRoute, ctx: ContexteDEcran): React.ReactNode | null => {
  if (route.name === 'components') {
    return (
      <StoriesScreen
        beforeContent={ctx.beforeContent}
        stories={ctx.stories}
        title="UI Kit - Composants"
        description="Catalogue des composants"
        createLabel={ctx.blankPage ? (ctx.blankPage.title ?? 'Page vierge') : undefined}
        onCreatePress={ctx.blankPage ? () => ctx.push({ name: 'blank' }) : undefined}
        getStoryHref={story => `/components/${encodeURIComponent(story.default.title)}`}
      />
    );
  }

  if (route.name === 'component-detail') {
    return (
      <StoryDetailScreen
        beforeContent={ctx.beforeContent}
        story={route.story}
        notFoundMessage="Composant introuvable"
      />
    );
  }

  return null;
};

const ecranDuTheme = (route: UIKitRoute, ctx: ContexteDEcran): React.ReactNode | null => {
  if (route.name === 'theme-home') {
    return (
      <ThemeHomeScreen
        beforeContent={ctx.beforeContent}
        onOpenColors={() => ctx.push({ name: 'theme-colors' })}
        onOpenTypography={() => ctx.push({ name: 'theme-typography' })}
      />
    );
  }

  if (route.name === 'theme-colors') {
    return (
      <ThemePaletteScreen
        beforeContent={ctx.beforeContent}
        palette={ctx.palette}
        title="UI Kit - Couleurs du thème"
        description="Palette et couleurs du thème"
      />
    );
  }

  if (route.name === 'theme-typography') {
    return (
      <ThemeTypographyScreen
        beforeContent={ctx.beforeContent}
        typography={ctx.typography}
        title="UI Kit - Textes du thème"
        description="Styles de texte du thème"
      />
    );
  }

  return null;
};

const ecranDesConstantes = (route: UIKitRoute, ctx: ContexteDEcran): React.ReactNode | null => {
  if (route.name === 'constants') {
    return (
      <ThemeConstantsScreen
        beforeContent={ctx.beforeContent}
        constants={ctx.constants}
        title="UI Kit - Constantes"
        description="Constantes exposées par le thème"
        onSelectConstant={({ name, value }) =>
          ctx.push({ name: 'constant-detail', constantName: name, constantValue: value })
        }
      />
    );
  }

  if (route.name === 'constant-detail') {
    return (
      <ThemeConstantDetailScreen
        beforeContent={ctx.beforeContent}
        name={route.constantName}
        value={route.constantValue}
      />
    );
  }

  return null;
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
  const { route, canGoBack, push, goBack } = useNavigationDuKit();

  const ctx: ContexteDEcran = {
    stories,
    constants,
    palette,
    typography,
    title,
    description,
    blankPage,
    beforeContent: <InternalHeader canGoBack={canGoBack} onBack={goBack} />,
    push,
  };

  return (
    ecranDAccueil(route, ctx) ??
    ecranDesComposants(route, ctx) ??
    ecranDuTheme(route, ctx) ??
    ecranDesConstantes(route, ctx)
  );
};
