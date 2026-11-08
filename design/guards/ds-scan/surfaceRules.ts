/**
 * - `specWidth`, `ghostLine`, `hover`, `wash`, `legend`, `paper` · surface rules
 */
import type { Push, Rule, Scales } from './dsScanTypes.ts';

// every spec block has 346px of inner width and 12px ui-monospace advances 7.22px, so 47 characters fit and 48 does not · measured in the browser, not guessed
const specWidth: Rule = {
  id: 'spec-width',
  what: 'a spec-column line too long for the 380px track it sits in',
  because:
    'every card on the reference page pairs a drawing with a pre-wrap spec block in a fixed 380px grid track — 348px of inner width, 12px ui-monospace, 47 characters at 7.22px each. A longer line wraps flush left, and the 9-space value column stops lining up with the rows above it, which is the only thing making the block readable. The hover entry written on 18 Sep ran to 50 and broke four lines; review caught that card by eye, and measuring the page found 28 over-long lines in 12 cards. The track is shared with every other card, so the line yields, not the layout',
  run: (text, { push }) => {
    for (const match of text.matchAll(
      /white-space:pre-wrap"[^>]*>([\s\S]*?)<\/div>/g,
    )) {
      for (const line of match[1].split('\n')) {
        const plain = line.replace(/&[a-z]+;/g, 'x');
        if (plain.length > 47) {
          push({
            value: `${plain.trim().slice(0, 32)}… ${plain.length} chars`,
            want: '47 max · 346px at 7.22px',
            at: match.index,
          });
        }
      }
    }
  },
};

const ghostLine: Rule = {
  id: 'ghost-line',
  what: 'a visible border drawn with a token that is transparent in one mode',
  because:
    '--bd-primary is the border that pairs with --bg-primary, so it is rgba(0,0,0,0) in the dark block — right for a filled control, invisible everywhere else. Twenty-two places used it as the strong outline on a selected row, an active field, a picked tile and a timeline rule, and in dark all of them disappeared; the PM found the active Field first (18 Sep). A strong outline is --bd-strong, which has a value in both modes',
  exemptFiles: ['EmailPreview', 'AvatarStack', 'PhonePreview', 'Browser'],
  run: (text, { push }) => {
    for (const match of text.matchAll(/[^\n]*var\(--bd-primary\)[^\n]*/g)) {
      // paired with the fill · no line to lose
      if (/--bg-primary/.test(match[0])) continue;
      push({
        value: 'bd-primary as a line',
        want: '--bd-strong',
        at: match.index,
      });
    }
  },
};

const hover: Rule = {
  id: 'hover',
  what: 'a hover that moves something other than the fill',
  because:
    'an icon button darkened its 1px border while the outlined button beside it filled, so two controls one gap apart answered the same gesture differently — and at 1px a border change is something you look for rather than see (PM, 18 Sep). One hover: --bg-subtle arrives, --fg-primary on it, the border stays. A filled control darkens to --bg-primary-pressed instead',
  exemptFiles: ['EmailPreview', 'PhonePreview', 'Browser'],
  run: (text, { push }) => {
    for (const match of text.matchAll(/style-hover="([^"]*)"/g)) {
      const value = match[1];
      // a mark or a link, not a control
      if (/^opacity:|text-decoration:/.test(value)) continue;
      if (/border-color:/.test(value))
        push({
          value: value.slice(0, 50),
          want: 'background: var(--ui-hover-fill)',
          at: match.index,
        });
    }
  },
};

