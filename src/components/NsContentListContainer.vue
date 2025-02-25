<template>
  <ion-list>
    <ion-item-group v-for="(items, letter) in groupedList" :key="letter" class="list-group">
      <ion-item-divider>
        <ion-label>{{ letter }}</ion-label>
      </ion-item-divider>
      <ion-item v-for="item in items" :key="item.id" button :routerLink="item.path">
        <ion-label>
          <template v-if="!item.subtitle">
            {{ item.title }}
          </template>
          <template v-else>
            <h2>{{ item.title }}</h2>
            <p>{{ item.subtitle }}</p>
          </template>
        </ion-label>
      </ion-item>
    </ion-item-group>
  </ion-list>
</template>

<script setup lang="ts">

import { IonList, IonItem, IonLabel, IonItemGroup, IonItemDivider } from '@ionic/vue'

import { Medication } from '@/types/medication'

import { computed } from 'vue'

const props = defineProps<{
  items: any[]
}>()

const groupedList = computed(() => {
  const groups: Record<string, Medication[]> = {}
  props.items.forEach(item => {
    const letter = item.title.charAt(0).toUpperCase()
    if (!groups[letter]) { groups[letter] = [] }
    groups[letter].push(item)
  })
  const sortedGroups: Record<string, Medication[]> = {}
  Object.keys(groups)
    .sort()
    .forEach(letter => {
      sortedGroups[letter] = groups[letter].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    })
  return sortedGroups
})

</script>

<style scoped>
.list-group ion-item:last-of-type {
  --inner-border-width: 0;
}
</style>