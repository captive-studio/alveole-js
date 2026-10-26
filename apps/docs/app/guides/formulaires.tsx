import { FormulairesPage } from '@alveole/storybook';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () => metadonnees('Formulaires', 'Construire un formulaire avec les champs Alveole');

export default function FormulairesRoute() {
  return <FormulairesPage footerContent={<DocFooter />} />;
}
