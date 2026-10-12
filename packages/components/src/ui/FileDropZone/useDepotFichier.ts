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

const contientDesFichiers = (e: React.DragEvent) => Array.from(e.dataTransfer?.types ?? []).includes('Files');

type Options = Pick<FileInputProps, 'value' | 'type' | 'multiple' | 'onChange' | 'disabled'>;

/**
 * Le comportement de la zone de depot : s'allumer quand un glissement de fichiers la survole,
 * convertir les fichiers lâches en valeurs du champ, et liberer les URL d'objet. Chaque
 * evenement traite s'arrete a la zone : entre zones imbriquees, seule la plus proche reagit.
 */
export const useDepotFichier = ({ value, type, multiple, onChange, disabled }: Options) => {
  const [actif, setActif] = React.useState(false);
  // `dragenter`/`dragleave` se declenchent a chaque enfant traverse : on compte les entrees pour
  // ne s'eteindre qu'en quittant vraiment la zone.
  const entreesRef = React.useRef(0);

  // Meme regle que le bouton du champ : un champ simple qui montre deja un fichier n'en recoit pas.
  const accepte = !disabled && (!!multiple || fichiersVisibles(value).length === 0);
  const concerne = (e: React.DragEvent) => accepte && contientDesFichiers(e);

  // Les gestionnaires ne sont pas memoises : un formulaire controle passe un `onChange` neuf a
  // chaque rendu, et une memoisation figerait celui du premier rendu.
  const deposer = (files: File[]) => {
    const valides = files.filter(file => fichierCorrespondAuType(file.type || '', file.name, type));

    if (valides.length < files.length) {
      Alert.alert({ title: 'Type de fichier incorrect', message: 'Certains fichiers ne sont pas pris en charge' });
    }

    if (valides.length === 0) return;
    onChange(ajoute(value, (multiple ? valides : [valides[0]]).map(enAsset), !!multiple));
  };

  const arreter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragEnter = (e: React.DragEvent) => {
    if (!concerne(e)) return;
    arreter(e);
    entreesRef.current += 1;
    setActif(true);
  };

  const onDragOver = (e: React.DragEvent) => {
    if (concerne(e)) arreter(e);
  };

  const onDragLeave = (e: React.DragEvent) => {
    if (!concerne(e)) return;
    arreter(e);
    entreesRef.current = Math.max(0, entreesRef.current - 1);
    if (entreesRef.current === 0) setActif(false);
  };

  const onDrop = (e: React.DragEvent) => {
    if (!concerne(e)) return;
    arreter(e);
    entreesRef.current = 0;
    setActif(false);

    const files = fichiersDuDataTransfer(e.dataTransfer);
    if (files.length > 0) deposer(multiple ? files : [files[0]]);
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

  return { actif, onDragEnter, onDragOver, onDragLeave, onDrop };
};
