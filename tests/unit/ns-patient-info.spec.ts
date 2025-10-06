import { getBroselowCode } from '@/components/emergency/broselow'
import { describe, expect, test } from 'vitest'

describe('getBroselowCode', () => {
  test('maps decimal weights to the expected Broselow zones', () => {
    expect(getBroselowCode(5.5)).toMatchObject({
      code: 'Grau',
      colorCode: 'grey',
    })

    expect(getBroselowCode(23.2)).toMatchObject({
      code: 'Blau',
      colorCode: 'blue',
    })
  })

  test('handles boundary cases for non-negative weights', () => {
    expect(getBroselowCode(0)).toMatchObject({ colorCode: 'grey' })
    expect(getBroselowCode(36.8)).toMatchObject({ colorCode: 'green' })
    expect(getBroselowCode(-1)).toBeNull()
  })
})
