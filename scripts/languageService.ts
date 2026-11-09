/**
 * - `serviceOf` · TypeScript's language service on a repository's own tsconfig
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// the repository's program as its tsconfig makes it, with any option a caller turns on besides
function serviceOf(
  root: string,
  options: ts.CompilerOptions = {},
): ts.LanguageService {
  const parsed = ts.getParsedCommandLineOfConfigFile(
    path.join(root, 'tsconfig.json'),
    options,
    { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => undefined },
  );
  if (parsed === undefined) throw new Error(`no tsconfig.json in ${root}`);
  return ts.createLanguageService({
    getCompilationSettings: () => parsed.options,
    getScriptFileNames: () => parsed.fileNames,
    getScriptVersion: () => '0',
    getScriptSnapshot: (file) =>
      fs.existsSync(file)
        ? ts.ScriptSnapshot.fromString(fs.readFileSync(file, 'utf8'))
        : undefined,
    getCurrentDirectory: () => root,
    getDefaultLibFileName: ts.getDefaultLibFilePath,
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
  });
}

export { serviceOf };
