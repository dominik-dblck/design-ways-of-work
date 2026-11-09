/**
 * - `guideVoice` · how Deblock writes: its voice, casing, numbers, tone
 */
import type { GuideSection } from '../designTypes.ts';

const guideVoice: readonly GuideSection[] = [
  {
    heading: 'CONTENT FUNDAMENTALS',
    level: 2,
    lines: [
      'Copy is **direct, crisp, and confident**. Sentences are short. Jargon is replaced with plain words wherever it can be — we talk about "your money" not "fiat", "send" not "execute a transfer". When crypto terms are load-bearing ("self-custodial", "seed phrase", "IBAN") they are used matter-of-factly and defined on first use.',
      '',
      '- **Voice** — first-person plural when speaking for the brand ("We\'re building…"), second-person when addressing the user ("You own your keys. Nobody — not even us — can freeze your money."). Rarely "I".',
      '- **Casing** — **Sentence case** for headings, buttons, and inputs. No Title Case except proper nouns and product names (Deblock, Vaults, Plans). Labels stay short (1–3 words).',
      '- **Punctuation** — No exclamation marks outside celebratory micro-copy ("You\'re in! 🎉" → NO, we say "You\'re in."). Periods are optional on buttons and one-line headings. Oxford comma in lists.',
      '- **Numbers** — Thousands with non-breaking thin space or comma to taste; amounts use tabular figures. Crypto precision is shown only where it matters (e.g. 4 decimals in-list, full precision on detail).',
      '- **Emoji** — **Avoid.** The product UI does not use emoji. Brand voice is warm without them. Exception: a single, intentional emoji in a marketing moment is acceptable; never in-app.',
      '- **The product name** — Always "Deblock", capital D, one word. The noun "deblocker" or verbs are not brand.',
      '',
      '**Examples that sound right:**',
      '',
      '> Own your money.',
      '> A bank account with a crypto wallet built in.',
      '> 4% on your euros. No lock-up, no catch.',
      '> Send euros to anyone with an IBAN. Instantly.',
      '> Your keys. Your coins. Your call.',
      '',
      '**Examples that sound wrong:**',
      '',
      '> 🚀 Unlock the future of finance with Deblock!',
      '> Leverage our best-in-class crypto rails to supercharge your portfolio.',
      '> Welcome aboard, Rockstar! 💎🙌',
      '',
      '**Tone spectrum** (high to low, of where we live):',
      '- *Serious and reassuring* for regulation, security, money movement.',
      '- *Clear and matter-of-fact* for features, settings, confirmations.',
      "- *Dry, quietly witty* for empty states and 404s. Never a joke at the user's expense.",
    ],
  },
];

export { guideVoice };
