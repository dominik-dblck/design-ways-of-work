/**
 * - `node tools/checksGate.ts` · the checks on a fresh build, nothing written back
 * - exits 1 on any FAIL line, or on a part that threw
 */
import { execFileSync } from 'node:child_process';

function checksOutput(): string {
  execFileSync('node', ['tools/build.ts'], { stdio: 'ignore' });
  try {
    return execFileSync('node', ['tools/checks.ts'], { encoding: 'utf8' });
  } catch (error) {
    const out = Reflect.get(Object(error), 'stdout');
    return typeof out === 'string' ? out : String(error);
  }
}

function failsIn(output: string): readonly string[] {
  return output.split('\n').filter((line) => line.startsWith('FAIL'));
}

const fails = failsIn(checksOutput());
if (fails.length) {
  console.error(`checks · ${fails.length} FAIL\n${fails.join('\n')}`);
  process.exit(1);
}
console.log('checks · nothing failed');
