<template>
  <template v-if="inline">
    <span class="ns-medpackage-inline">
      <ion-icon :icon="pkgIcon"></ion-icon>
      <pre>{{ firstAmount }}<span>{{ firstIncredient?.label }}</span></pre>
    </span>
  </template>
  <template v-else>
    <ns-content-split class="ns-medpackage" nowrap>
      <template #left>
        <ion-icon :icon="pkgIcon"></ion-icon>
      </template>
      <template #right>
        <h2>{{ package.name }}</h2>
        <pre v-for="incredient in package.incredients">{{ incredient.amount }}<span v-if="incredient.label"
          >{{ incredient.label }}</span
        ></pre>
      </template>
    </ns-content-split>
  </template>
</template>

<script setup lang="ts">

import { IonIcon } from '@ionic/vue'
import { amp1x, amp2x, ampFlsk, flsk, flexamp, spray, spritz, supp, pill, infusion, inhaler } from '@/theme/icons/vials-icons'

import { computed } from 'vue'
import { Package } from '@/types/package'

import NsContentSplit from '@/components/NsContentSplit.vue'

const props = defineProps<{
  package: Package,
  inline?: boolean,
}>()

const pkgIconMap: Record<string, string> = {
  'amp': amp1x,
  'amp-2x': amp2x,
  'amp-flsk': ampFlsk,
  'flsk': flsk,
  'flexamp': flexamp,
  'inhaler': inhaler,
  'infusion': infusion,
  'spray': spray,
  'supp': supp,
  'pill': pill,
  'spritz': spritz,
}
const pkgIcon = computed(() => props.package.type in pkgIconMap ? pkgIconMap[props.package.type] : amp1x)

const firstIncredient = computed(() => props.package.incredients.at(0) ? props.package.incredients.at(0) : null)
const firstAmount = computed(() => firstIncredient.value ? firstIncredient.value.amount.replaceAll(' ', '') : null)

</script>

<style lang="css" scoped>

/* parent layout */
.ns-medpackage {
  padding-bottom: var(--ns-card-padding);
  align-items: center;
}

/* layout styles */
.ns-medpackage ion-icon {
  font-size: 3rem;
}

@media(max-width: 360px) {
  .ns-medpackage { gap: .2rem; }
  .ns-medpackage ion-icon { font-size: 2rem; }
}

/* text styles */
.ns-medpackage h2,
.ns-medpackage pre,
.ns-medpackage pre>span {
  margin: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ns-medpackage h2 {
  font-size: 1em;
  font-weight: bold;
}

.ns-medpackage-inline {
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
}

.ns-medpackage-inline ion-icon {
  font-size: 1.2em;
}

.ns-medpackage pre,
.ns-medpackage-inline pre {
  font-size: .9em;
  line-height: var(--ns-narrow-line);
  white-space: pre;
}

.ns-medpackage pre>span,
.ns-medpackage-inline pre>span {
  font-family: 'sans-serif';
  font-size: 1em;
  margin-left: 0.2rem;
}

</style>
