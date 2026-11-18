import { EcranDesExemples } from '../../components/emails/EcranDEmails';
import { metadonnees } from '../../components/metadonnees';

export const generateMetadata = () => metadonnees('Emails - Exemples', 'Des mails complets écrits avec @alveole/email');

export default function ExemplesDEmailsRoute() {
  return <EcranDesExemples />;
}
