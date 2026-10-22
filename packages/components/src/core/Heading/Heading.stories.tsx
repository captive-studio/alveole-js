import { Story } from '../../type';
import { Heading } from './Heading';

export default {
  title: 'Heading',
  tags: ['core'],
  experimental: true,
  description: 'Titre de section : `as` fixe la balise (h1 a h6) et sa taille par defaut.',
  component: Heading,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => <Heading>Titre de niveau 2</Heading>;

export const Niveaux = () => (
  <>
    <Heading as="h1">Titre h1</Heading>
    <Heading as="h2">Titre h2</Heading>
    <Heading as="h3">Titre h3</Heading>
    <Heading as="h4">Titre h4</Heading>
    <Heading as="h5">Titre h5</Heading>
    <Heading as="h6">Titre h6</Heading>
  </>
);

export * as Sources from './Heading.stories.sources';
