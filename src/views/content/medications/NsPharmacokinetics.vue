<template>
  <ns-content-group title="Pharmakokinetik" v-if="!!onset || !!duration">
      <ion-grid class="ns-pharmacokin">
        <ion-row v-if="!!onset">
          <ion-col class="labelcolumn">
            <ion-icon :icon="stopwatchOutline"></ion-icon>
            <span class="label">Wirkeintritt:</span>
          </ion-col>
          <ion-col class="contentcolumn" v-html="onsetText"></ion-col>
        </ion-row>
        <ion-row v-if="!!duration">
          <ion-col class="labelcolumn">
            <ion-icon :icon="timer"></ion-icon>
            <span class="label">Wirkdauer:</span>
          </ion-col>
          <ion-col class="contentcolumn" v-html="durationText"></ion-col>
        </ion-row>
      </ion-grid>
    </ns-content-group>
</template>

<script setup lang="ts">

import { IonIcon, IonGrid, IonCol, IonRow } from '@ionic/vue'
import { stopwatchOutline, timer } from 'ionicons/icons'
import { computed } from 'vue';
import NsContentGroup from '@/components/NsContentGroup.vue'

const props = defineProps<{
  onset?: string,
  duration?: string,
}>()

const onsetText = computed(() => props.onset ? props.onset.replaceAll('|','<br>') : null)
const durationText = computed(() => props.duration ? props.duration.replaceAll('|','<br>') : null)

</script>

<style lang="css" scoped>

.ns-pharmacokin ion-col
{
  display: flex;
  align-items: center;
  gap: .3rem;
}
.ns-pharmacokin ion-icon
{
  font-size: 1.5rem;
}
.ns-pharmacokin .labelcolumn
{
  max-width: 15rem;
  min-width: 100px;
}
.ns-pharmacokin .label
{
  font-weight: bold;
}
.ns-pharmacokin .contentcolumn
{
  display: inline;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: var(--ns-narrow-line);
  margin: auto 0;
}

@media(max-width: 330px) {
  .ns-pharmacokin ion-icon { display: none; }
}

.contentcolumn :deep(case)
{
  display: inline-block;
  min-width: 30px;
  font-weight: bold;
}

.contentcolumn :deep(case)::after
{
  content: ' ';
  display: inline-block;
  min-width: 4px;
}

</style>
