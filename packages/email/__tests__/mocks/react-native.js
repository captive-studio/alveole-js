// Ce que @alveole/theme lit de react-native : un mail se rend comme une page web.
module.exports = {
  Platform: { OS: 'web', select: options => options.web ?? options.default },
  useWindowDimensions: () => ({ width: 1024, height: 768 }),
  StyleSheet: { create: styles => styles, flatten: style => style },
};
