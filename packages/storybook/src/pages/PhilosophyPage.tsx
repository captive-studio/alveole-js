import { Box, Page, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { PageTitle } from '../components/PageTitle';
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
        <PageTitle title="Philosophie" />
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

          <PhilosophySection title="Le catalogue n'est pas une application">
            <Typography style={text['Corps de texte'].MD.Regular}>
              {"Ce site ne titre pas ses pages avec PageHeader, et c'est volontaire. PageHeader est l'en-tête des"}
              {" écrans d'une application cliente : son titre se lit dans le registre d'un outil de travail, à 24."}
              {' Un site de documentation se lit dans un autre registre, à 40, celui que Primer et Atlassian emploient'}
              {' tous deux pour leur propre documentation.'}
            </Typography>
            <Typography style={text['Corps de texte'].MD.Regular}>
              {'Les trois références séparent les deux, chacune à sa façon : Primer publie un paquet distinct,'}
              {' @primer/react-brand, pour sa documentation et sa vitrine ; Atlassian titre la sienne avec un style'}
              {" local au site, à une taille qui n'existe dans aucun de ses jetons, leur échelle s'arrêtant à 32 ;"}
              {' Uber reste dans son échelle publiée mais ne livre aucun PageHeader, son site composant son titre'}
              {' directement.'}
            </Typography>
            <Typography style={text['Corps de texte'].MD.Regular}>
              {"C'est la voie d'Uber qui est suivie ici, parce que c'est celle du design system dont la portée"}
              {' ressemble le plus à la nôtre, natif et web à la fois : une seule échelle de titres, et un site de'}
              {" documentation qui compose son titre avec, sans emprunter un composant d'application. La conséquence"}
              {' pratique : dans une application, un titre de page passe par PageHeader ; nulle part ailleurs.'}
            </Typography>
          </PhilosophySection>

          <PhilosophySection title="Inspirations">
            <Typography style={text['Corps de texte'].MD.Regular}>
              {"Alveole s'inspire de trois systèmes de design de référence dans l'écosystème B2B et open source :"}
              {" l'Atlassian Design System, reconnu pour sa rigueur dans les outils professionnels, Primer, le design"}
              {" system de GitHub, apprécié pour sa clarté et sa cohérence à grande échelle, et Base, celui d'Uber,"}
              {' dont la portée couvre comme la nôtre le natif et le web.'}
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
