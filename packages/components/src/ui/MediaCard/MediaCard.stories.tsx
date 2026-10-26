import { Box } from '../../core/Box';
import { Story } from '../../type';
import { MediaCard } from './MediaCard';
import { useStyles } from './MediaCard.styles';

export default {
  title: 'MediaCard',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=4043-5273',
  description:
    "Carte d'un fichier : aperçu en 16/9, étiquette de type et nom tronqué. Sans `apercu`, ou si l'image ne charge pas, une icône de fichier remplace l'aperçu. Le survol voile l'aperçu et relève l'ombre.",
  component: MediaCard,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box style={{ width: 282 }}>
    <MediaCard
      nom="PC-16100_Proposition_commerciale.pdf"
      type="PDF"
      apercu={require('@/assets/images/apercu-pdf.png')}
      onPress={() => {}}
    />
  </Box>
);

export const ImageIntrouvable = () => (
  <Box style={{ width: 282 }}>
    <MediaCard nom="PC-16100_Proposition_commerciale.pdf" type="PDF" onPress={() => {}} />
  </Box>
);

export * as Sources from './MediaCard.stories.sources';
