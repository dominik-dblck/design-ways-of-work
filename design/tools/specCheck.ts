/**
 * - runs spec-check on the built project's files, the board read to check an owner
 * - `node tools/specCheck.ts` · a finding is printed and exits 1
 */
import { errorMessageOf, mirrorAt } from '../guards/checks/checkWorld.ts';
import { builtRoot } from './root.ts';
import * as SPEC_CHECK from '../guards/specCheck.ts';

async function main(): Promise<number> {
  const mirror = mirrorAt(builtRoot(), { mode: 'read', copyTo: null });
  try {
    await SPEC_CHECK.run({
      readFile: async (file) => mirror.read(file),
      log: (...said) => console.log(said.join(' ')),
    });
    return 0;
  } catch (error) {
    console.error(errorMessageOf(error));
    return 1;
  }
}

process.exitCode = await main();
