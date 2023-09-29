/* eslint-disable */
const path = require('path');

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
  },
  create: function (context) {
    return {
      Program(node) {
        const fileName = context.getFilename();
        const basename = path.basename(fileName);

        if (fileName.endsWith('.d.ts') || fileName.endsWith('.migration.ts')) return;

        const format =
          /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:\.(?:module|service|controller|interceptor|decorator|type|error|exception|exception\.filter|filter|guard|middleware|dto|dto\.validation\.rules|validator|validation|dto\.validator|dto\.mapper|dto\.pipe|pipe|config|enum|reflector|repository|dao|manager|entity|aggregate|value-object|primitive|id|event|migration|mapper|scheduler|publisher|command|query|specification|policy))?(?:\.(?:build|builder|handler))?(?:\.(?:factory|abstract-factory|generator|strategy|resolver))?(?:\.(?:interface|abstract|impl|provider|(?:(?:unit|integration|e2e)\.)?spec))?\.ts$/;

        if (!format.test(basename)) {
          return context.report({
            node,
            message: `The file name should follow the format ${format}`,
          });
        }
      },
    };
  },
};
