import { Story } from '../../type';
import dotsAnimation from './animations/dots.json';
import { Lottie } from './Lottie';

export default {
  title: 'Lottie',
  tags: ['Kit'],
  experimental: true,
  description: 'Lottie animations',
  component: Lottie,
  styleFn: () => 'Aucun style',
} satisfies Story;

export const Default = () => <Lottie style={{ width: 32, height: 32 }} source={dotsAnimation} />;

export const Size = () => <Lottie style={{ width: 60, height: 60 }} source={dotsAnimation} />;
