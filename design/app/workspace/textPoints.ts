/**
 * - `pointsOf` · a line cut at its middle dots, brackets and bold kept whole
 */

// points are joined by a middle dot, never one inside brackets or a bold span
const POINT = ' · ';
const OPENS = '([{';
const CLOSES = ')]}';
const BOLD = '**';

function pointsOf(text: string): readonly string[] {
  const points: string[] = [];
  let depth = 0;
  let isBold = false;
  let from = 0;
  for (let at = 0; at < text.length; at += 1) {
    const char = text.charAt(at);
    if (OPENS.includes(char)) depth += 1;
    if (CLOSES.includes(char)) depth = Math.max(0, depth - 1);
    if (text.startsWith(BOLD, at)) {
      isBold = !isBold;
      at += 1;
    } else if (depth === 0 && !isBold && text.startsWith(POINT, at)) {
      points.push(text.slice(from, at));
      from = at + POINT.length;
    }
  }
  points.push(text.slice(from));
  return points.map((one) => one.trim()).filter(Boolean);
}

export { pointsOf };
