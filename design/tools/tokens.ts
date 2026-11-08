/**
 * - `tokensText` · app/styles/tokens.ts as the two stylesheets write it (D22)
 * - the design system first, then the product layer: a key in both is the product's
 */
import fs from 'node:fs';
import path from 'node:path';
import { designSystem } from '../sheet/project.ts';
import { ROOT, sourceOf } from './layout.ts';
import { declarationsOf, refuseUnlessCss } from './tokens/cssReads.ts';
import { tokensModule } from './tokens/tokenPrint.ts';

const PRODUCT = 'app/styles/tokens.css';
const SYSTEM = sourceOf(designSystem) ?? designSystem;

function tokensText(): string {
  const [product, system] = [PRODUCT, SYSTEM].map((file) => {
    const css = fs.readFileSync(path.join(ROOT, file), 'utf8');
    refuseUnlessCss(css, path.basename(file));
    return css;
  });
  const both = (selector: string): Map<string, string> =>
    new Map([
      ...declarationsOf(String(system), selector),
      ...declarationsOf(String(product), selector),
    ]);
  return tokensModule({ light: both(':root'), dark: both('.dbk-dark') });
}

export { tokensText };
