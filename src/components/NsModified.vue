<template>
  <div v-if="formattedDatetime" class="ns-modified">
    Stand<br><time :datetime="datetime">{{ formattedDatetime }}</time>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import { formatModifiedDate } from '@/service/version'

// ############################################################################

const props = defineProps<{
  datetime?: string
}>()

// ############################################################################

const formattedDatetime = computed(() => formatModifiedDate(props.datetime))

</script>
<style scoped>

.ns-modified {
  position: absolute;
  right: 1rem; top: 1rem;
  font-size: .7rem; text-align: end;
  text-transform: uppercase;
  line-height: 1.1;

}

</style>
