/**
 * - `typography` · the families, the type scale and the dense steps of a tool
 */
import type { TokenGroup } from '../designTypes.ts';

const typography: readonly TokenGroup[] = [
  {
    title: 'TYPE',
    intro: '',
    entries: [{ name: '--font-sans', light: '"Basis Grotesque Pro", -apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", Arial, sans-serif' }, { name: '--font-mono', light: 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace' }, { note: 'Tracking' }, { name: '--tr-tight', light: '-0.02em' }, { name: '--tr-normal', light: '-0.005em' }, { name: '--tr-loose', light: '0.04em' }, { note: 'Size scale (Figma type ramp, ordered largest→smallest)' }, { name: '--t-display-xl', light: '88px', why: 'hero / big amounts (DIN Alternate fallback → Basis Bold)' }, { name: '--t-display-lg', light: '64px', why: 'section title' }, { name: '--t-display-md', light: '48px' }, { name: '--t-h1', light: '32px' }, { name: '--t-h2', light: '28px' }, { name: '--t-h3', light: '24px' }, { name: '--t-h4', light: '20px' }, { name: '--t-h5', light: '18px' }, { name: '--t-body-lg', light: '18px' }, { name: '--t-body', light: '16px' }, { name: '--t-body-sm', light: '14px' }, { name: '--t-caption', light: '12px' }, { name: '--t-micro', light: '10px' }, { name: '--lh-tight', light: '1.05' }, { name: '--lh-snug', light: '1.15' }, { name: '--lh-normal', light: '1.35' }, { name: '--lh-loose', light: '1.5' }],
  },
  {
    title: 'DENSE TYPE · the tool runs one step below the mobile app',
    intro: 'No new sizes: the tool reads the DS scale from body-sm down.\nMUI slot        size / weight / line-height / tracking         DS var',
    entries: [
      { name: '--ui-title', light: '20px', why: 'h4        · 500 · 1.15 · -0.02em      --t-h4' },
      { name: '--ui-heading', light: '16px', why: 'h5        · 500 · 1.15 · -0.02em      --t-body' },
      { name: '--ui-subheading', light: '14px', why: 'h6        · 500 · 1.35 · -0.01em      --t-body-sm' },
      { name: '--ui-body', light: '14px', why: 'body1     · 400 · 1.35                --t-body-sm' },
      { name: '--ui-dense', light: '12px', why: 'body2     · 400 · 1.35                --t-caption · list rows, menus, breadcrumbs' },
      { name: '--ui-label', light: '12px', why: 'overline  · 600 · 1.2 · body face     --t-caption · a short name over a thing, as written' },
      { name: '--ui-caption', light: '10px', why: 'caption   · 400 · 1.2                 --t-micro   · the role under a name' },
    ],
  },
];

export { typography };
