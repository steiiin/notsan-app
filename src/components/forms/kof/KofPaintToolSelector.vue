<template>
  <div class="kof-tools">
    <div class="kof-tools--tools">
      <ion-button :fill="fill('1st')" @click="selectToolBurn1"
        expand="block" color="burn-tool-1st">
        <span class="degree-btn">1°</span>
      </ion-button>
      <ion-button :fill="fill('2nd')" @click="selectToolBurn2"
        expand="block" color="burn-tool-2nd">
        <span class="degree-btn">2°</span>
      </ion-button>
      <ion-button :fill="fill('3rd')" @click="selectToolBurn3"
        expand="block" color="burn-tool-3rd">
        <span class="degree-btn">3°</span>
      </ion-button>
      <ion-button :fill="fill('erase')" @click="selectToolEraser"
        expand="block">
        <ion-icon :src="eraser"></ion-icon>
      </ion-button>
    </div>
    <div class="kof-tools--clear">
      <!-- TODO: remove clear, we don't need it - user can simply change ages for that. -->
      <ion-button fill="outline" @click="clearTool"
        expand="block" color="danger">
        <ion-icon :src="trashOutline"></ion-icon>
      </ion-button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'

import { trashOutline } from 'ionicons/icons';
import eraser from '@/data/assets/icons/icon-eraser.svg'

import { computed, ref, watch } from 'vue';

type ToolValue = '1st'|'2nd'|'3rd'|'erase'

const selectedTool = ref<ToolValue>('1st')
const selectToolBurn1 = () => { selectTool('1st') }
const selectToolBurn2 = () => { selectTool('2nd') }
const selectToolBurn3 = () => { selectTool('3rd') }
const selectToolEraser = () => { selectTool('erase') }
const clearTool = () => {
  selectTool('1st')
  emit('clear')
}

const selectTool = (tool: ToolValue) => {
  selectedTool.value = tool;
  emit('update:modelValue', tool)
}

const props = defineProps<{
  modelValue?: ToolValue
  showClear?: boolean
}>()


const emit = defineEmits<{
  (event: 'update:modelValue', value: ToolValue): void
  (event: 'clear'): void
}>()

watch(() => props.modelValue, (v) => {
  selectedTool.value = v ?? '1st'
})

const isActive = (option: ToolValue) => option === props.modelValue
const fill = (option: ToolValue) => isActive(option) ? 'solid' : 'outline'

const tools = computed(() => {
  return [

  ]
})

</script>

<style>

:root {
  /* 1st degree — dark warm yellow / amber */
  --ion-color-burn-tool-1st: #e38b06;
  --ion-color-burn-tool-1st-rgb: 227, 139, 6;
  --ion-color-burn-tool-1st-contrast: #ffffff;
  --ion-color-burn-tool-1st-contrast-rgb: 255, 255, 255;
  --ion-color-burn-tool-1st-shade: #c47705;
  --ion-color-burn-tool-1st-tint: #e89c28;

  /* 2nd degree — vivid clinical red */
  --ion-color-burn-tool-2nd: #d9312c;
  --ion-color-burn-tool-2nd-rgb: 217, 49, 44;
  --ion-color-burn-tool-2nd-contrast: #ffffff;
  --ion-color-burn-tool-2nd-contrast-rgb: 255, 255, 255;
  --ion-color-burn-tool-2nd-shade: #bf2b27;
  --ion-color-burn-tool-2nd-tint: #df4b46;

  /* 3rd degree — dark purple-violet (necrosis) */
  --ion-color-burn-tool-3rd: #5e2b73;
  --ion-color-burn-tool-3rd-rgb: 94, 43, 115;
  --ion-color-burn-tool-3rd-contrast: #ffffff;
  --ion-color-burn-tool-3rd-contrast-rgb: 255, 255, 255;
  --ion-color-burn-tool-3rd-shade: #522663;
  --ion-color-burn-tool-3rd-tint: #6e4183;

  /* 1st degree burn tool */
  .ion-color-burn-tool-1st {
    --ion-color-base: var(--ion-color-burn-tool-1st);
    --ion-color-base-rgb: var(--ion-color-burn-tool-1st-rgb);
    --ion-color-contrast: var(--ion-color-burn-tool-1st-contrast);
    --ion-color-contrast-rgb: var(--ion-color-burn-tool-1st-contrast-rgb);
    --ion-color-shade: var(--ion-color-burn-tool-1st-shade);
    --ion-color-tint: var(--ion-color-burn-tool-1st-tint);
  }

  /* 2nd degree burn tool */
  .ion-color-burn-tool-2nd {
    --ion-color-base: var(--ion-color-burn-tool-2nd);
    --ion-color-base-rgb: var(--ion-color-burn-tool-2nd-rgb);
    --ion-color-contrast: var(--ion-color-burn-tool-2nd-contrast);
    --ion-color-contrast-rgb: var(--ion-color-burn-tool-2nd-contrast-rgb);
    --ion-color-shade: var(--ion-color-burn-tool-2nd-shade);
    --ion-color-tint: var(--ion-color-burn-tool-2nd-tint);
  }

  /* 3rd degree burn tool */
  .ion-color-burn-tool-3rd {
    --ion-color-base: var(--ion-color-burn-tool-3rd);
    --ion-color-base-rgb: var(--ion-color-burn-tool-3rd-rgb);
    --ion-color-contrast: var(--ion-color-burn-tool-3rd-contrast);
    --ion-color-contrast-rgb: var(--ion-color-burn-tool-3rd-contrast-rgb);
    --ion-color-shade: var(--ion-color-burn-tool-3rd-shade);
    --ion-color-tint: var(--ion-color-burn-tool-3rd-tint);
  }

}
</style>
<style scoped>

.degree-btn {
  letter-spacing: 1px;
  font-weight: bold;
}

.kof-tools--tools {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  gap: 0.5rem;
}
.kof-tools--clear {
  margin-top: .5rem;
}

.kof-tools ion-button {
  width: 100%;
  margin: 0;
}

.tool-1st {
  --ion-color: #f00;
}

</style>
