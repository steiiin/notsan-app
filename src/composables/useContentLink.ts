export function useContentLink(link: string): string {
  const parts = link.split(':')
  const key = parts[0]
  const value = parts[1]

  if (key === 'bpr') return `/tabs/lib/list/bpr-list/bpr-${value}`;
  if (key === 'med') return `/tabs/meds/${value}`;

  return link
}
