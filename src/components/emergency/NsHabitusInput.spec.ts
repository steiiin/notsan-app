// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'

import NsHabitusInput from '@/components/emergency/NsHabitusInput.vue'

const IonSelectStub = defineComponent({
  name: 'IonSelect',
  props: {
    modelValue: String,
  },
  emits: ['ionChange', 'update:modelValue'],
  template: '<div><slot /></div>',
})

describe('NsHabitusInput', () => {
  const mountInput = () => mount(NsHabitusInput, {
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

  it('forwards Ionic change events through the v-model contract', async () => {
    const wrapper = mountInput()

    wrapper.findComponent(IonSelectStub).vm.$emit('ionChange', {
      detail: { value: 'very-overweight' },
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toEqual([
      ['very-overweight'],
    ])
  })

  it('retains support for Ionic model updates', async () => {
    const wrapper = mountInput()

    wrapper.findComponent(IonSelectStub).vm.$emit('update:modelValue', 'very-overweight')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toEqual([
      ['very-overweight'],
    ])
  })
})
