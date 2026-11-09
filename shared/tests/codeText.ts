/**
 * - `codeOf` · a file's code, each comment blanked and its lines kept in place
 */
import ts from 'typescript';

const COMMENTS = new Set([
  ts.SyntaxKind.SingleLineCommentTrivia,
  ts.SyntaxKind.MultiLineCommentTrivia,
]);

// a scan reads code, never prose: one red on the comment explaining its rule teaches people to drop the comment
const codeOf = (text: string): string => {
  const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    false,
    ts.LanguageVariant.Standard,
    text,
  );
  let code = '';
  for (
    let kind = scanner.scan();
    kind !== ts.SyntaxKind.EndOfFileToken;
    kind = scanner.scan()
  ) {
    const written = scanner.getTokenText();
    code += COMMENTS.has(kind) ? written.replace(/[^\n]/g, ' ') : written;
  }
  return code;
};

export { codeOf };
