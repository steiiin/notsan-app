// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, type Pinia } from 'pinia'
import { computed, nextTick } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'

import NsPatientInfo from '@/components/emergency/NsPatientInfo.vue'
import { round } from '@/service/math'
import { usePatientStore } from '@/stores/patient'

describe('patient habitus estimates', () => {
  let pinia: Pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('recalculates weight-based values while retaining an explicitly entered age', async () => {
    const patient = usePatientStore()
    patient.$patch({
      inputWeightAccuracy: 'estimate',
      inputWeightEstimateBy: 'by-age',
      inputAge: 12,
      inputSex: 'male',
      inputHabitus: 'very-thin',
    })
    const epinephrineDose = computed(() => round(patient.weight * 0.01, 0.1, 'up'))

    expect(patient.weight).toBeCloseTo(36.805, 3)
    expect(epinephrineDose.value).toBe(0.4)
    expect(patient.age).toBe(12)

    patient.inputHabitus = 'very-overweight'
    await nextTick()

    expect(patient.weight).toBeCloseTo(58.455, 3)
    expect(epinephrineDose.value).toBe(0.6)
    expect(patient.age).toBe(12)
  })

  it('renders the estimated weight with a single kg unit', () => {
    const patient = usePatientStore()
    patient.$patch({
      inputWeightAccuracy: 'estimate',
      inputWeightEstimateBy: 'by-age',
      inputAge: 12,
      inputSex: 'male',
      inputHabitus: 'very-overweight',
    })

    const wrapper = mount(NsPatientInfo, {
      global: {
        plugins: [pinia],
        stubs: {
          NsContentGroup: {
            template: '<section><slot /></section>',
          },
        },
      },
    })
    const subtitle = wrapper.find('.subtitle').text()

    expect(subtitle).toBe('ca. 58.5 kg (nach Perzentil/Alter)')
    expect(subtitle.match(/kg/g)).toHaveLength(1)
  })
})
