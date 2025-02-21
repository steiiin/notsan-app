<template>
  <ns-content-split class="ns-medpackage" nowrap>
    <template #left>
      <ion-icon :icon="pkgIcon"></ion-icon>
    </template>
    <template #right>
      <h2>{{ package.name }}</h2>
      <pre v-for="incredient in package.incredients"
        >{{ incredient.amount }} <span
        >{{ incredient.label}}</span
      ></pre>
    </template>
  </ns-content-split>
</template>

<script setup lang="ts">
import { IonIcon, IonGrid, IonCol, IonRow } from '@ionic/vue';
import NsContentSplit from '@/components/NsContentSplit.vue'
import { amp1x, amp2x, ampFlsk, flsk, flexamp, spray, spritz, supp, infusion, inhaler } from '@/theme/icons/vials-icons'
import { computed } from 'vue'
import { Package } from '@/types/package'
const props = defineProps<{
  package: Package,
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
.ns-medpackage pre
{
  font-size: .9em;
  line-height: 1.2;
}
.ns-medpackage pre > span
{
  font-family: 'sans-serif';
  font-size: 1em;
}

</style>
