import { describe, expect, it } from 'vitest'
import { formatModifiedDate, resolveContentModified } from './version'

describe('content modification metadata', () => {
  it('normalizes the route and resolves a valid timestamp', () => {
    const modified = {
      '/tabs/meds/epinephrin': '2026-09-05T12:00:00.000Z',
    }

    expect(resolveContentModified(modified, '/tabs/meds/epinephrin/'))
      .toBe('2026-09-05T12:00:00.000Z')
  })

  it('returns undefined for missing or invalid timestamps', () => {
    expect(resolveContentModified({}, '/tabs/emergency')).toBeUndefined()
    expect(resolveContentModified({ '/tabs/emergency': 'invalid' }, '/tabs/emergency'))
      .toBeUndefined()
  })

  it('formats a valid timestamp as a German short date', () => {
    expect(formatModifiedDate('2026-09-05T12:00:00'))
      .toBe('05.09.26')
    expect(formatModifiedDate('invalid')).toBeUndefined()
    expect(formatModifiedDate()).toBeUndefined()
  })
})
