export function useNaturalTextConcat(items: string[], filler: 'oder' | 'und'): string {
  const filteredItems = items.map(item => item.trim()).filter(Boolean)

  if (filteredItems.length === 0) {
    return ''
  }

  if (filteredItems.length === 1) {
    return filteredItems[0]
  }

  if (filteredItems.length === 2) {
    return `${filteredItems[0]} ${filler} ${filteredItems[1]}`
  }

  const lastItem = filteredItems.pop() as string
  return `${filteredItems.join(', ')} ${filler} ${lastItem}`
}
