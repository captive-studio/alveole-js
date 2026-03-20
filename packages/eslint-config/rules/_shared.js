const flashListPlugin = {
  rules: {
    'prefer-flash-list': {
      meta: {
        type: 'suggestion',
        fixable: 'code',
        docs: {
          description: 'Interdit FlatList (react-native) et impose FlashList (@shopify/flash-list).',
        },
        messages: {
          preferFlashList:
            'N’utilisez pas FlatList depuis react-native. Utilisez FlashList depuis @shopify/flash-list.',
        },
        schema: [],
      },
      create(context) {
        const sourceCode = context.sourceCode;

        return {
          ImportDeclaration(node) {
            if (node.source.value !== 'react-native') {
              return;
            }

            const flatListSpecifier = node.specifiers.find(
              specifier =>
                specifier.type === 'ImportSpecifier' &&
                specifier.imported &&
                specifier.imported.type === 'Identifier' &&
                specifier.imported.name === 'FlatList',
            );

            if (!flatListSpecifier) {
              return;
            }

            context.report({
              node: flatListSpecifier,
              messageId: 'preferFlashList',
              fix(fixer) {
                const program = node.parent;
                if (!program || program.type !== 'Program') {
                  return null;
                }

                const importDeclarations = program.body.filter(statement => statement.type === 'ImportDeclaration');
                const flashListImport = importDeclarations.find(
                  statement => statement.source.value === '@shopify/flash-list',
                );
                const hasFlashListAlready =
                  !!flashListImport &&
                  flashListImport.specifiers.some(
                    specifier =>
                      specifier.type === 'ImportSpecifier' &&
                      specifier.imported &&
                      specifier.imported.type === 'Identifier' &&
                      specifier.imported.name === 'FlashList',
                  );

                const fixes = [];

                if (node.specifiers.length === 1) {
                  if (hasFlashListAlready) {
                    fixes.push(fixer.remove(node));
                  } else {
                    fixes.push(fixer.replaceText(node, "import { FlashList } from '@shopify/flash-list';"));
                  }
                  return fixes;
                }

                let [start, end] = flatListSpecifier.range;
                const tokenBefore = sourceCode.getTokenBefore(flatListSpecifier);
                const tokenAfter = sourceCode.getTokenAfter(flatListSpecifier);

                if (tokenAfter && tokenAfter.value === ',') {
                  end = tokenAfter.range[1];
                } else if (tokenBefore && tokenBefore.value === ',') {
                  start = tokenBefore.range[0];
                }

                fixes.push(fixer.removeRange([start, end]));

                if (!hasFlashListAlready) {
                  if (flashListImport) {
                    const hasNamedSpecifiers = flashListImport.specifiers.some(
                      specifier => specifier.type === 'ImportSpecifier',
                    );

                    if (hasNamedSpecifiers) {
                      const namedSpecifiers = flashListImport.specifiers.filter(
                        specifier => specifier.type === 'ImportSpecifier',
                      );
                      const lastNamedSpecifier = namedSpecifiers[namedSpecifiers.length - 1];
                      fixes.push(fixer.insertTextAfter(lastNamedSpecifier, ', FlashList'));
                    } else if (flashListImport.specifiers.length > 0) {
                      const lastSpecifier = flashListImport.specifiers[flashListImport.specifiers.length - 1];
                      fixes.push(fixer.insertTextAfter(lastSpecifier, ', { FlashList }'));
                    } else {
                      fixes.push(
                        fixer.replaceText(flashListImport, "import { FlashList } from '@shopify/flash-list';"),
                      );
                    }
                  } else {
                    fixes.push(fixer.insertTextAfter(node, "\nimport { FlashList } from '@shopify/flash-list';"));
                  }
                }

                return fixes;
              },
            });
          },
        };
      },
    },
  },
};

/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.{ts,tsx}'],
  plugins: {
    flashList: flashListPlugin,
  },
  rules: {
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
    'flashList/prefer-flash-list': 'error',
    'no-restricted-properties': [
      'error',
      {
        object: 'window',
        property: 'open',
        message: 'N’utilisez pas window.open. Utilisez Linking.openURL (expo) à la place.',
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
};

module.exports = config;
