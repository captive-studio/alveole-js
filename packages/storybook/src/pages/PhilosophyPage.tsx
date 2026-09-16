import { Box, Page, PageHeader, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { ScreenZone } from '../components/ScreenZone';

type PhilosophySectionProps = {
  title: string;
  children: React.ReactNode;
};

const PhilosophySection = ({ title, children }: PhilosophySectionProps) => {
  const { text } = useTheme();

  return (
    <Box display="flex" gap={8} mb={'400'}>
      <Typography style={text.Titres['H4 - SM']}>{title}</Typography>
      {children}
    </Box>
  );
};

export type PhilosophyPageProps = {
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

export const PhilosophyPage = ({ beforeContent, sidebar, footerContent }: PhilosophyPageProps) => {
  const { grilles, text } = useTheme();

  return (
    <Page
      scrollable
      title="Philosophie"
      description="Les principes qui guident Alveole"
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
    >
      <ScreenZone largeur={grilles['12 colonnes']}>
        <PageHeader title="Philosophie" />
        <Box display="flex" gap={0} style={{ maxWidth: 720 }}>
          <PhilosophySection title="Objectif">
            <Typography style={text['Corps de texte'].MD.Regular}>
              {
                "Alveole est un framework de composants conçu pour accélérer la construction d'outils B2B. L'ambition est"
              }
              {
                ' de proposer une expérience clé en main : installer les packages, utiliser les composants, livrer. Pas de'
              }
              {' configuration interminable, pas de décisions de design à prendre à chaque écran.'}
            </Typography>
          </PhilosophySection>

          <PhilosophySection title="Convention plutôt que configuration">
            <Typography style={text['Corps de texte'].MD.Regular}>
              {"Alveole s'inspire du principe "}
              <Typography style={text['Corps de texte'].MD.Regular}>Convention over Configuration</Typography>
              {
                ' : le thème par défaut est pensé pour fonctionner sans ajustement. La customisation reste possible — palette,'
              }
              {
                ' typographie, espacements — mais elle est optionnelle et ciblée. Le but est de ne pas passer du temps à'
              }
              {' configurer ce qui fonctionne déjà bien.'}
            </Typography>
          </PhilosophySection>

          <PhilosophySection title="Des composants pensés pour l'UX">
            <Typography style={text['Corps de texte'].MD.Regular}>
              {"Chaque composant embarque les meilleures pratiques UI et UX de sa catégorie. L'objectif n'est pas de"}
              {
                " fournir une brique neutre que chaque projet devra affiner, mais un composant fini qui propose d'emblée la"
              }
              {" meilleure expérience pour l'utilisateur final. Il ne faut pas réinventer la roue à chaque projet."}
            </Typography>
          </PhilosophySection>

          <PhilosophySection title="Des choix assumés">
            <Typography style={text['Corps de texte'].MD.Regular}>
              {'Certaines décisions ne sont pas exposées en configuration. Par exemple, les icônes Lucide utilisent'}
              {' systématiquement un '}
              <Typography style={text['Corps de texte'].MD.Regular}>strokeWidth à 1.5</Typography>
              {
                " — cette valeur n'est pas modifiable par le consommateur du composant. Ce type de choix garantit la cohérence"
              }
              {
                " visuelle de l'ensemble : un design system qui offre trop de flexibilité cesse d'être un design system."
              }
            </Typography>
          </PhilosophySection>

          <PhilosophySection title="Inspirations">
            <Typography style={text['Corps de texte'].MD.Regular}>
              {"Alveole s'inspire de deux systèmes de design de référence dans l'écosystème B2B et open source :"}
              {
                " l'Atlassian Design System, reconnu pour sa rigueur dans les outils professionnels, et Primer, le design"
              }
              {' system de GitHub, apprécié pour sa clarté et sa cohérence à grande échelle.'}
            </Typography>
          </PhilosophySection>

          <PhilosophySection title="Construit dans la durée par Captive">
            <Typography style={text['Corps de texte'].MD.Regular}>
              {'Alveole est maintenu par Captive et évolue au fil des projets réels. Chaque composant est extrait,'}
              {' généralisé et affiné à partir de besoins concrets. Le framework grandit progressivement, avec une'}
              {" attention constante à la qualité plutôt qu'à l'exhaustivité."}
            </Typography>
          </PhilosophySection>
        </Box>
      </ScreenZone>
    </Page>
  );
};
