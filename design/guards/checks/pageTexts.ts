/**
 * - `pageTextLines` · over every module and page: an image hole, the app's mark,
 * - a rule copied out of plans.js, a page loading a module without what it needs
 */
import { tokens } from '../../app/styles/tokens.ts';
import { ownText } from './bundleText.ts';
import { lineOf } from './checkWorld.ts';
import type { Mirror } from './checkWorld.ts';
import type { GuardRun } from './runChecks.ts';
import type * as SOURCE_CHECK from '../source-check.ts';
import * as MESSAGES from '../../sheet/words/messages.ts';
import * as PLANS from '../../docs/process/plans.ts';

type Texts = Readonly<Record<string, string>>;
type Guard = typeof SOURCE_CHECK;

// a page's template: what comes before its logic's script
const templateOf = (text: string): string => {
  const script = text.indexOf('data-dc-script');
  return script > 0 ? text.slice(0, script) : text;
};

// the app's mark in both inks, its stem read off the token a page paints it with
const STEM = /assets\/([\w-]+)-(?:black|white)\.png/.exec(
  String(tokens.light.appMark),
)?.[1];
const MARK = STEM ? new RegExp(`${STEM}-(black|white)\\.png`) : null;

const pagesIn = (texts: Texts): readonly string[] =>
  Object.keys(texts).filter((file) => /\.dc\.html$/.test(file));

// an <img src> hole is fetched as the literal hole before it fills: an icon is a mask
function holesLine(texts: Texts): string {
  const holes = pagesIn(texts).flatMap((file) => {
    const count = (
      templateOf(texts[file] ?? '').match(/<img[^>]*\ssrc="[^"]*\{\{/g) ?? []
    ).length;
    return count ? [`${file} ${count}`] : [];
  });
  return lineOf('src holes', {
    ok: !holes.length,
    text: holes.length
      ? holes.join(' · ')
      : '0 · icons are masks, avatars backgrounds',
  });
}

// the app's name lives in messages.js, its mark in tokens.css; no template types either
function markLine(texts: Texts): string {
  const name = MESSAGES.screen.appName || '';
  const typed = new RegExp(`>\\s*${name}\\s*<|(alt|aria-label)="${name}"`, 'i');
  const hits = pagesIn(texts).filter((file) => {
    const template = templateOf(texts[file] ?? '');
    return (name && typed.test(template)) || (MARK?.test(template) ?? false);
  });
  let text = 'messages.js holds no appName';
  if (name)
    text = hits.length
      ? hits.join(' · ')
      : `${name} read from messages.js, the mark from tokens.css`;
  return lineOf('app mark', { ok: !!name && !hits.length, text });
}

// a rule's text lives in plans.js alone: CLAUDE.md and design-side.md name the rules
function rulesLine(texts: Texts, mirror: Mirror): string {
  const rules = PLANS.rules;
  const sentences = rules
    .flatMap((rule) => rule.says.split(/(?<=[.:])\s+/))
    .map((one) => one.trim())
    .filter((one) => one.length > 60);
  const copied = ['CLAUDE.md', 'design-side.md'].flatMap((file) => {
    const text = mirror.read(file);
    return sentences
      .filter((one) => text.includes(one.slice(0, 60)))
      .map((one) => `${file} · ${one.slice(0, 50)}`);
  });
  let said = 'plans.js · Plans.rules not read';
  if (rules.length)
    said = copied.length
      ? copied.slice(0, 3).join(' | ')
      : `${rules.length} rules in plans.js, none copied`;
  return lineOf('rules copied', {
    ok: rules.length > 0 && !copied.length,
    text: said,
  });
}

function scriptsLine(texts: Texts, run: GuardRun): string {
  const guard: Guard = run.guard;
  const missing = guard.pageScriptsCheck(texts);
  const needs = guard.moduleNeeds(texts);
  return lineOf('page scripts', {
    ok: !missing.length,
    text: missing.length
      ? `${missing.length} · ${missing
          .slice(0, 8)
          .map((one) => `${one.file} · ${one.text}`)
          .join(' | ')}`
      : `${Object.keys(needs).length} modules with a need, every page loads it`,
  });
}

function pageTextLines(mirror: Mirror, run: GuardRun): readonly string[] {
  const texts: Texts = Object.fromEntries(
    mirror
      .list('')
      .filter((file) => /\.(js|dc\.html)$/.test(file))
      .map((file) => [file, ownText(file, mirror.read(file))]),
  );
  return [
    holesLine(texts),
    markLine(texts),
    rulesLine(texts, mirror),
    scriptsLine(texts, run),
  ];
}

export { pageTextLines };
