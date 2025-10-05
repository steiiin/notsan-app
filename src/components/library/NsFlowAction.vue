<template>
  <ion-popover ref="popover" :is-open="isOpen" @did-dismiss="dismissPopover">
    <div class="ion-padding">
      <ns-text-content class="dense">
        <slot></slot>
      </ns-text-content>
    </div>
  </ion-popover>
</template>

<script setup lang="ts">

import { IonPopover } from '@ionic/vue'
import NsTextContent from '../NsTextContent.vue';
import { ref } from 'vue'
import { FlowActionPayload } from '@/types/flow';

const isOpen = ref(false);
const popover = ref<InstanceType<typeof IonPopover> | null>(null);

const presentPopover = (payload: FlowActionPayload) => {
  popover.value?.$el?.present(payload.source)
  isOpen.value = true;
};

const dismissPopover = () => {
  isOpen.value = false;
};

defineExpose({
  presentPopover,
  dismissPopover,
})

</script>

<style lang="css" scoped>

.dense {
  font-size: 0.8rem !important;
}

</style>
