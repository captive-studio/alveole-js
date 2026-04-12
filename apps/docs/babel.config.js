module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui', '@alveole/components'],
          config: './tamagui.config.ts',
          logTimings: true,
        },
      ],
    ],
  };
};
