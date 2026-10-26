import { InstallationPage } from '@alveole/storybook';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () =>
  metadonnees('Installation', 'Installer et configurer Alveole dans une application Expo');

export default function InstallationRoute() {
  return <InstallationPage footerContent={<DocFooter />} />;
}
