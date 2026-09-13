import { useTheme } from '@alveole/theme';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Story } from '../../type/Story';
import { Button } from '../Button';
import { Header } from './Header';
import { useStyles } from './Header.styles';

export default {
  title: 'Header',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1736-931',
  description:
    "En-tête statique avec un logo carré et le titre de l'application à gauche, et un contenu libre à droite.",
  webOnly: true,
  component: Header,
  styleFn: useStyles,
} satisfies Story;

const LogoPlaceholder = () => {
  const { color, radius, text } = useTheme();
  return (
    <Box
      style={{
        width: 32,
        height: 32,
        borderRadius: radius('md'),
        backgroundColor: color.light.background['action-high-primary'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography style={{ ...text['Corps de texte'].XS.Bold, color: '#fff' }}>A</Typography>
    </Box>
  );
};

export const Default = () => (
  <Header
    logo={<LogoPlaceholder />}
    title="Nom de l'app"
    right={
      <>
        <Button variant="tertiary" title="Composants" size="sm" onPress={() => {}} />
        <Button variant="tertiary" title="Thème" size="sm" onPress={() => {}} />
        <Button variant="primary" title="Documentation" size="sm" onPress={() => {}} />
      </>
    }
  />
);

export const SansContenuDroite = () => <Header logo={<LogoPlaceholder />} title="Nom de l'app" />;

export const MobileSimple = () => (
  <Header logo={<LogoPlaceholder />} right={<Button variant="tertiary" title="≡" size="sm" onPress={() => {}} />} />
);

export * as Sources from './Header.stories.sources';
