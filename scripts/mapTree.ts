/**
 * - `treeOf`, `TreeLine` · a map's tree block read as its folders' lines and paths
 * - `closed` · its branches drawn again once lines are cut: a last sibling closes
 */

interface TreeLine {
  readonly path: string;
  readonly text: string;
}

function treeOf(text: string): readonly TreeLine[] {
  const block = text.split('```')[1] ?? '';
  const parents: string[] = [];
  return block
    .split('\n')
    .slice(2)
    .flatMap((line) => {
      const at = line.search(/[^│├└─\s]/);
      const name = /^(\S+\/)\s/.exec(`${line.slice(at)} `)?.[1];
      if (at < 0 || name === undefined) return [];
      const depth = Math.floor(at / 4);
      parents.length = depth;
      parents.push(name);
      return [{ path: parents.join(''), text: line.trimEnd() }];
    });
}

// a line's depth: its name's column, four characters a level
const depthOf = (text: string): number =>
  Math.floor(text.search(/[^│├└─\s]/) / 4);

// a cut leaves a folder last of its siblings: its branch closes, and the bar below it ends
function closed(lines: readonly TreeLine[]): readonly TreeLine[] {
  const depths = lines.map((line) => depthOf(line.text));
  const texts = lines.map((line) => [...line.text]);
  depths.forEach((depth, at) => {
    const next = depths.findIndex((one, index) => index > at && one <= depth);
    const end = next < 0 ? depths.length : next;
    const isLast = end === depths.length || (depths[end] ?? 0) < depth;
    const column = (depth - 1) * 4;
    texts[at]?.splice(column, 1, isLast ? '└' : '├');
    texts
      .slice(at + 1, end)
      .forEach((below) => below.splice(column, 1, isLast ? ' ' : '│'));
  });
  return lines.map((line, at) => ({
    ...line,
    text: texts[at]?.join('') ?? line.text,
  }));
}

export { closed, treeOf };
export type { TreeLine };
