import { Page, Section } from '@alveole/components';
import { CustomPalette, CustomTypography } from '@alveole/theme';
import React from 'react';
import { StoriesScreen } from '../screens/StoriesScreen';
import { StoryDetailScreen } from '../screens/StoryDetailScreen';
import { ThemeConstantDetailScreen } from '../screens/ThemeConstantDetailScreen';
import { ThemeConstantsScreen } from '../screens/ThemeConstantsScreen';
import { ThemePaletteScreen } from '../screens/ThemePaletteScreen';
import { ThemeTypographyScreen } from '../screens/ThemeTypographyScreen';
import { StorybookModule } from '../types';
import { HomeScreen, InternalHeader } from './ecransDuKit';
import { PhilosophyPage } from './PhilosophyPage';
import { UIKitThemePage } from './UIKitThemePage';

export type BlankPage = {
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
  palette?: Record<string, unknown>;
  typography?: Record<string, unknown>;
  title?: string;
  description?: string;
  blankPage?: BlankPage;
};

/** Ce dont un ecran du kit a besoin pour se rendre : les donnees de la page et le moyen d'avancer. */
type ContexteDEcran = {
  stories: StorybookModule[];
  constants: Record<string, unknown>;
  palette: Record<string, unknown>;
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
      <UIKitThemePage
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
