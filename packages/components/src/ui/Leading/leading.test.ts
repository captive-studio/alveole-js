import { createElement } from 'react';
import { LucideIcon } from '../LucideIcon';
import { resoudreLeading, tailleDeLEmplacement } from './leading';

test("un nom donne l'icone correspondante", () => {
  expect(resoudreLeading('Mail')).toEqual({ type: 'icone', nom: 'Mail' });
});

test('un element est rendu tel quel', () => {
  const element = createElement(LucideIcon, { name: 'Mail', size: 'sm' });

  expect(resoudreLeading(element)).toEqual({ type: 'element', element });
});

test('null et undefined ne rendent rien', () => {
  expect(resoudreLeading(null)).toBeNull();
  expect(resoudreLeading(undefined)).toBeNull();
});

test("l'emplacement a la taille de l'icone qu'il remplace", () => {
  expect(tailleDeLEmplacement('sm')).toBe(16);
  expect(tailleDeLEmplacement('md')).toBe(24);
});
