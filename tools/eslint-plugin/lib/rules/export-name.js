/* eslint-disable */
const path = require('path');
const { kebabToPascal } = require('./kebab-pascal');

function getExpectedName(fileName) {
  return kebabToPascal(
    fileName.match(
      /^(.*?)(?=(?:\.(?:decorator|type|entity|aggregate|value-object|primitive|migration|enum|abstract))?\.ts$)/,
    )[0],
  );
}

function checkExportName(context, node) {
  const fileName = path.basename(context.getFilename());
  if (/.*\.interface\.ts$/.test(fileName) || /.*\.migration\.ts$/.test(fileName)) return;
  let id,
    isConst = false;
  if (node.id) {
    id = node.id;
  } else if (node.declaration && node.declaration.id) {
    id = node.declaration.id;
  } else if (
    node.declaration &&
    node.declaration.declarations &&
    node.declaration.declarations[0] &&
    node.declaration.declarations[0].id
  ) {
    id = node.declaration.declarations[0].id;
    isConst = true;
  }
  if (id && id.name && fileName !== 'index.ts') {
    const name = id.name;
    if (isConst) {
      if (/.*\.(?:provider|module)\.ts$/.test(fileName)) {
        isConst = false;
      }
    }
    const expectedName = getExpectedName(fileName);
    const valid =
      expectedName === name ||
      `${expectedName}Factory` === name ||
      (isConst &&
        (/^[a-z]+(?:[A-Z][a-z]*)*$/.test(name) || /^[A-Z0-9_]+$/.test(name)));
    if (!valid) {
      return context.report({
        node,
        message: `'${name}' in '${fileName}' should have the name '${
          isConst ? `${name.toUpperCase()}' OR '${expectedName}` : expectedName
        }'.`,
        fix(fixer) {
          return fixer.replaceText(id, expectedName);
        },
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
      ExportNamedDeclaration: (node) => checkExportName(context, node),
      ExportDefaultDeclaration: (node) => checkExportName(context, node),
    };
  },
};
