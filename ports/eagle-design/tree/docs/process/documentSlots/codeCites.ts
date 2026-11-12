/**
 * - `CODE_CITES` · the texts the code rules asks this product for
 */
const CODE_CITES: Readonly<Record<string, string>> = {
  'codeSkill.1': ' `why: T-E01-06, T-E02-01`',
  'codeSkill.2': ' `why: T-E01-06`',
  'codeSkill.3': ' `why: T-E01-09`',
  'codeSkill.4': ' `why: T-E02-04`',
  'codeSkill.5': ' `why: T-E01-10`',
  'codeSkill.6': ' `why: T-E01-09`',
  'codeSkill.7': ' `why: T-E00-13`',
  'codeSkill.8': ' `why: T-E01-09` — recon F2: a verifier',
  'codeSkill.8+': "  nothing in the suite ran ignored a row's path",
  'codeSkill.9': ' `why: T-E01-07`',
  'codeSkill.10': ' `why: T-E01-10`',
  'codeSkill.11': ' `why: T-E00-08`',
  'codeSkill.12':
    ' `why: T-E04-00` — Close without changes offered over four saved edits',
  'codeSkill.13': ' `why: T-E04-00` — J4, J7',
  'codeSkill.14': " `why: T-E04-00` — Q21's `{document}`",
  'codeSkill.15':
    ' `why: T-E04-00` — Create went to the editor and the copy flow kept checking the list',
};

export { CODE_CITES };
