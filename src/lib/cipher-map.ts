/**
 * Builds an immutable character-to-character mapping (substitution cipher)
 * from two equal-length strings.
 *
 * @param keys   Characters to use as keys.
 * @param values Characters to use as values (same length as keys).
 * @returns A ReadonlyMap where keys[i] → values[i].
 * @throws Error if the two strings have different lengths.
 */
export function buildCipherMap(
  keys: string,
  values: string,
): ReadonlyMap<string, string> {
  if (keys.length !== values.length) {
    throw new Error(
      `Les longueurs des clés et valeurs du chiffrement ne correspondent pas. Clés : ${keys.length}, Valeurs : ${values.length}`,
    );
  }

  const map = new Map<string, string>();

  for (let i = 0; i < keys.length; i++) {
    map.set(keys[i], values[i]);
  }

  return map;
}

/**
 * Applies a cipher map to every character of the input string.
 *
 * @param input     The string to transform.
 * @param cipherMap A character mapping.
 * @returns The transformed string.
 * @throws Error if a character is not found in the cipher map.
 */
export function applyCipher(
  input: string,
  cipherMap: ReadonlyMap<string, string>,
): string {
  return input
    .split("")
    .map((char) => {
      const mapped = cipherMap.get(char);
      if (mapped === undefined) {
        throw new Error(
          `Le caractère "${char}" n'a pas été trouvé dans la table de chiffrement.`,
        );
      }
      return mapped;
    })
    .join("");
}
