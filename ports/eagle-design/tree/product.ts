// product.ts · what this product plugs into the way of working: its entry points alone read it
import { contentTypePart } from './guards/checks/contentTypePart.ts';
import { flowPart, rulesPart } from './guards/checks/rulesParts.ts';
import { sentencesPart } from './guards/checks/sentencesPart.ts';
import type { Product } from './tools/productTypes.ts';

const product: Product = {
  checkParts: {
    e: flowPart,
    f: rulesPart,
    b: sentencesPart,
    c: contentTypePart,
  },
  checkOrder: ['a', 'e', 'f', 'g', 'b', 'c', 'w'],
};

export { product };
