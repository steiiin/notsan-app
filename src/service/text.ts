export function countChar(text: string, char: string): number {
  return text.split(char).length-1
}

export function stripDots(text: string): string {
  return text.replace('.', '')
}

export function stripWrongDots(text: string): string {
  // allow an optional dot right after the first character
  const firstTwo = text.slice(0, 2);
  const rest = text.slice(2);

  // if the second char is a dot, keep it; else no dot in prefix
  const keep = firstTwo[1] === '.' ? firstTwo : firstTwo[0] + (firstTwo[1] ?? '');

  // strip every other dot from the remainder
  return keep + rest.replace(/\./g, '');
}

/**
 * Converts a number between 0 and 1 to a corresponding fraction symbol, if available.
 *
 * @param num A number between 0 and 1
 * @returns
 */
export function numToFracSymbol(num: number): string {
  const intPart = Math.floor(num);
  const fracPart = num - intPart;

  const fracSymbol = (() => {
    switch (true) {
      case Math.abs(fracPart - 1/4) < 1e-6: return '¼';
      case Math.abs(fracPart - 1/2) < 1e-6: return '½';
      case Math.abs(fracPart - 3/4) < 1e-6: return '¾';
      case Math.abs(fracPart - 1/3) < 1e-6: return '⅓';
      case Math.abs(fracPart - 2/3) < 1e-6: return '⅔';
      case Math.abs(fracPart - 1/5) < 1e-6: return '⅕';
      case Math.abs(fracPart - 2/5) < 1e-6: return '⅖';
      case Math.abs(fracPart - 3/5) < 1e-6: return '⅗';
      case Math.abs(fracPart - 4/5) < 1e-6: return '⅘';
      case Math.abs(fracPart - 1/6) < 1e-6: return '⅙';
      case Math.abs(fracPart - 5/6) < 1e-6: return '⅚';
      case Math.abs(fracPart - 1/8) < 1e-6: return '⅛';
      case Math.abs(fracPart - 3/8) < 1e-6: return '⅜';
      case Math.abs(fracPart - 5/8) < 1e-6: return '⅝';
      case Math.abs(fracPart - 7/8) < 1e-6: return '⅞';
      default: return '';
    }
  })();

  if (fracSymbol) {
    // if there's an integer part, combine them
    return intPart > 0 ? `${intPart}${fracSymbol}` : fracSymbol;
  }

  // no known fraction, just return as number
  return num.toString();
}
