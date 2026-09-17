import { StorybookMeta, StorybookModule } from '../types';
import { descriptionDeLExemple, resumeDeLaFiche, sourceDeLExemple } from './sourcesDExemples';

const fiche = (sources: unknown) => ({ Sources: sources }) as unknown as StorybookModule;

describe('sourceDeLExemple', () => {
  it('rend la source rangee sous le nom de l exemple', () => {
    expect(sourceDeLExemple(fiche({ storySources: { Tailles: '<Bouton />' } }), 'Tailles')).toBe('<Bouton />');
  });

  // Le generateur publie certaines sources en fonction, pour ne les construire qu'a la demande.
  it('appelle la source publiee en fonction', () => {
    expect(sourceDeLExemple(fiche({ storySources: { Tailles: () => '<Bouton />' } }), 'Tailles')).toBe('<Bouton />');
  });

  // Les premieres fiches exportaient leurs sources a la racine, avant le regroupement.
  it('se rabat sur la source posee a la racine', () => {
    expect(sourceDeLExemple(fiche({ Tailles: '<Bouton />' }), 'Tailles')).toBe('<Bouton />');
  });

  // Une fiche sans source n'est pas une erreur : la demonstration se montre sans son code.
  it('rend null quand la fiche n exporte aucune source', () => {
    expect(sourceDeLExemple({} as StorybookModule, 'Tailles')).toBeNull();
  });

  it('rend null quand l exemple n a pas de source', () => {
    expect(sourceDeLExemple(fiche({ storySources: {} }), 'Tailles')).toBeNull();
  });

  it('rend null quand la fonction ne rend pas du texte', () => {
    expect(sourceDeLExemple(fiche({ storySources: { Tailles: () => 42 } }), 'Tailles')).toBeNull();
  });
});

describe('descriptionDeLExemple', () => {
  it('rend la description rangee sous le nom de l exemple', () => {
    expect(descriptionDeLExemple(fiche({ storyDescriptions: { Tailles: 'Trois tailles.' } }), 'Tailles')).toBe(
      'Trois tailles.',
    );
  });

  it('rend null quand l exemple n est pas decrit', () => {
    expect(descriptionDeLExemple(fiche({ storyDescriptions: {} }), 'Tailles')).toBeNull();
  });

  it('rend null quand la fiche ne decrit aucun exemple', () => {
    expect(descriptionDeLExemple({} as StorybookModule, 'Tailles')).toBeNull();
  });
});

describe('resumeDeLaFiche', () => {
  const meta = (champs: Record<string, unknown>) => ({ description: '', ...champs }) as StorybookMeta;

  // Ce resume part dans la balise `description` de la page : il est lu par les moteurs et les
  // apercus de lien, jamais rendu a l'ecran. Rien ne le verifie donc en rendant la fiche.
  it('prefere le resume court quand la fiche en donne un', () => {
    expect(resumeDeLaFiche(meta({ shortDescription: 'Un bouton.', description: '# Bouton' }))).toBe('Un bouton.');
  });

  // A defaut, la description longue sert de resume, debarrassee de son balisage : une balise
  // `meta` ne rend pas le markdown, elle l'afficherait tel quel.
  it('se rabat sur la description longue, sans son balisage', () => {
    expect(resumeDeLaFiche(meta({ description: '# Bouton\n\nUn **bouton**.' }))).toBe('Bouton\n\nUn bouton.');
  });
});
