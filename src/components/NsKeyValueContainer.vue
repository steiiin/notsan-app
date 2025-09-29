<template>
  <div class="ns-key-value-container">
    <div class="ns-key-value-table">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.ns-key-value-table {
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

:deep(.ns-key-value) {
  display: table-row;
}

:deep(.ns-key-value__cell) {
  display: table-cell;
  vertical-align: top;
  padding: 0;
}

:deep(.ns-key-value__cell--key) {
  width: 50%;
  max-width: 50%;
  padding-right: 1.5rem;
}

:deep(.ns-key-value__cell--value) {
  width: auto;
}
</style>
