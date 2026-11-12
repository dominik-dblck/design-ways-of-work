/**
 * - `liveWords` · words by name, each read off messages.ts at the call
 */

// a word by its name, sure; by a key a table holds, maybe none
type LiveWords<Name extends string> = Readonly<Record<Name, string>> &
  Readonly<Partial<Record<string, string>>>;

// a name's word is its key's, read when it is read: a message edited shows at once, never copied
const liveWords = <Name extends string>(
  keys: Readonly<Record<Name, string>>,
  read: (key: string) => string,
): LiveWords<Name> =>
  new Proxy(keys, {
    get: (target, name): unknown =>
      typeof name === 'string' && Object.hasOwn(target, name)
        ? read(String(Reflect.get(target, name)))
        : undefined,
  });

export { liveWords };
