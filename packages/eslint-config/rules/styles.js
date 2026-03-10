/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.styles.ts'],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: "Property[key.name='transition'], Property[key.value='transition']",
        message:
          'N’utilisez pas la propriété CSS transition. Utilisez transitionBehavior, transitionDelay, transitionDuration, transitionProperty ou transitionTimingFunction à la place.',
      },
      {
        selector:
          "Property[key.name='padding'] > Literal[value=/\\s+/], Property[key.value='padding'] > Literal[value=/\\s+/]",
        message:
          'N’utilisez pas la forme raccourcie padding avec plusieurs valeurs. Utilisez paddingTop, paddingBottom, paddingLeft et paddingRight à la place.',
      },
      {
        selector: "Property[key.name='border'], Property[key.value='border']",
        message:
          'N’utilisez pas la propriété raccourcie border. Utilisez borderColor, borderWidth, borderStyle, etc. à la place.',
      },
      {
        selector: "Property[key.name='background'], Property[key.value='background']",
        message: 'N’utilisez pas la propriété raccourcie background. Utilisez backgroundColor, etc. à la place.',
      },
    ],
  },
};

module.exports = config;
