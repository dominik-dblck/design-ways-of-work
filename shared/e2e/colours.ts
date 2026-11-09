/**
 * - `rgbOf` · a `#rrggbb` colour as the browser computes it
 */
export const rgbOf = (hex: string): string => {
  const digits = hex.replace('#', '');
  const [red, green, blue] = [0, 2, 4].map((at) =>
    parseInt(digits.slice(at, at + 2), 16),
  );
  return `rgb(${String(red)}, ${String(green)}, ${String(blue)})`;
};
