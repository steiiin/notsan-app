<template>
  <div class="ns-table-content">
    <table>
      <thead>
        <tr>
          <th v-for="head in columns" :key="head">{{ head }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.key">
          <th v-if="row.head">{{ row.head }}</th>

          <!-- auto rowspan + colspan -->
          <template v-for="(cell, idx) in row.values" :key="`${row.key}:${idx}`">
            <td v-if="!cell.skip" :rowspan="cell.rowspan" :colspan="cell.colspan">
              <text-underline v-if="cell.bold">{{ cell.text }}</text-underline>
              <template v-else>{{ cell.text }}</template>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TextUnderline from './TextUnderline.vue'

const props = defineProps<{ def: NsTableContentDefinition }>()

export interface NsTableContentDefinition {
  columns: Array<string>
  rows: Map<string, Array<string>> | Array<Array<string>>
}

type Cell = {
  text: string
  bold: boolean
  rowspan: number
  colspan: number
  skip: boolean
}

type Row = {
  head: string | null
  values: Cell[]
  key: string
}

/* ---------------- helpers ---------------- */

const isMap = (v: unknown): v is Map<string, string[]> => v instanceof Map
const hasRowHead = computed(() => isMap(props.def.rows))
const isEmptyCell = (s: string) => !s || s.trim() === ''

// keep your '!bold' convention but compare by plain text
const parseCell = (raw: string | null | undefined): { text: string; bold: boolean } => {
  const v = (raw ?? '') + ''
  return v.startsWith('!') ? { text: v.slice(1), bold: true } : { text: v, bold: false }
}

const getKey = (values: string[], head?: string | null) => `${head ?? ''}#${values.join('#')}`

/** Normalize input into rows with head + rawValues */
const baseRows = computed(() => {
  if (hasRowHead.value) {
    return Array.from((props.def.rows as Map<string, string[]>).entries()).map(
      ([head, vals]) => ({ head, rawValues: vals, key: getKey(vals, head) })
    )
  }
  return (props.def.rows as string[][]).map((vals, i) => ({
    head: null,
    rawValues: vals,
    key: getKey(vals, `_${i}`)
  }))
})

/**
 * Build final rows with rowspan/colspan metadata.
 * Rules:
 *  - Rowspan: merge identical, non-empty vertical runs (data columns only).
 *  - Colspan: in each row, absorb empty cells to the right into the previous visible cell.
 */
const rows = computed<Row[]>(() => {
  const data = baseRows.value
  if (!data.length) return []

  const rowCount = data.length
  const colCount = props.def.columns.length

  const parsed = data.map(r => r.rawValues.map(parseCell))

  // 1) Initialize structure
  const rowsWithSpans: Row[] = data.map((r) => ({
    head: r.head,
    key: r.key,
    values: Array.from({ length: colCount }, () => ({
      text: '',
      bold: false,
      rowspan: 1,
      colspan: 1,
      skip: false
    }))
  }))

  // 2) Vertical merge (rowspan)
  for (let c = 0; c < colCount; c++) {
    let r = 0
    while (r < rowCount) {
      const { text, bold } = parsed[r][c]
      if (isEmptyCell(text)) {
        rowsWithSpans[r].values[c] = { text, bold, rowspan: 1, colspan: 1, skip: false }
        r += 1
        continue
      }
      let span = 1
      while (
        r + span < rowCount &&
        !isEmptyCell(parsed[r + span][c].text) &&
        parsed[r + span][c].text === text
      ) {
        span++
      }
      rowsWithSpans[r].values[c] = { text, bold, rowspan: span, colspan: 1, skip: false }
      for (let k = r + 1; k < r + span; k++) {
        rowsWithSpans[k].values[c] = {
          text,
          bold: parsed[k][c].bold,
          rowspan: 0,
          colspan: 1,
          skip: true
        }
      }
      r += span
    }
  }

  // 3) Horizontal absorb empties to the left (colspan)
  for (let r = 0; r < rowCount; r++) {
    let prev = -1
    for (let c = 0; c < colCount; c++) {
      const cell = rowsWithSpans[r].values[c]
      if (cell.skip) continue // hidden by rowspan

      if (isEmptyCell(cell.text)) {
        if (prev !== -1) {
          rowsWithSpans[r].values[prev].colspan += 1
          cell.skip = true
        } else {
          // first visible cell is empty: keep it to preserve grid shape
          prev = c
        }
      } else {
        prev = c
      }
    }
  }

  return rowsWithSpans
})

const columns = computed(() =>
  hasRowHead.value ? [' ', ...props.def.columns] : props.def.columns
)
</script>

<style lang="css" scoped>
.ns-table-content {
  overflow-x: auto;
}

table td,
table th {
  padding: 4px 8px;
}

table thead th {
  border-bottom: 1px solid var(--ns-color-divider);
  border-left: 1px solid var(--ns-color-divider);
}

table thead th:first-of-type {
  border-left: none;
}

table tbody th {
  text-align: right;
  border-bottom: 1px solid var(--ns-color-divider);
  border-right: 1px solid var(--ns-color-divider);
}

table tbody td {
  border-bottom: 1px solid var(--ns-color-divider);
  border-left: 1px solid var(--ns-color-divider);
  text-align: center;
}

table tbody tr:last-of-type td,
table tbody tr:last-of-type th {
  border-bottom: none;
}

table tbody td:first-of-type,
table tbody td:empty {
  border-left: none;
}
</style>
