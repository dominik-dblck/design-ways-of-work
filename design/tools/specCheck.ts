/**
 * - runs spec-check on the components spec, the board read to check an owner
 * - `node tools/specCheck.ts` · a finding is printed and exits 1
 */
import { errorMessageOf } from '../guards/checks/checkWorld.ts';
import * as SPEC_CHECK from '../guards/specCheck.ts';

async function main(): Promise<number> {
  try {
    await SPEC_CHECK.run({
      log: (...said) => console.log(said.join(' ')),
    });
    return 0;
  } catch (error) {
    console.error(errorMessageOf(error));
    return 1;
  }
}

process.exitCode = await main();
