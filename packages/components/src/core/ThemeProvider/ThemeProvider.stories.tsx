import { useTheme } from '@alveole/theme';
import { Story } from '../../type';
import { Box } from '../Box';
import { Highlight } from '../Highlight';
import { Typography } from '../Typography';

export default {
  title: 'ThemeProvider',
  tags: ['Kit'],
  experimental: false,
  webOnly: true,
  description:
    'Provider de thème. Injecte les tokens CSS (couleurs, espacements, typographies, rayons). Supporte deux modes : injection dynamique (défaut) ou CSS pré-compilé statique.',
  styleFn: () => ({}),
} satisfies Story;

/**
 * Mode par défaut : les variables CSS sont injectées au runtime via des balises `<style>`,
 * recalculées à chaque changement de thème.
 *
 * ```tsx
 * import { ThemeProvider } from '@alveole/theme';
 *
 * export default function RootLayout() {
 *   return (
 *     <ThemeProvider>
 *       {children}
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const UsageDefaut = () => {
  const { color, text } = useTheme();

  return (
    <Box display="flex" flexDirection="column" gap={12}>
      <Box
        display="flex"
        flexDirection="row"
        gap={8}
        style={{
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
          backgroundColor: color.light.background['default-grey'],
        }}
      >
        <Box
          style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color.light.background['active-primary'] }}
        />
        <Typography style={text['Corps de texte'].SM.Regular}>
          Mode actif : injection dynamique via balises &lt;style&gt;
        </Typography>
      </Box>
      <Highlight language="tsx">
        {`import { ThemeProvider } from '@alveole/theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}`}
      </Highlight>
    </Box>
  );
};

/**
 * Mode CSS statique : les variables CSS sont pré-compilées dans `dist/default.css` au moment
 * du build du package. Le navigateur peut mettre ce fichier en cache — aucune balise `<style>`
 * n'est injectée au runtime.
 *
 * **Étapes :**
 * 1. Importer le CSS dans le layout racine (Expo Router, Next.js, etc.)
 * 2. Passer le prop `staticCSS` au `ThemeProvider`
 *
 * ```tsx
 * import '@alveole/theme/dist/default.css';
 * import { ThemeProvider } from '@alveole/theme';
 *
 * export default function RootLayout() {
 *   return (
 *     <ThemeProvider staticCSS>
 *       {children}
 *     </ThemeProvider>
 *   );
 * }
 * ```
 *
 * **Limitation — incompatible avec la personnalisation des couleurs.**
 * Le prop `color` du `ThemeProvider` permet de surcharger des tokens de couleur.
 * Avec `staticCSS`, ces surcharges ne sont pas injectées et le thème custom est ignoré.
 * Si l'app passe des couleurs personnalisées, **ne pas utiliser `staticCSS`**.
 *
 * ```tsx
 * // ❌ Les overrides color sont silencieusement ignorés
 * <ThemeProvider staticCSS color={{ light: { background: { 'default-grey': '#eee' } } }}>
 *
 * // ✅ Sans staticCSS, les overrides fonctionnent normalement
 * <ThemeProvider color={{ light: { background: { 'default-grey': '#eee' } } }}>
 * ```
 */
export const UsageCSSStatique = () => {
  const { color, text } = useTheme();

  return (
    <Box display="flex" flexDirection="column" gap={12}>
      <Box
        display="flex"
        flexDirection="row"
        gap={8}
        style={{
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
          backgroundColor: color.light.background['default-grey'],
        }}
      >
        <Box
          style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color.light.background['active-primary'] }}
        />
        <Typography style={text['Corps de texte'].SM.Regular}>
          Mode actif : CSS pré-compilé — aucune balise &lt;style&gt; injectée
        </Typography>
      </Box>
      <Highlight language="tsx">
        {`import '@alveole/theme/dist/default.css';
import { ThemeProvider } from '@alveole/theme';

export default function RootLayout() {
  return (
    <ThemeProvider staticCSS>
      {children}
    </ThemeProvider>
  );
}`}
      </Highlight>
      <Box
        display="flex"
        flexDirection="column"
        gap={8}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 8,
          backgroundColor: color.light.background['action-high-error'],
        }}
      >
        <Typography style={{ ...text['Corps de texte'].SM.Medium, color: color.light.text['action-high-error'] }}>
          Limitation : incompatible avec color custom
        </Typography>
        <Typography style={{ ...text['Corps de texte'].SM.Regular, color: color.light.text['action-high-error'] }}>
          Si l&apos;app passe un prop `color` au ThemeProvider, les variables overridées ne seront pas injectées. Dans
          ce cas, retirer `staticCSS`.
        </Typography>
      </Box>
      <Highlight language="tsx">
        {`// ❌ Les overrides color sont ignorés avec staticCSS
<ThemeProvider staticCSS color={{ light: { background: { 'default-grey': '#eee' } } }}>

// ✅ Sans staticCSS, les overrides fonctionnent
<ThemeProvider color={{ light: { background: { 'default-grey': '#eee' } } }}>`}
      </Highlight>
    </Box>
  );
};

export * as Sources from './ThemeProvider.stories.sources';
