/**
 * - `guide` · the Deblock guide: who the brand is, how it writes and looks
 * - a value it names is a token's, `{--x}`, written out with its value
 */
import type { Guide } from './designTypes.ts';
import { guideFoundations } from './guide/guideFoundations.ts';
import { guideVoice } from './guide/guideVoice.ts';

const guide: Guide = {
  title: 'Deblock Design System v.0',
  intro: [
    'Deblock is a regulated French neobank with a non-custodial crypto wallet in one app. French IBAN, VISA debit cards, SEPA transfers, FX, fee-free crypto, 4% euro yield — and the user holds the keys. CASP-licensed with the AMF; electronic money institution under the ACPR. "Own Your Money."',
    '',
    'Audience: crypto-native users who want real banking, plus everyday users who want control. Based in France, live across Europe, hundreds of thousands of users.',
    '',
    "**Brand personality** — Confident, modern, trust-forward. Direct and jargon-free. Premium but accessible, closer to a great consumer app than a corporate bank. Takes money seriously, doesn't take itself too seriously.",
    '',
    '**Used for** — marketing one-pagers, landing pages, pitch/investor decks, internal presentations, product concept screens, onboarding flows, exploratory prototypes.',
  ],
  sections: [...guideVoice, ...guideFoundations],
};

export { guide };
