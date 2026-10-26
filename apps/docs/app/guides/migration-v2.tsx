import { MigrationV2Page } from '@alveole/storybook';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () => metadonnees('Migration v2', "Migrer une application d'Alveole 1.x vers 2.0");

export default function MigrationV2Route() {
  return <MigrationV2Page footerContent={<DocFooter />} />;
}
