/**
 * - runs spec-check on the built project's files, the board read to check an owner
 * - `node tools/spec-check.ts` · a finding is printed and exits 1
 */
import { messageOf, mirrorAt } from '../guards/checks/checkWorld.ts';
import { builtRoot } from './root.ts';
import * as SPEC_CHECK from '../guards/spec-check.ts';

async function main(): Promise<number> {
  const mirror = mirrorAt(builtRoot(), { mode: 'read', copyTo: null });
  try {
    await SPEC_CHECK.run({
      readFile: async (file) => mirror.read(file),
      log: (...said) => console.log(said.join(' ')),
    });
    return 0;
  } catch (error) {
    console.error(messageOf(error));
    return 1;
  }
}

process.exitCode = await main();
