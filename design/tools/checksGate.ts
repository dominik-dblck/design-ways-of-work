/**
 * - `node tools/checksGate.ts` · the checks on a fresh build, nothing written back
 * - exits 1 on a FAIL line no known fail starts, or on a part that threw
 */
import { execFileSync } from 'node:child_process';

// a fail the PM holds open, matched by its start
const KNOWN_FAILS: readonly string[] = [];

function checksOutput(): string {
  execFileSync('node', ['tools/build.ts'], { stdio: 'ignore' });
  try {
    return execFileSync('node', ['tools/checks.ts'], { encoding: 'utf8' });
  } catch (error) {
    const out = Reflect.get(Object(error), 'stdout');
    return typeof out === 'string' ? out : String(error);
  }
}

function newFails(output: string): readonly string[] {
  return output
    .split('\n')
    .filter((line) => line.startsWith('FAIL'))
    .filter((line) => !KNOWN_FAILS.some((known) => line.startsWith(known)));
}

const fails = newFails(checksOutput());
if (fails.length) {
  console.error(`checks · ${fails.length} new FAIL\n${fails.join('\n')}`);
  process.exit(1);
}
console.log('checks · nothing failed beyond the known fails');
