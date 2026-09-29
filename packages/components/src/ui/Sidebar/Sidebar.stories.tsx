import { useState } from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Story } from '../../type';
import { ActionMenu } from '../ActionMenu';
import { Avatar } from '../Avatar';
import { ButtonIcon } from '../Button';
import { LucideIcon } from '../LucideIcon';
import { Sidebar } from './Sidebar';
import { useStyles } from './Sidebar.styles';
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';

export default {
  title: 'Sidebar',
  tags: ['ui'],
  experimental: false,
  webOnly: true,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1328-725',
  description:
    "SideNav est un composant de navigation primaire qui permet d'accéder aux principales sections d'une application. Navigation coté droit, se transformant en menu burger sur mobile. Uitliser `<SidebarItem>` et `<SidebarGroup>`.",
  shortDescription:
    'Navigation primaire latérale. Se transforme en menu burger sur mobile. À utiliser avec SidebarItem et SidebarGroup.',
  component: Sidebar,
  styleFn: useStyles,
} satisfies Story;

/**
 * Exemple d'intégration complète du composant avec un contrôleur, un logo et un footer.
 *
 * ```tsx
 * <Sidebar
 *   controller={sidebarController}
 *   logo={<Image source={require('../../assets/logo.png')} />}
 *   footer={<SidebarItem pressable icon="LogOut" title="Se déconnecter" onPress={onLogout} />}
 * >
 *   <SidebarItem title="Item 1" href="/admin/item-1" routeName="item-1" />
 *   <SidebarItem title="Item 2" href="/admin/item-2" routeName="item-2" />
 *
 *   <SidebarGroup title="Groupe">
 *     <SidebarItem title="Item group 1" href="/admin/gp-item-2" routeName="gp-item-1" />
 *     <SidebarItem title="Item group 2" href="/admin/gp-item-2" routeName="gp-item-2" />
 *   </SidebarGroup>
 * </Sidebar>
 * ```
 */
export const ExampleUsage = () => null;

export const AvecHeaderEtFooter = () => {
  const [orga, setOrga] = useState('Alvéole');

  const logo = (
    <ActionMenu
      placement="bottom-start"
      renderTrigger={() => (
        <Box flexDirection="row" style={{ alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <Typography fontSize={14} style={{ fontWeight: '600' }}>
            {orga}
          </Typography>
          <LucideIcon name="ChevronDown" size="sm" />
        </Box>
      )}
    >
      <ActionMenu.Item title="Alvéole" onPress={() => setOrga('Alvéole')} />
      <ActionMenu.Item title="Captive" onPress={() => setOrga('Captive')} />
      <ActionMenu.Item title="Bonne Gueule" onPress={() => setOrga('Bonne Gueule')} />
    </ActionMenu>
  );

  const footer = (
    <Box flexDirection="row" style={{ alignItems: 'center', gap: 8 }}>
      <Avatar size="sm" src="https://www.loremfaces.net/96/id/1.jpg" fallbackText="Clément Prod'homme" />
      <Box flex={1}>
        <Typography fontSize={14} style={{ fontWeight: '600' }}>
          Clément Prod&apos;homme
        </Typography>
        <Typography fontSize={12}>Administrateur</Typography>
      </Box>
      <ActionMenu
        placement="top-end"
        renderTrigger={() => (
          <ButtonIcon icon="MoreHorizontal" variant="tertiary" accessibilityLabel="Menu utilisateur" />
        )}
      >
        <ActionMenu.Item title="Mon profil" icon="User" />
        <ActionMenu.Item title="Paramètres" icon="Settings" />
        <ActionMenu.Item title="Aide" icon="HelpCircle" />
        <ActionMenu.Item title="Se déconnecter" icon="LogOut" />
      </ActionMenu>
    </Box>
  );

  return (
    <Sidebar logo={logo} footer={footer}>
      <SidebarItem pressable icon="LayoutDashboard" title="Tableau de bord" onPress={console.log} />
      <SidebarItem pressable icon="Users" title="Utilisateurs" onPress={console.log} />
      <SidebarItem pressable icon="FileText" title="Rapports" onPress={console.log} />

      <SidebarGroup title="Paramètres">
        <SidebarItem pressable icon="Settings" title="Configuration" onPress={console.log} />
        <SidebarItem pressable icon="Bell" title="Notifications" onPress={console.log} />
      </SidebarGroup>
    </Sidebar>
  );
};

export * as Sources from './Sidebar.stories.sources';
