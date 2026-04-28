// This file is generated. Do not edit manually.
// Source: src/core/Lottie/Lottie.stories.tsx

export const Default = () => "export const Default = () => <Lottie loop style={{ width: 32, height: 32 }} source={dotsAnimation} />;";

export const Size = () => "export const Size = () => <Lottie loop style={{ width: 60, height: 60 }} source={dotsAnimation} />;";

export const Loop = () => "export const Loop = () => (\n  <Lottie loop style={{ width: 60, height: 60 }} source={dotsAnimation} onAnimationLoop={console.log} />\n);";

export const OneTime = () => "export const OneTime = () => (\n  <Lottie loop={false} style={{ width: 60, height: 60 }} source={dotsAnimation} onAnimationFinish={console.log} />\n);";

export const storySources = {
  Default,
  Size,
  Loop,
  OneTime,
} as const;

export type StorySourceName = keyof typeof storySources;
