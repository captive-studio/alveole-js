import React from 'react';
import { Alert } from '../../core/Alert';
import { ajoute, fichierCorrespondAuType, fichiersVisibles, FileInputProps, FileInputValue } from '../FormControl';
import { fichiersDuDataTransfer } from './fichiersDuDataTransfer';

const enAsset = (file: File) => ({
  uri: URL.createObjectURL(file),
  name: file.name,
  size: file.size,
  mimeType: file.type || 'application/octet-stream',
  lastModified: file.lastModified,
  file,
});

const urisBlob = (value: FileInputValue) =>
  (Array.isArray(value) ? value : [value]).map(fichier => fichier?.uri).filter(uri => uri?.startsWith('blob:'));

const revoquer = (uris: (string | undefined)[]) =>
  uris.forEach(uri => {
    try {
      URL.revokeObjectURL(uri!);
    } catch {}
  });

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
}: Pick<FileInputProps, 'value' | 'type' | 'multiple' | 'onChange'>) => {
  const [isOver, setIsOver] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const [forceOpen, setForceOpen] = React.useState(false);

  // `deposer` et `onDrop` etaient memoises en omettant le gestionnaire de valeur de leurs dependances,
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
    if (!multiple && fichiersVisibles(value).length > 0) return;
    onChange(ajoute(value, (multiple ? valides : [valides[0]]).map(enAsset), !!multiple));
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

  // Chaque fichier depose est publie derriere une URL d'objet, que le navigateur garde en memoire
  // tant qu'on ne la revoque pas. La valeur s'accumule : on ne libere que les URL qui en sortent,
  // et toutes au demontage.
  const urisRef = React.useRef<(string | undefined)[]>([]);
  React.useEffect(() => {
    const actuelles = urisBlob(value);
    revoquer(urisRef.current.filter(uri => !actuelles.includes(uri)));
    urisRef.current = actuelles;
  }, [value]);
  React.useEffect(() => () => revoquer(urisRef.current), []);

  return {
    isOver,
    isMouseOver,
    forceOpen,
    ouvrir: () => setForceOpen(true),
    fermer: () => setForceOpen(false),
    onDrop,
    onDragOver: survol(true, setIsOver),
    onDragLeave: survol(false, setIsOver),
    onMouseOver: survol(true, setIsMouseOver),
    onMouseLeave: survol(false, setIsMouseOver),
  };
};
