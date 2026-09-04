// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'

import { usePatientStore } from '@/stores/patient'
import {
  selectSalbutamolAmpouleHint,
  type SalbutamolStrength,
} from './SalbutamolDosage'

describe('Salbutamol ampoule selection', () => {
  it.each([
    { strength: 5, childHint: '(½ Ampulle)', adultHint: '(1 Ampulle)' },
    { strength: 2.5, childHint: '(1 Ampulle)', adultHint: '(2 Ampullen)' },
    { strength: 1.25, childHint: '(2 Ampullen)', adultHint: '(4 Ampullen)' },
  ] satisfies Array<{
    strength: SalbutamolStrength
    childHint: string
    adultHint: string
  }>)('uses the sole enabled $strength mg/ml strength', ({ strength, childHint, adultHint }) => {
    expect(selectSalbutamolAmpouleHint(2.5, [strength])).toBe(childHint)
    expect(selectSalbutamolAmpouleHint(5, [strength])).toBe(adultHint)
  })

  it('prefers one ampoule when the matching strength is enabled', () => {
    const strengths: SalbutamolStrength[] = [5, 2.5, 1.25]

    expect(selectSalbutamolAmpouleHint(2.5, strengths)).toBe('(1 Ampulle)')
    expect(selectSalbutamolAmpouleHint(5, strengths)).toBe('(1 Ampulle)')
  })

  it('prefers whole ampoules before a split ampoule', () => {
    expect(selectSalbutamolAmpouleHint(2.5, [5, 1.25])).toBe('(2 Ampullen)')
  })

  it('prefers fewer whole ampoules', () => {
    expect(selectSalbutamolAmpouleHint(5, [2.5, 1.25])).toBe('(2 Ampullen)')
  })

  it('returns no hint when no package is enabled', () => {
    expect(selectSalbutamolAmpouleHint(2.5, [])).toBe('')
    expect(selectSalbutamolAmpouleHint(5, [])).toBe('')
  })
})

describe('patient-specific Salbutamol dosage', () => {
  it('uses 2.5 mg at age 12 and 5 mg above age 12', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const patient = usePatientStore()
    patient.$patch({
      inputWeightAccuracy: 'estimate',
      inputWeightEstimateBy: 'by-age',
      inputAge: 12,
    })

    const { default: FragSalbutamolObstruktionPi } = await import('./FragSalbutamolObstruktionPi.vue')
    const wrapper = mount(FragSalbutamolObstruktionPi, {
      global: { plugins: [pinia] },
    })

    expect(wrapper.find('.dose').text()).toBe('2,5mg')

    patient.inputAge = 13
    await nextTick()

    expect(wrapper.find('.dose').text()).toBe('5mg')
  })
})
