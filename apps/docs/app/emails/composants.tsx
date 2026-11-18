import { EcranDesComposants } from '../../components/emails/EcranDEmails';
import { metadonnees } from '../../components/metadonnees';

export const generateMetadata = () => metadonnees('Emails - Composants', 'Les composants de @alveole/email');

export default function ComposantsDEmailsRoute() {
  return <EcranDesComposants />;
}
