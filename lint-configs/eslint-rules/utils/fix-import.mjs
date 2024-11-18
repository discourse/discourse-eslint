/**
 * Fix an import declaration
 *
 * @param {ASTNode} importDeclarationNode - The AST node representing the import declaration.
 * @param {Object} options - Options for modifying the import statement.
 * @param {boolean} options.shouldHaveDefaultImport - Whether the import should include a default import.
 * @param {string[]} options.namedImportsToAdd - Named imports to add to the import statement.
 * @param {string[]} options.namedImportsToRemove - Named imports to remove from the import statement.
 */
export function fixImport(
  fixer,
  importDeclarationNode,
  { shouldHaveDefaultImport, namedImportsToAdd = [], namedImportsToRemove = [] }
) {
  const existingSpecifiers = importDeclarationNode.specifiers;
  const existingDefaultImport = existingSpecifiers.find(
    (specifier) => specifier.type === "ImportDefaultSpecifier"
  );

  // Map existing named imports to their local names
  const existingNamedImports = existingSpecifiers
    .filter((specifier) => specifier.type === "ImportSpecifier")
    .reduce((acc, specifier) => {
      acc[specifier.imported.name] = specifier.local.name;
      return acc;
    }, {});

  // Determine final default import
  let finalDefaultImport;
  if (shouldHaveDefaultImport === undefined) {
    finalDefaultImport = existingDefaultImport
      ? existingDefaultImport.local.name
      : null;
  } else if (shouldHaveDefaultImport) {
    finalDefaultImport = existingDefaultImport
      ? existingDefaultImport.local.name
      : shouldHaveDefaultImport;
  } else {
    finalDefaultImport = null;
  }

  // Determine final named imports, preserving aliases
  const finalNamedImports = Array.from(
    new Set([
      ...Object.entries(existingNamedImports)
        .filter(([imported]) => !namedImportsToRemove.includes(imported))
        .map(([imported, local]) =>
          imported === local ? imported : `${imported} as ${local}`
        ),
      ...namedImportsToAdd,
    ])
  );

  // Construct the new import statement
  let newImportStatement = "import ";
  if (finalDefaultImport) {
    newImportStatement += `${finalDefaultImport}`;
    if (finalNamedImports.length > 0) {
      newImportStatement += ", ";
    }
  }
  if (finalNamedImports.length > 0) {
    newImportStatement += `{ ${finalNamedImports.join(", ")} }`;
  }
  newImportStatement += ` from '${importDeclarationNode.source.value}';`;

  // Replace the entire import declaration
  return fixer.replaceText(importDeclarationNode, newImportStatement);
}
