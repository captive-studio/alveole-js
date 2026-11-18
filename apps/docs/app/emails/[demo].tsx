import { Typography } from '@alveole/components';
import { useLocalSearchParams } from 'expo-router';
import type { GenerateMetadataFunction } from 'expo-router/server';
import { DEMOS_D_EMAILS, demoDEmail } from '../../components/emails/demos';
import { EcranDEmail } from '../../components/emails/EcranDEmail';
import { metadonnees } from '../../components/metadonnees';

export function generateStaticParams(): { demo: string }[] {
  return DEMOS_D_EMAILS.map(({ nom }) => ({ demo: nom }));
}

export const generateMetadata: GenerateMetadataFunction = (_, { demo }) => {
  const trouvee = demoDEmail(String(demo));
  return trouvee ? metadonnees(trouvee.titre, trouvee.description) : null;
};

export default function DemoDEmailRoute() {
  const { demo } = useLocalSearchParams<{ demo: string }>();
  const trouvee = demoDEmail(demo);
  return trouvee ? <EcranDEmail demo={trouvee} /> : <Typography>Démonstration introuvable.</Typography>;
}
