import { Accordion, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { EcranDeCatalogue, filDuTheme } from '../components/EcranDeCatalogue';
import { LigneDeToken } from '../components/LigneDeToken';
import type { CatalogueDesCouleurs } from '../couleurs/catalogueDesCouleurs';
import { catalogueDuTheme } from '../couleurs/catalogueDesCouleurs.generated';
import { FamilleDeTokens, famillesDuCatalogue } from './famillesDuCatalogue';

export type ThemePaletteScreenProps = {
  /** Le catalogue extrait du source du theme (ADR 0035). Par defaut, celui d'Alveole. */
  catalogue?: CatalogueDesCouleurs;
  /** @deprecated Ignoree : l'ecran lit le catalogue extrait du theme. Retiree au prochain bump majeur. */
  palette?: Record<string, unknown>;
  title?: string;
  description?: string;
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

const SectionDeTokens = ({ famille }: { famille: FamilleDeTokens }) => (
  <Accordion.Item value={famille.titre} label={famille.titre} variant="alt" noPadding>
    {famille.tokens.map(token => (
      <LigneDeToken key={token.chemin} token={token} />
    ))}
  </Accordion.Item>
);

/**
 * La page des nuances lie chaque token a sa ligne, ancree sur son chemin. Le lien navigue cote
 * client : le navigateur ne defile pas de lui-meme vers l'ancre, l'ecran le fait. Le routeur ne
 * pose la nouvelle adresse qu'apres le montage de l'ecran, d'ou la lecture differee d'une tâche.
 */
const defilerVersLAncre = () => {
  if (typeof document === 'undefined' || !window.location?.hash) return;
  document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView();
};

export const ThemePaletteScreen = ({
  catalogue = catalogueDuTheme,
  title = 'Tokens sémantiques',
  description = 'Les tokens de couleur du thème, leur nuance et leur statut',
  beforeContent,
  sidebar,
  footerContent,
}: ThemePaletteScreenProps) => {
  const { color } = useTheme();
  const familles = React.useMemo(() => famillesDuCatalogue(catalogue), [catalogue]);
  const [ouvertes, setOuvertes] = React.useState(() => familles.map(famille => famille.titre));
  React.useEffect(() => {
    const differe = setTimeout(defilerVersLAncre, 0);
    return () => clearTimeout(differe);
  }, []);

  return (
    <EcranDeCatalogue
      title={title}
      description={description}
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
      breadcrumbsProps={filDuTheme}
    >
      <Typography style={{ fontSize: 14, color: color.light.text['mention-grey'], marginBottom: 24 }}>
        {'Cliquez sur un token pour copier sa valeur dans le presse-papiers.'}
      </Typography>
      <Accordion type="multiple" value={ouvertes} onValueChange={setOuvertes}>
        {familles.map(famille => (
          <SectionDeTokens key={famille.titre} famille={famille} />
        ))}
      </Accordion>
    </EcranDeCatalogue>
  );
};
