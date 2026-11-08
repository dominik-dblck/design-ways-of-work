/**
 * - `tokensText` · tokens.ts from design-system/ and product-tokens.ts (D22)
 * - a name the system and the product both declare is refused, never overridden
 */
import { productTokens } from '../app/styles/product-tokens.ts';
import { designSystem, isToken } from '../design-system/index.ts';
import { tokensModule } from './tokens/tokenPrint.ts';

function tokensText(): string {
  const tokens = [...designSystem, ...productTokens].flatMap((group) =>
    group.entries.filter(isToken),
  );
  const names = tokens.map((token) => token.name);
  const twice = names.filter((name, at) => names.indexOf(name) !== at);
  if (twice.length)
    throw new Error(`a token declared twice · ${twice.join(' · ')}`);
  return tokensModule({
    light: new Map(tokens.map((token) => [token.name, token.light])),
    dark: new Map(
      tokens.flatMap((token) =>
        token.dark === undefined ? [] : [[token.name, token.dark] as const],
      ),
    ),
  });
}

export { tokensText };
