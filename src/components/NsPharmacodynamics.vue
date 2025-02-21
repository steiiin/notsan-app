<template>
  <ns-content-group title="Pharmakodynamik" class="ns-pharmacodyn">
    <slot></slot>
  </ns-content-group>
</template>

<script setup lang="ts">
import NsContentGroup from '@/components/NsContentGroup.vue'
</script>

<style lang="css" scoped>
.ns-pharmacodyn :deep(p)
{
  margin-bottom: .5rem;
}
</style>
