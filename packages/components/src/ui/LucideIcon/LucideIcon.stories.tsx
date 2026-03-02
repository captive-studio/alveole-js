import { Box } from '../../core';
import { Story } from '../../type';
import { LucideIcon } from './LucideIcon';
import { LucideIconPropsJSON } from './LucideIcon.props';

export default {
  title: 'LucideIcon',
  tags: ['Kit'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/DSMuo6EvJHYYuU9nHmj90J/Captive.fr?node-id=3740-4789&t=AGgcv4H3Z7WE4pOo-4',
  description: 'Icon de la librairie Lucide',
  props: LucideIconPropsJSON,
  component: LucideIcon,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const Default = () => (
  <Box>
    <LucideIcon name="AArrowDown" size="sm" />
    <LucideIcon name="AArrowDown" size="md" />
    <LucideIcon name="AArrowDown" size="lg" />
    <LucideIcon name="AArrowDown" size="xl" />
  </Box>
);

export const Colored = () => <LucideIcon name="AArrowDown" size="md" color="blue" />;
