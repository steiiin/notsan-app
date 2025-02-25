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
        <pre v-for="incredient in package.incredients"
          >{{ incredient.amount }}<span v-if="incredient.label"
          >{{ incredient.label}}</span
        ></pre>
      </template>
    </ns-content-split>
  </template>
</template>

<script setup lang="ts">
import { IonIcon, IonGrid, IonCol, IonRow } from '@ionic/vue';
import NsContentSplit from '@/components/NsContentSplit.vue'
import { amp1x, amp2x, ampFlsk, flsk, flexamp, spray, spritz, supp, infusion, inhaler } from '@/theme/icons/vials-icons'
import { computed } from 'vue'
import { Package } from '@/types/package'
const props = defineProps<{
  package: Package,
  inline?: boolean,
}>()

const pkgIcon = computed(() => {
  switch (props.package?.type)
  {
    case "amp":
      return amp1x
    case "amp-2x":
      return amp2x
    case "amp-flsk":
      return ampFlsk
    case "flsk":
      return flsk
    case "flexamp":
      return flexamp
    case "inhaler":
      return inhaler
    case "infusion":
      return infusion
    case "spray":
      return spray
    case "supp":
      return supp
    case "spritz":
      return spritz
    default:
      return amp1x
  }
})

const firstIncredient = computed(() => props.package.incredients.at(0) ? props.package.incredients.at(0) : null)
const firstAmount = computed(() => firstIncredient.value ? firstIncredient.value.amount.replaceAll(' ', '') : null)

const typeDescription = computed(() => {
  switch (props.package.type) {
    case "amp":
    case "flexamp":
      return "Ampulle"
    case"amp-2x":
      return "Ampullen"
    case "amp-flsk":
    case "flsk":
      return "Flasche"
    case "inhaler":
      return "Inhalation"
    case "infusion":
      return "Infusion"
    case "spray":
      return "Spray"
    case "supp":
      return "Zäpfchen"
    case "spritz":
      return "Spritze"
  }
})

</script>

<style lang="css" scoped>

/* parent layout */
.ns-medpackage
{
  padding-bottom: var(--ns-card-padding);
}

/* layout styles */
.ns-medpackage ion-icon
{
  font-size: 3rem;
}
@media(max-width: 360px) {
  .ns-medpackage { gap: .2rem; }
  .ns-medpackage ion-icon { font-size:2rem; }
}

/* text styles */
.ns-medpackage h2,
.ns-medpackage pre,
.ns-medpackage pre > span
{
  margin: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ns-medpackage h2
{
  font-size: 1em;
  font-weight: bold;
}

.ns-medpackage-inline
{
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
}
.ns-medpackage-inline ion-icon
{
  font-size: 1.2em;
}
.ns-medpackage pre,
.ns-medpackage-inline pre
{
  font-size: .9em;
  line-height: var(--ns-narrow-line);
  white-space: pre;
}
.ns-medpackage pre > span,
.ns-medpackage-inline pre > span
{
  font-family: 'sans-serif';
  font-size: 1em;
  margin-left: 0.2rem;
}

</style>
