import versionData from '@/version.json'

type ContentModifiedMap = Record<string, string>

const normalizeRoutePath = (routePath: string): string => {
  if (routePath === '/') {
    return routePath
  }
  return routePath.replace(/\/+$/, '')
}

export const resolveContentModified = (
  contentModified: ContentModifiedMap | undefined,
  routePath: string,
): string | undefined => {
  const datetime = contentModified?.[normalizeRoutePath(routePath)]
  if (!datetime || Number.isNaN(Date.parse(datetime))) {
    return undefined
  }
  return datetime
}

export const getContentModified = (routePath: string): string | undefined => {
  return resolveContentModified(
    (versionData as { contentModified?: ContentModifiedMap }).contentModified,
    routePath,
  )
}

export const formatModifiedDate = (datetime?: string): string | undefined => {
  if (!datetime) {
    return undefined
  }

  const date = new Date(datetime)
  if (Number.isNaN(date.getTime())) {
    return undefined
  }

  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}
