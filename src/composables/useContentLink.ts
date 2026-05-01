
const fixed_keywords: Record<string, string> = {
  sepsis: '/tabs/forms/list/score/score-sepsis',
  geburtTransport: '/tabs/forms/list/decision/decision-geburt',
}

export function useContentLink(link: string): string {
  const parts = link.split(':')
  const key = parts[0]
  const value = parts[1]

  if (key === 'bpr') return `/tabs/lib/list/bpr-list/bpr-${value}`;
  if (key === 'med') return `/tabs/meds/${value}`;
  if (key === 'saa') return `/tabs/lib/list/saa-list/saa-${value}`;
  if (key === 'emergency') return `/tabs/emergency#${value}`;
  if (key === 'keyword') return fixed_keywords[value] ?? link

  return link
}
