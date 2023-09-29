/* eslint-disable */
const path = require('path');
const { kebabToPascal, pascalToKebab } = require('./kebab-pascal');

function checkInterfaceName(context, node, isInterface, isAbstract) {
  const isExported =
    node.parent.type === 'ExportDefaultDeclaration' ||
    node.parent.type === 'ExportNamedDeclaration';
  const fileName = path.basename(context.getFilename());
  const endsWithInterface = /.*\.interface\.ts$/.test(fileName);
  if (isExported) {
    const name = node.id.name;
    if (endsWithInterface) {
      if (!isInterface && !isAbstract) {
        return context.report({
          node,
          message: `'${name}' in '${fileName}' should be an interface or abstract class.`,
        });
      }
      const expectedName = `I${kebabToPascal(fileName.slice(0, -13))}`;
      if (expectedName !== name) {
        return context.report({
          node,
          message: `'${name}' in '${fileName}' should have the name '${expectedName}'.`,
          fix(fixer) {
            return fixer.replaceText(node.id, expectedName);
          },
        });
      }
    } else if (isInterface) {
      return context.report({
        node,
        message: `'${name}' in '${fileName}' should have the file name ${pascalToKebab(
          name,
        )}.interface.ts.`,
      });
    }
  }
}

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: true,
  },
  create: function (context) {
    return {
      ClassDeclaration: (node) =>
        checkInterfaceName(context, node, false, !!node.abstract),
      TSInterfaceDeclaration: (node) =>
        checkInterfaceName(context, node, true, false),
    };
  },
};
