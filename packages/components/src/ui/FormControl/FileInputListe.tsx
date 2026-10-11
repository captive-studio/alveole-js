import { Linking } from 'react-native';
import { Box } from '../../core/Box';
import { ButtonIcon } from '../Button';
import { ListItem } from '../ListItem';
import { IconProps } from '../LucideIcon';
import { FileInputFile, FileInputLabels } from './fichiersDuChamp';

const estUneImage = (fichier: FileInputFile) =>
  fichier.mimeType?.startsWith('image/') || /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(fichier.name ?? '');

const iconeDe = (fichier: FileInputFile): IconProps['name'] => {
  if (fichier.persisted) return 'FileCheckCorner';
  if (fichier.mimeType?.includes('pdf') || fichier.name?.endsWith('.pdf')) return 'FileText';
  if (estUneImage(fichier)) return 'FileImage';
  return 'File';
};

type FileInputListeProps = {
  fichiers: FileInputFile[];
  labels: FileInputLabels;
  retirable: boolean;
  onRetirer: (fichier: FileInputFile) => void;
};

/** Les fichiers montres par le champ : apercu ou icone, ouverture au clic, bouton de retrait. */
export const FileInputListe = ({ fichiers, labels, retirable, onRetirer }: FileInputListeProps) => {
  if (fichiers.length === 0) return null;

  return (
    <Box tag="file-input-list">
      {fichiers.map((fichier, index) => {
        const nom = fichier.name ?? labels.unnamed;
        return (
          <ListItem
            key={fichier.id ?? fichier.uri}
            title={nom}
            preview_url={estUneImage(fichier) ? fichier.uri : undefined}
            IconProps={{ name: iconeDe(fichier) }}
            showSeparateur={index !== 0}
            onPress={() => Linking.openURL(fichier.uri).catch(() => {})}
            trailing={() => (
              <ButtonIcon
                accessibilityLabel={`${labels.remove} ${nom}`}
                disabled={!retirable}
                variant="tertiary"
                icon="CircleX"
                onPress={() => onRetirer(fichier)}
              />
            )}
          />
        );
      })}
    </Box>
  );
};
