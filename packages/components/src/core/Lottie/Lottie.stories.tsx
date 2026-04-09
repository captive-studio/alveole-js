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

export const Default = () => <Lottie loop style={{ width: 32, height: 32 }} source={dotsAnimation} />;

export const Size = () => <Lottie loop style={{ width: 60, height: 60 }} source={dotsAnimation} />;

export const Loop = () => <Lottie loop style={{ width: 60, height: 60 }} source={dotsAnimation} onLoop={console.log} />;

export const OneTime = () => (
  <Lottie loop={false} style={{ width: 60, height: 60 }} source={dotsAnimation} onFinish={console.log} />
);
