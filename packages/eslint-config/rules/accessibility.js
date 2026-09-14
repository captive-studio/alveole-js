const TOUCHABLE_ELEMENTS = new Set([
  'Pressable',
  'TouchableOpacity',
  'TouchableHighlight',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
]);

const accessibilityPlugin = {
  rules: {
    'touchable-needs-role': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Impose un accessibilityRole sur les zones tactiles, sans quoi les lecteurs d’écran les annoncent comme du texte inerte.',
        },
        messages: {
          missingRole:
            '<{{name}}> n’expose aucun accessibilityRole : les lecteurs d’écran ne l’annonceront pas comme actionnable. Ajoutez accessibilityRole (« button », « link », « checkbox »…), ou accessible={false} si la zone n’est pas actionnable (fermeture du clavier, voile de modale).',
        },
        schema: [],
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.type !== 'JSXIdentifier' || !TOUCHABLE_ELEMENTS.has(node.name.name)) {
              return;
            }

            // Un spread peut porter accessibilityRole : le composant relaie alors les props
            // que son appelant lui passe, et la règle n’a pas de quoi trancher.
            const hasSpread = node.attributes.some(attribute => attribute.type === 'JSXSpreadAttribute');
            if (hasSpread) {
              return;
            }

            const findAttribute = name =>
              node.attributes.find(
                attribute =>
                  attribute.type === 'JSXAttribute' &&
                  attribute.name.type === 'JSXIdentifier' &&
                  attribute.name.name === name,
              );

            if (findAttribute('accessibilityRole')) {
              return;
            }

            // Toutes les zones tactiles ne sont pas actionnables : fermeture du clavier,
            // voile de modale, blocage de propagation. Les sortir de l'arbre
            // d'accessibilité est la bonne réponse, pas leur inventer un rôle.
            const accessible = findAttribute('accessible');
            const isExcludedFromTree =
              accessible &&
              accessible.value &&
              accessible.value.type === 'JSXExpressionContainer' &&
              accessible.value.expression.type === 'Literal' &&
              accessible.value.expression.value === false;
            if (isExcludedFromTree) {
              return;
            }

            context.report({ node, messageId: 'missingRole', data: { name: node.name.name } });
          },
        };
      },
    },
  },
};

/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.{ts,tsx}'],
  ignores: ['**/*.test.{ts,tsx}', '**/*.stories.tsx'],
  plugins: {
    a11y: accessibilityPlugin,
  },
  rules: {
    'a11y/touchable-needs-role': 'error',
  },
};

module.exports = config;
