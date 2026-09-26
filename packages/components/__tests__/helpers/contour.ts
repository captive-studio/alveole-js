import { StyleSheet } from 'react-native';
import type { renderNative } from './renderNative';

/** La couleur de bordure du premier cadre du rendu natif qui en porte une : celui du champ. */
export const contour = (view: Awaited<ReturnType<typeof renderNative>>) =>
  view.root
    ?.queryAll(noeud => noeud.type === 'View')
    .map(vue => StyleSheet.flatten(vue.props.style)?.borderColor)
    .find(couleur => couleur != null);
