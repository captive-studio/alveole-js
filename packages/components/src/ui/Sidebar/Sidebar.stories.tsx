import { useState } from 'react';
import { Typography } from '../../core/Typography';
import { Story } from '../../type';
import { ActionMenu } from '../ActionMenu';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Sidebar } from './Sidebar';
import { useStyles } from './Sidebar.styles';
import { SidebarDivider } from './SidebarDivider';
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';
import { useSidebar } from './useSidebar';

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

export const ExampleUsage = () => {
  const controller = useSidebar();

  return (
    <Sidebar
      controller={controller}
      logo={
        <Typography fontSize={16} style={{ fontWeight: '700' }}>
          Mon Application
        </Typography>
      }
      footer={<SidebarItem pressable leading="LogOut" title="Se déconnecter" onPress={console.log} />}
    >
      <SidebarItem pressable title="Item 1" onPress={console.log} />
      <SidebarItem pressable title="Item 2" onPress={console.log} />

      <SidebarGroup title="Groupe">
        <SidebarItem pressable title="Item group 1" onPress={console.log} />
        <SidebarItem pressable title="Item group 2" onPress={console.log} />
      </SidebarGroup>
    </Sidebar>
  );
};

// Faute de logo publie pour Alveole, une forme generee tient lieu de logo.
const organisations = [
  { nom: 'Alveole', logo: 'https://api.dicebear.com/9.x/shapes/png?seed=Alveole&size=64' },
  { nom: 'Captive', logo: 'https://www.google.com/s2/favicons?domain=captive.fr&sz=64' },
  { nom: 'Bonne Gueule', logo: 'https://www.google.com/s2/favicons?domain=bonnegueule.fr&sz=64' },
];

const LogoDOrganisation = ({ nom }: { nom: string }) => (
  <Avatar size="xs" carre src={organisations.find(o => o.nom === nom)?.logo} fallbackText={nom} />
);

export const AvecHeaderEtFooter = () => {
  const [orga, setOrga] = useState('Alveole');

  const logo = (
    <ActionMenu
      placement="bottom-start"
      renderTrigger={() => (
        <Button
          variant="tertiary"
          size="md"
          alignContent="start"
          title={orga}
          leading={<LogoDOrganisation nom={orga} />}
          trailing="ChevronDown"
        />
      )}
    >
      {organisations.map(({ nom }) => (
        <ActionMenu.Item
          key={nom}
          title={nom}
          leading={<LogoDOrganisation nom={nom} />}
          selected={nom === orga}
          onPress={() => setOrga(nom)}
        />
      ))}
    </ActionMenu>
  );

  const footer = (
    <ActionMenu
      placement="top-start"
      renderTrigger={() => (
        <Button
          variant="tertiary"
          size="lg"
          alignContent="start"
          title="Clément Prod'homme"
          leading={<Avatar size="sm" src="https://www.loremfaces.net/96/id/1.jpg" fallbackText="Clément Prod'homme" />}
        />
      )}
    >
      <ActionMenu.Item title="Mon profil" leading="User" />
      <ActionMenu.Item title="Paramètres" leading="Settings" />
      <ActionMenu.Item title="Aide" leading="HelpCircle" />
      <ActionMenu.Item title="Se déconnecter" leading="LogOut" />
    </ActionMenu>
  );

  return (
    <Sidebar logo={logo} footer={footer}>
      <SidebarItem pressable leading="LayoutDashboard" title="Tableau de bord" onPress={console.log} />
      <SidebarItem pressable leading="Users" title="Utilisateurs" onPress={console.log} />
      <SidebarItem pressable leading="FileText" title="Rapports" onPress={console.log} />

      <SidebarDivider />

      <SidebarItem pressable leading="Settings" title="Configuration" onPress={console.log} />
      <SidebarItem pressable leading="Bell" title="Notifications" onPress={console.log} />
    </Sidebar>
  );
};

export * as Sources from './Sidebar.stories.sources';
