import { Typography } from '../../core';
import { Story } from '../../type';
import { Sidebar } from './Sidebar';
import { useStyles } from './Sidebar.styles';

export default {
  title: 'Sidebar',
  tags: ['Composant'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1328-725',
  description:
    'SideNav est un composant de navigation primaire qui permet d’accéder aux principales sections d’une application. Navigation coté droit, se transformant en menu burger sur mobile. Uitliser <SidebarItem> et <SidebarGroup>.',
  component: Sidebar,
  styleFn: useStyles,
} satisfies Story;

const codeExample = `<Sidebar
  controller={sidebarController}
  logo={<Image source={require('../../assets/logo.png')} />}
  footer={<Button borderNone variant="tertiary" title="Se déconnecter" onPress={onLogout} />}
>
  <SidebarItem title="Item 1" href="/admin/item-1" routeName="item-1" />
  <SidebarItem title="Item 2" href="/admin/item-2" routeName="item-2" />
 
  <SidebarGroup title="Groupe">
    <SidebarItem title="Item group 1" href="/admin/gp-item-2" routeName="gp-item-1" />
    <SidebarItem title="Item group 2" href="/admin/gp-item-2" routeName="gp-item-2" />
  </SidebarGroup>
</Sidebar>`;

export const ExampleUsage = () => <Typography>{codeExample}</Typography>;

export * as Sources from './Sidebar.stories.sources';
