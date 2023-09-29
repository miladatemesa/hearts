function kebabToPascal(kebabCase) {
  return kebabCase.replace(/(?:^|[-.])([a-z0-9])/g, function (_, char) {
    return char.toUpperCase();
  });
}

function pascalToKebab(pascalCase) {
  return pascalCase.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();
}

module.exports = { kebabToPascal, pascalToKebab };
