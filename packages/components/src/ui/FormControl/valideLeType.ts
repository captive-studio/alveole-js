import { Alert } from '../../core/Alert';
import { fichierCorrespondAuType } from './fichierCorrespondAuType';
import { FormControlFileInputProps } from './FormControlFileInput';

const refuser = (plusieurs: boolean) =>
  Alert.alert({
    title: 'Type de fichier incorrect',
    message: plusieurs
      ? 'Certains fichiers ne sont pas pris en charge'
      : "Le format du fichier n'est pas pris en charge",
  });

/**
 * Enveloppe un `onChange` de champ de fichier pour n'y laisser passer que les types autorises,
 * et prevenir l'utilisateur sinon. Un fichier dont le type MIME est inconnu passe : c'est au
 * selecteur, qui filtre deja, d'avoir eu le dernier mot.
 *
 * Les trois champs de fichier (FileField, DragAndDropFile natif et web) faisaient ce filtrage
 * chacun dans son coin, et avaient deja diverge : FileField reconnaissait les types avec ses
 * propres comparaisons de chaines, plus laches que celles des deux autres, et ne verifiait que
 * le premier fichier d'une selection multiple. Un meme fichier pouvait donc etre accepte ici et
 * refuse la.
 */
export const valideLeType =
  ({ type, onChange }: Pick<FormControlFileInputProps, 'type' | 'onChange'>): FormControlFileInputProps['onChange'] =>
  value => {
    if (type == null || value == null) return onChange(value);

    const fichiers = Array.isArray(value) ? value : [value];
    const tousValides = fichiers.every(
      fichier => fichier.mimeType == null || fichierCorrespondAuType(fichier.mimeType, fichier.name, type),
    );

    if (tousValides) return onChange(value);

    refuser(Array.isArray(value));
  };
