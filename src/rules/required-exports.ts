import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/tupe12334/eslint-plugin-required-exports/blob/main/docs/${name}.md`
);

type MessageIds = 'missingExport';
type Options = [
  {
    variable?: boolean;
    function?: boolean;
    class?: boolean;
    interface?: boolean;
    type?: boolean;
    enum?: boolean;
    ignorePrivate?: boolean;
  }
];

export const requiredExportsRule = createRule<Options, MessageIds>({
  name: 'required-exports',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require exports for top-level declarations',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          variable: {
            type: 'boolean',
            default: true,
          },
          function: {
            type: 'boolean',
            default: true,
          },
          class: {
            type: 'boolean',
            default: true,
          },
          interface: {
            type: 'boolean',
            default: true,
          },
          type: {
            type: 'boolean',
            default: true,
          },
          enum: {
            type: 'boolean',
            default: true,
          },
          ignorePrivate: {
            type: 'boolean',
            default: true,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingExport: 'Declaration "{{name}}" must be exported',
    },
  },
  defaultOptions: [
    {
      variable: true,
      function: true,
      class: true,
      interface: true,
      type: true,
      enum: true,
      ignorePrivate: true,
    },
  ],
  create(context, [options]) {
    const sourceCode = context.sourceCode;
    const exportedNames = new Set<string>();

    function isPrivateName(name: string): boolean {
      return Boolean(options.ignorePrivate) && name.startsWith('_');
    }

    function collectExportedNames(node: TSESTree.Node): void {
      switch (node.type) {
        case 'ExportNamedDeclaration':
          if (node.declaration) {
            if (node.declaration.type === 'VariableDeclaration') {
              for (const declarator of node.declaration.declarations) {
                if (declarator.id.type === 'Identifier') {
                  exportedNames.add(declarator.id.name);
                }
              }
            } else if (
              'id' in node.declaration &&
              node.declaration.id?.type === 'Identifier'
            ) {
              exportedNames.add(node.declaration.id.name);
            }
          }
          if (node.specifiers) {
            for (const specifier of node.specifiers) {
              if (specifier.type === 'ExportSpecifier' && specifier.local.type === 'Identifier') {
                exportedNames.add(specifier.local.name);
              }
            }
          }
          break;
        case 'ExportDefaultDeclaration':
          if (
            node.declaration.type !== 'Identifier' &&
            'id' in node.declaration &&
            node.declaration.id?.type === 'Identifier'
          ) {
            exportedNames.add(node.declaration.id.name);
          }
          break;
      }
    }

    function checkDeclaration(
      node: TSESTree.Node,
      name: string,
      shouldCheck: boolean
    ): void {
      if (!shouldCheck || isPrivateName(name) || exportedNames.has(name)) {
        return;
      }

      context.report({
        node,
        messageId: 'missingExport',
        data: { name },
        fix(fixer) {
          const nodeText = sourceCode.getText(node);
          return fixer.replaceText(node, `export ${nodeText}`);
        },
      });
    }

    return {
      Program(node) {
        for (const child of node.body) {
          collectExportedNames(child);
        }
      },
      VariableDeclaration(node) {
        if (node.parent?.type !== 'Program') return;

        for (const declarator of node.declarations) {
          if (declarator.id.type === 'Identifier') {
            checkDeclaration(
              node,
              declarator.id.name,
              Boolean(options.variable)
            );
          }
        }
      },
      FunctionDeclaration(node) {
        if (node.parent?.type !== 'Program' || !node.id) return;

        checkDeclaration(
          node,
          node.id.name,
          Boolean(options.function)
        );
      },
      ClassDeclaration(node) {
        if (node.parent?.type !== 'Program' || !node.id) return;

        checkDeclaration(
          node,
          node.id.name,
          Boolean(options.class)
        );
      },
      TSInterfaceDeclaration(node) {
        if (node.parent?.type !== 'Program') return;

        checkDeclaration(
          node,
          node.id.name,
          Boolean(options.interface)
        );
      },
      TSTypeAliasDeclaration(node) {
        if (node.parent?.type !== 'Program') return;

        checkDeclaration(
          node,
          node.id.name,
          Boolean(options.type)
        );
      },
      TSEnumDeclaration(node) {
        if (node.parent?.type !== 'Program') return;

        checkDeclaration(
          node,
          node.id.name,
          Boolean(options.enum)
        );
      },
    };
  },
});