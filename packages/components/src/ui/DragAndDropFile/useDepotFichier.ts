import React from 'react';
import { Alert } from '../../core/Alert';
import {
  fichierCorrespondAuType,
  FormControlFileInputProps,
  FormControlFileInputValue,
  valideLeType,
} from '../FormControl';
import { fichiersDuDataTransfer } from './fichiersDuDataTransfer';

const enAsset = (file: File) =>
  ({
    uri: URL.createObjectURL(file),
    name: file.name,
    size: file.size,
    mimeType: file.type || 'application/octet-stream',
    file,
  }) as any;

// Chaque fichier depose est publie derriere une URL d'objet, que le navigateur garde en memoire
// tant qu'on ne la revoque pas. Sans ce nettoyage au changement de valeur, un formulaire ou
// l'utilisateur hesite accumule les fichiers relaches dans l'onglet.
const revoquer = (value: FormControlFileInputValue) => {
  const uris = (Array.isArray(value) ? value : [value]).map(fichier => fichier?.uri);

  uris.forEach(uri => {
    if (!uri?.startsWith('blob:')) return;
    try {
      URL.revokeObjectURL(uri);
    } catch {}
  });
};

/**
 * Tout ce que la zone de depot fait en plus du champ de fichier ordinaire : suivre le survol et
 * le survol de glissement, convertir les fichiers laches en valeurs du champ, et liberer les URL
 * d'objet. Ecrit dans le composant, ce comportement en occupait les cinq sixiemes et noyait le
 * peu de rendu qu'il contient.
 */
export const useDepotFichier = ({
  value,
  type,
  multiple,
  onChange,
}: Pick<FormControlFileInputProps, 'value' | 'type' | 'multiple' | 'onChange'>) => {
  const [isOver, setIsOver] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const [forceOpen, setForceOpen] = React.useState(false);

  const onValueChange = valideLeType({ type, onChange });

  // `deposer` et `onDrop` etaient memoises en omettant `onValueChange` de leurs dependances,
  // pour ne pas recreer les gestionnaires de glisser-deposer a chaque frappe du formulaire. Le
  // gain etait nul : `survol` reconstruit deja les quatre autres gestionnaires a chaque rendu.
  // Le cout, lui, etait reel : la memoisation figeait le gestionnaire du premier rendu, et un
  // formulaire controle deposait dans un `onChange` perime.
  const deposer = (files: File[]) => {
    const valides = files.filter(file => fichierCorrespondAuType(file.type || '', file.name, type));

    if (valides.length < files.length) {
      Alert.alert({ title: 'Type de fichier incorrect', message: 'Certains fichiers ne sont pas pris en charge' });
    }

    if (valides.length === 0) return;
    onValueChange(multiple ? valides.map(enAsset) : enAsset(valides[0]));
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);

    const files = fichiersDuDataTransfer(e.dataTransfer);
    if (files.length > 0) deposer(multiple ? files : [files[0]]);
  };

  const survol = (actif: boolean, appliquer: (actif: boolean) => void) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    appliquer(actif);
  };

  React.useEffect(() => () => revoquer(value), [value]);

  return {
    isOver,
    isMouseOver,
    forceOpen,
    onValueChange,
    ouvrir: () => setForceOpen(true),
    fermer: () => setForceOpen(false),
    onDrop,
    onDragOver: survol(true, setIsOver),
    onDragLeave: survol(false, setIsOver),
    onMouseOver: survol(true, setIsMouseOver),
    onMouseLeave: survol(false, setIsMouseOver),
  };
};
