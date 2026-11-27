import { GuideDesEmails } from '../../components/emails/Guide';
import { metadonnees } from '../../components/metadonnees';

export const generateMetadata = () => metadonnees('Emails', 'Écrire des mails transactionnels avec @alveole/email');

export default function EmailsRoute() {
  return <GuideDesEmails />;
}
