<template>
  <ns-content-group title="Adrenalin" dense>
  </ns-content-group>
</template>

<script setup lang="ts">

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsContentSplit from '@/components/NsContentSplit.vue';
import NsTextContent from '@/components/NsTextContent.vue';
import NsKeyValueContainer from '@/components/NsKeyValueContainer.vue';
import NsKeyValue from '@/components/NsKeyValue.vue';
import TextMono from '@/components/TextMono.vue';
import NsColorBox from '@/components/NsColorBox.vue';
import TextColored from '@/components/TextColored.vue';
import { Patient } from '@/types/emergency';

import { clamp, round } from '@/service/math';
import { computed } from 'vue';

</script>

<style lang="css" scoped>

</style>
