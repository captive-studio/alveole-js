import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const rootDir = process.cwd();

const STORIES_EXTENSIONS = ['.stories.tsx', '.stories.ts'];

async function findStoryFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.expo' || entry.name === 'dist' || entry.name === 'build') {
        continue;
      }

      files.push(...(await findStoryFiles(fullPath)));
      continue;
    }

    if (
      entry.isFile() &&
      STORIES_EXTENSIONS.some(extension => entry.name.endsWith(extension)) &&
      !entry.name.endsWith('.sources.ts')
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function isExportedConstStatement(statement) {
  if (!ts.isVariableStatement(statement)) return false;

  const hasExportModifier = statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);

  if (!hasExportModifier) return false;

  const isConst = (statement.declarationList.flags & ts.NodeFlags.Const) !== 0;

  return isConst;
}

function extractStorySources(filePath, code) {
  const sourceFile = ts.createSourceFile(
    filePath,
    code,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  const stories = [];

  for (const statement of sourceFile.statements) {
    if (!isExportedConstStatement(statement)) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name)) continue;

      const name = declaration.name.text;

      // On ignore explicitement les exports spéciaux si besoin.
      if (name === 'default') continue;

      // Cas classique : une seule story par déclaration.
      // Exemple : export const Variants = () => (...)
      let source;

      if (statement.declarationList.declarations.length === 1) {
        source = statement.getFullText(sourceFile).trim();
      } else {
        // Cas rare : export const A = ..., B = ...
        // On reconstruit une déclaration par export.
        source = `export const ${declaration.getText(sourceFile)};`;
      }

      stories.push({ name, source });
    }
  }

  return stories;
}

function buildOutput(stories, inputFilePath) {
  const relativeInputPath = path.relative(rootDir, inputFilePath).replaceAll(path.sep, '/');

  const namedExports = stories
    .map(({ name, source }) => {
      return `export const ${name} = () => ${JSON.stringify(source)};`;
    })
    .join('\n\n');

  const objectEntries = stories.map(({ name }) => `  ${name},`).join('\n');

  return [
    '// This file is generated. Do not edit manually.',
    `// Source: ${relativeInputPath}`,
    '',
    namedExports,
    '',
    'export const storySources = {',
    objectEntries,
    '} as const;',
    '',
    'export type StorySourceName = keyof typeof storySources;',
    '',
  ].join('\n');
}

async function ensureSourcesExport(inputFilePath, outputFilePath) {
  const code = await fs.readFile(inputFilePath, 'utf8');

  const relativeImportPath = `./${path.basename(outputFilePath).replace(/\.ts$/, '')}`;

  const exportLine = `export * as Sources from '${relativeImportPath}';`;

  if (code.includes(exportLine)) return;

  const nextCode = code.trimEnd() + '\n\n' + exportLine + '\n';

  await fs.writeFile(inputFilePath, nextCode, 'utf8');
}

async function main() {
  const files = await findStoryFiles(rootDir);

  for (const filePath of files) {
    const code = await fs.readFile(filePath, 'utf8');
    const stories = extractStorySources(filePath, code);

    if (stories.length === 0) continue;

    const outputPath = filePath.replace(/\.stories\.(tsx|ts)$/, '.stories.sources.ts');
    const output = buildOutput(stories, filePath);

    await fs.writeFile(outputPath, output, 'utf8');
    await ensureSourcesExport(filePath, outputPath);

    console.log(`Generated ${path.relative(rootDir, outputPath)} with ${stories.length} source(s)`);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
