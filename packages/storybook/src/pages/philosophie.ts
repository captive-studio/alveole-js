/**
 * Le texte de la page Philosophie. Il est range ici, en donnees, parce qu'ecrire une section de
 * plus ne doit pas demander de toucher a du JSX : la page sait rendre, elle n'a pas a savoir quoi.
 */
export type SectionDePhilosophie = {
  titre: string;
  paragraphes: readonly string[];
};

export const SECTIONS_DE_PHILOSOPHIE: readonly SectionDePhilosophie[] = [
  {
    titre: 'Objectif',
    paragraphes: [
      "Alveole est un framework de composants conçu pour accélérer la construction d'outils B2B. L'ambition est de proposer une expérience clé en main : installer les packages, utiliser les composants, livrer. Pas de configuration interminable, pas de décisions de design à prendre à chaque écran.",
    ],
  },
  {
    titre: 'Convention plutôt que configuration',
    paragraphes: [
      "Alveole s'inspire du principe Convention over Configuration : le thème par défaut est pensé pour fonctionner sans ajustement. La customisation reste possible — palette, typographie, espacements — mais elle est optionnelle et ciblée. Le but est de ne pas passer du temps à configurer ce qui fonctionne déjà bien.",
    ],
  },
  {
    titre: "Des composants pensés pour l'UX",
    paragraphes: [
      "Chaque composant embarque les meilleures pratiques UI et UX de sa catégorie. L'objectif n'est pas de fournir une brique neutre que chaque projet devra affiner, mais un composant fini qui propose d'emblée la meilleure expérience pour l'utilisateur final. Il ne faut pas réinventer la roue à chaque projet.",
    ],
  },
  {
    titre: 'Des choix assumés',
    paragraphes: [
      "Certaines décisions ne sont pas exposées en configuration. Par exemple, les icônes Lucide utilisent systématiquement un strokeWidth à 1.5 — cette valeur n'est pas modifiable par le consommateur du composant. Ce type de choix garantit la cohérence visuelle de l'ensemble : un design system qui offre trop de flexibilité cesse d'être un design system.",
    ],
  },
  {
    titre: "Le catalogue n'est pas une application",
    paragraphes: [
      "Ce site ne titre pas ses pages avec PageHeader, et c'est volontaire. PageHeader est l'en-tête des écrans d'une application cliente : son titre se lit dans le registre d'un outil de travail, à 24. Un site de documentation se lit dans un autre registre, à 40, celui que Primer et Atlassian emploient tous deux pour leur propre documentation.",
      "Les trois références séparent les deux, chacune à sa façon : Primer publie un paquet distinct, @primer/react-brand, pour sa documentation et sa vitrine ; Atlassian titre la sienne avec un style local au site, à une taille qui n'existe dans aucun de ses jetons, leur échelle s'arrêtant à 32 ; Uber reste dans son échelle publiée mais ne livre aucun PageHeader, son site composant son titre directement.",
      "C'est la voie d'Uber qui est suivie ici, parce que c'est celle du design system dont la portée ressemble le plus à la nôtre, natif et web à la fois : une seule échelle de titres, et un site de documentation qui compose son titre avec, sans emprunter un composant d'application. La conséquence pratique : dans une application, un titre de page passe par PageHeader ; nulle part ailleurs.",
    ],
  },
  {
    titre: 'Inspirations',
    paragraphes: [
      "Alveole s'inspire de trois systèmes de design de référence dans l'écosystème B2B et open source : l'Atlassian Design System, reconnu pour sa rigueur dans les outils professionnels, Primer, le design system de GitHub, apprécié pour sa clarté et sa cohérence à grande échelle, et Base, celui d'Uber, dont la portée couvre comme la nôtre le natif et le web.",
    ],
  },
  {
    titre: 'Construit dans la durée par Captive',
    paragraphes: [
      "Alveole est maintenu par Captive et évolue au fil des projets réels. Chaque composant est extrait, généralisé et affiné à partir de besoins concrets. Le framework grandit progressivement, avec une attention constante à la qualité plutôt qu'à l'exhaustivité.",
    ],
  },
];
