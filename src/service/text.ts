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
