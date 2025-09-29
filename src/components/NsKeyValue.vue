<template>
  <div class="ns-key-value">
    <div class="ns-key-value__cell ns-key-value__cell--key">
      <ns-text-content>
        <em class="ns-key-value__key">{{ label }}</em>
      </ns-text-content>
    </div>
    <div class="ns-key-value__cell ns-key-value__cell--value">
      <ns-text-content>
        <slot></slot>
      </ns-text-content>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import NsTextContent from './NsTextContent.vue';

defineProps<{ label: string }>();
</script>

<style scoped>
.ns-key-value__key {
  font-style: italic;
  font-weight: inherit;
}
</style>
