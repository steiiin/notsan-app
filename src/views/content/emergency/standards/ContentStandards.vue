<template>
  <ns-content-group title="Standards" dense>
    <ns-key-value-container>
      <ns-key-value label="Puls">
        <p range>
          <span class="range-level range-level--low"><span class="range-text--value">{{ normVitals.pulseLow }}</span>/<span class="range-text--unit">min</span></span>
          <span class="range-level range-level--norm"><span class="range-text--value">{{ normVitals.pulse }}</span>/<span class="range-text--unit">min</span></span>
          <span class="range-level range-level--high"><span class="range-text--value">{{ normVitals.pulseHigh }}</span>/<span class="range-text--unit">min</span></span>
        </p>
      </ns-key-value>
      <ns-key-value label="Blutdruck">
        <p range>
          <span class="range-level range-level--low"><span class="range-text--value">{{ normVitals.pressureLow }}</span><sub>syst</sub></span>
          <span class="range-level range-level--norm"><span class="range-text--value">{{ normVitals.pressure }}</span><span class="range-text--unit"><sub>syst</sub></span></span>
          <span class="range-level range-level--high"><span class="range-text--value">{{ normVitals.pressureHigh }}</span><sub>syst</sub></span>
        </p>
      </ns-key-value>
      <ns-key-value label="AF">
        <p range>
          <span class="range-level range-level--low"><span class="range-text--value">{{ normVitals.respirationLow }}</span>/<span class="range-text--unit">min</span></span>
          <span class="range-level range-level--norm"><span class="range-text--value">{{ normVitals.respiration }}</span>/<span class="range-text--unit">min</span></span>
          <span class="range-level range-level--high"><span class="range-text--value">{{ normVitals.respirationHigh }}</span>/<span class="range-text--unit">min</span></span>
        </p>
      </ns-key-value>
    </ns-key-value-container>
  </ns-content-group>
</template>

<script setup lang="ts">

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsKeyValueContainer from '@/components/NsKeyValueContainer.vue';
import NsKeyValue from '@/components/NsKeyValue.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';

// #region age-based estimation

  interface VitalNorms {
    pulse: string
    pulseLow: string
    pulseHigh: string
    pressure: string
    pressureLow: string
    pressureHigh: string
    respiration: string
    respirationLow: string
    respirationHigh: string
  }

  function estimateVitals(): VitalNorms {

    const age = patient.age

    // Newborn (0-3m)
    if (age <= 0.25) {
      return {
        pulse: '110-180', pulseLow: '100', pulseHigh: '200',
        respiration: '30-60', respirationLow: '25', respirationHigh: '70',
        pressure: '60-80', pressureLow: '50', pressureHigh: '90'
      }
    }

    // Infant (3–12 m ≈ 1 y)
    if (age <= 1) {
      return {
        pulse: '100-180', pulseLow: '90', pulseHigh: '190',
        respiration: '30-50', respirationLow: '25', respirationHigh: '55',
        pressure: '70-105', pressureLow: '65', pressureHigh: '110'
      }
    }

    // Toddler (1–3 y)
    if (age <= 3) {
      return {
        pulse: '90-160', pulseLow: '80', pulseHigh: '180',
        respiration: '25-35', respirationLow: '20', respirationHigh: '40',
        pressure: '80-110', pressureLow: '75', pressureHigh: '115'
      }
    }

    // Preschool (4–5 y)
    if (age <= 5) {
      return {
        pulse: '80-150', pulseLow: '70', pulseHigh: '170',
        respiration: '20-30', respirationLow: '18', respirationHigh: '35',
        pressure: '80-115', pressureLow: '75', pressureHigh: '120'
      }
    }

    // School (6–12 y)
    if (age <= 12) {
      return {
        pulse: '75-120', pulseLow: '60', pulseHigh: '150',
        respiration: '18-25', respirationLow: '16', respirationHigh: '30',
        pressure: '90-120', pressureLow: '80', pressureHigh: '125'
      }
    }

    // Adolescent (13–17 y)
    if (age <= 17) {
      return {
        pulse: '60-100', pulseLow: '50', pulseHigh: '140',
        respiration: '12-20', respirationLow: '10', respirationHigh: '25',
        pressure: '100-135', pressureLow: '90', pressureHigh: '160'
      }
    }

    // Adult (≥18 y)
    return {
      pulse: '60-80', pulseLow: '50', pulseHigh: '120',
      respiration: '12-20', respirationLow: '10', respirationHigh: '24',
      pressure: '110-130', pressureLow: '100', pressureHigh: '180'
    }

  }

// #endregion

const normVitals = computed(() => estimateVitals())

</script>

<style lang="css" scoped>

p[range] {
  display: flex;
  justify-content: space-between;
  max-width: 250px;
  align-items: baseline;
}

p[range] .range-text--value {
  font-weight: bold;
}

p[range] .range-text--unit {
  opacity: 0.9;
  font-weight: 100;
}

p[range] .range-level {
  letter-spacing: 0px;
}

p[range] .range-level--low,
p[range] .range-level--high {
  color: var(--ns-color-blue);
  font-size: 0.9em;
}
p[range] .range-level--high {
  color: var(--ns-color-red);
}
p[range] .range-level--low::after {
  content: ' >';
}
p[range] .range-level--high::before {
  content: '< ';
}

.et-tolerance {
  font-size: 0.9em;
  opacity: 0.8;
}

</style>
