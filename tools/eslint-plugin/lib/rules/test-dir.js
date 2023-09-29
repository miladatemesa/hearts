/* eslint-disable */
const path = require("path");

const testDirs = ["unit", "integration", "e2e"];

module.exports = {
  meta: {
    type: "suggestion", fixable: "code"
  }, create: function(context) {
    return {
      Program(node) {
        const fileName = context.getFilename();
        const basename = path.basename(fileName);

        const specReqExp = /.*\.spec\.ts$/;
        if (specReqExp.test(basename)) {
          const directories = path.dirname(fileName).split(path.sep);
          const specType = directories.find(v => testDirs.includes(v));
          if (!specType || !directories.some(v => v === "test")) {
            return context.report({
              node, message: `spec files should be located within the "test/{unit,integration,e2e}/**/*.spec.ts" directory.`
            });
          }
        }
      }
    };
  }
};