const wash: Rule = {
  id: 'wash',
  what: 'a raw ramp step used as a wash behind a chip ink',
  because:
    'a --st-*-fg / --ch-*-fg is half of a pair, and both halves flip. Written against a raw --y-50 or --g-50 the ink flips and the wash does not, so the label goes light-on-light: the CHANGED badge on 03a-2 and 03a-3 read #fbe091 on #fff6e1 while the identical badge on 03a read correctly, because two of the four had been moved and two had not (PM, 18 Sep). Six components named the raw step — one of them the fourth copy of the state legend',
  exemptFiles: ['EmailPreview', 'PhonePreview', 'Browser'],
  run: (text, { push }) => {
    for (const match of text.matchAll(
      /var\(--((?:y|g|b|r|o)-(?:25|50|100))\)/g,
    )) {
      const near = text.slice(
        Math.max(0, match.index - 200),
        match.index + 200,
      );
      // only where it backs a chip ink
      if (!/--(?:st|ch)-[a-z-]+-fg/.test(near)) continue;
      push({
        value: `${match[1]} behind a chip ink`,
        want: "the pair's own --st-*-bg",
        at: match.index,
      });
    }
  },
};

const legend: Rule = {
  id: 'legend',
  what: 'a component carrying its own table of state colours',
  because:
    'the seven document states have one pair each in tokens.css, and three components had written the table out again by hand — ApprovalBar, AppShell (dead code nobody read) and the chip demos. Each copy had drifted: IN REVIEW named the raw --y-50 wash, which has no dark pair, so the label vanished on a dark canvas (PM, 18 Sep). A copy of a legend is a legend that will disagree. The key is composed, the colour is read',
  run: (text, { push }) => {
    for (const match of text.matchAll(
      /['"](DRAFT|IN REVIEW|IN TRANSLATION|READY TO PUBLISH|PUBLISHED)['"]\s*:\s*\[/g,
    )) {
      push({
        value: `a colour table keyed on ${match[1]}`,
        want: 'compose --st-<key>-fg / -bg',
        at: match.index,
      });
    }
  },
};

const PAPER_SHADOW = '0 8px 6px rgba(0,0,0,0.10),0 4px 4px rgba(0,0,0,0.15)';

type PaperReading = {
  readonly scales: Scales;
  readonly at: number;
  readonly push: Push;
};

function paperFindings(
  surface: string,
  { scales, at, push }: PaperReading,
): void {
  const corner = surface.match(/border-radius:(\d+)px/);
  const border = surface.match(/border:1px solid ([^;"]+)/);
  const pad = surface.match(/padding:([^;"]+)/);
  const shadow = surface.match(/box-shadow:([^;"]+)/);
  if (corner && Number(corner[1]) !== scales.radii.sm)
    push({ value: `radius ${corner[1]}`, want: `${scales.radii.sm}px`, at });
  if (
    border &&
    !['var(--bd-container)', 'var(--n-75)'].includes(border[1].trim())
  ) {
    push({
      value: `border ${border[1].trim()}`,
      want: 'var(--bd-container)',
      at,
    });
  }
  if (
    pad &&
    ![scales.paperPadMenu, scales.paperPadPopover].includes(pad[1].trim())
  ) {
    push({
      value: `padding ${pad[1].trim()}`,
      want: `${scales.paperPadMenu} or ${scales.paperPadPopover}`,
      at,
    });
  }
  if (shadow && shadow[1].trim().replace(/\s+/g, ' ') !== PAPER_SHADOW) {
    push({
      value: `shadow ${shadow[1].trim().slice(0, 34)}`,
      want: 'shadow-card',
      at,
    });
  }
}

const paper: Rule = {
  id: 'paper',
  what: 'a floating surface that is not the one paper',
  because:
    '19 surfaces over 15 files drifted on border (n-75 or n-100), radius (8 / 12 / 16), padding (5 to 16) and five shadow variants',
  run: (text, { scales, push }) => {
    for (const match of text.matchAll(
      /position:absolute;[^"]*?box-shadow:[^";]*/g,
    )) {
      // only lifted papers
      if (!/box-shadow:0 8px 6px|box-shadow:0 10px 26px/.test(match[0]))
        continue;
      paperFindings(match[0], { scales, at: match.index, push });
    }
  },
};

export { ghostLine, hover, legend, paper, specWidth, wash };
