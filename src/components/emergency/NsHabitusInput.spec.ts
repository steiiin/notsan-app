// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'

import NsHabitusInput from '@/components/emergency/NsHabitusInput.vue'

const IonSelectStub = defineComponent({
  name: 'IonSelect',
  props: {
    value: String,
  },
  emits: ['ionChange'],
  template: '<div><slot /></div>',
})

describe('NsHabitusInput', () => {
  it('forwards Ionic habitus changes through the v-model contract', async () => {
    const wrapper = mount(NsHabitusInput, {
      props: {
        modelValue: 'very-thin',
        mode: 'child',
      },
      global: {
        stubs: {
          IonSelect: IonSelectStub,
          IonSelectOption: true,
        },
      },
    })

    wrapper.findComponent(IonSelectStub).vm.$emit('ionChange', {
      detail: { value: 'very-overweight' },
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toEqual([
      ['very-overweight'],
    ])
  })
})
