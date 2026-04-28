import { Box, Typography } from '../../core';
import { Story } from '../../type';
import { Button } from './Button';
import { useStyles } from './Button.styles';
import { ButtonIcon } from './ButtonIcon';

export default {
  title: 'Button',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Composants?node-id=1002-548',
  description: 'Boutons de type Pressable (React Native) avec différentes tailles et variants.',
  component: Button,
  styleFn: useStyles,
} satisfies Story;

export const Sizes = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="secondary" size="sm" title="Bouton sm" />
    <Button variant="secondary" size="md" title="Bouton md" />
    <Button variant="secondary" size="lg" title="Bouton lg" />
  </Box>
);

export const Primary = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="primary" title="Bouton primary" />
    <Button variant="primary" title="Disabled" disabled />
  </Box>
);

export const Secondary = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="secondary" title="Bouton secondary" />
    <Button variant="secondary" title="Disabled" disabled />
  </Box>
);

export const Tertiary = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="tertiary" title="Bouton tertiary" />
    <Button variant="tertiary" title="Disabled" disabled />
  </Box>
);

export const Danger = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="danger" title="Bouton danger" />
    <Button variant="danger" title="Disabled" disabled />
  </Box>
);

export const Link = () => (
  <>
    <Typography>Deprecated</Typography>
    <Box display="flex" flexDirection="row" gap={4}>
      <Button variant="link" title="Bouton link" />
      <Button variant="link" title="Disabled" disabled />
    </Box>
  </>
);

export const Icons = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="primary" title="Start Icon" startIcon="Plus" />
    <Button variant="primary" title="End Icon" endIcon="Plus" />
    <Button variant="primary" title="End Icon" endIcon="Plus" />
    <ButtonIcon variant="primary" icon="CircleUser" />
    <ButtonIcon variant="primary" icon="CircleUser" />
  </Box>
);

export const FullWidth = () => <Button variant="primary" title="Full Width" fullWidth />;

export const Selected = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="secondary" title="Selected" selected />
  </Box>
);

export const Active = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Typography>Utilisé quand le bouton est actif (ex: quand un menu est ouvert)</Typography>
    <Button variant="secondary" title="Active" active />
  </Box>
);

export * as Sources from './Button.stories.sources';
