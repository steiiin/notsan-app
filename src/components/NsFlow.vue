<template>
  <div ref="containerRef" class="ns-flow">
    <div
      v-if="layout.nodes.length"
      class="ns-flow__canvas"
      :style="{ aspectRatio: layout.aspectRatio }"
      role="img"
      aria-label="Prozessübersicht"
    >
      <svg
        class="ns-flow__svg"
        :viewBox="`0 0 ${layout.width} ${layout.height}`"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            :id="markerId"
            markerWidth="10"
            markerHeight="10"
            refX="6"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0 0 L6 3 L0 6" />
          </marker>
        </defs>

        <g class="ns-flow__edges">
          <path
            v-for="edge in layout.edges"
            :key="edge.id"
            class="ns-flow__edge"
            :d="edge.path"
            :marker-end="`url(#${markerId})`"
          />
        </g>

        <g class="ns-flow__nodes">
          <g
            v-for="node in layout.nodes"
            :key="node.id"
            :class="[
              'ns-flow__node',
              `ns-flow__node--${node.nodeType}`,
              { 'ns-flow__node--clickable': node.isClickable },
            ]"
            :transform="`translate(${node.x}, ${node.y})`"
            :tabindex="node.isClickable ? 0 : undefined"
            :role="node.isClickable ? 'button' : undefined"
            :aria-label="node.isClickable ? node.lines.join(' ') : undefined"
            :focusable="node.isClickable ? 'true' : undefined"
            @click="handleNodeActivate(node)"
            @keydown.enter.prevent="handleNodeActivate(node)"
            @keydown.space.prevent="handleNodeActivate(node)"
          >
            <template v-if="node.nodeType === 'decision'">
              <polygon
                class="ns-flow__node-shape"
                :points="getDecisionPoints(layout.nodeSize)"
              />
            </template>
            <template v-else>
              <rect
                class="ns-flow__node-shape"
                :width="layout.nodeSize.width"
                :height="layout.nodeSize.height"
                :rx="getCornerRadius(node.nodeType, layout.nodeSize)"
                :ry="getCornerRadius(node.nodeType, layout.nodeSize)"
              />
            </template>
            <foreignObject
              :width="layout.nodeSize.width"
              :height="layout.nodeSize.height"
              requiredExtensions="http://www.w3.org/1999/xhtml"
            >
              <div xmlns="http://www.w3.org/1999/xhtml" class="ns-flow__node-body">
                <span
                  v-for="(line, index) in node.lines"
                  :key="`${node.id}-${index}`"
                  class="ns-flow__node-line"
                >
                  {{ line }}
                </span>
                <span v-if="node.quicktip" class="ns-flow__node-quicktip">
                  {{ node.quicktip }}
                </span>
              </div>
            </foreignObject>
          </g>
        </g>
      </svg>
    </div>
    <div v-else class="ns-flow__empty">
      Kein Ablauf verfügbar.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import type { NsFlowData, NsFlowEdge, NsFlowNode, NsFlowNodeType } from '@/types/flow'

const props = defineProps<{ flow: NsFlowData }>()

interface LayoutNode extends NsFlowNode {
  x: number
  y: number
  column: number
  row: number
  lines: string[]
  nodeType: NsFlowNodeType
  quicktip?: string
  linkPath?: string
  isClickable: boolean
}

interface LayoutEdge extends NsFlowEdge {
  id: string
  path: string
}

interface LayoutResult {
  nodes: LayoutNode[]
  edges: LayoutEdge[]
  width: number
  height: number
  aspectRatio: number
  nodeSize: { width: number; height: number }
}

const markerId = `ns-flow-arrow-${Math.random().toString(36).slice(2, 10)}`
const router = useRouter()
const NODE_TYPES = new Set<NsFlowNodeType>(['start-end', 'decision', 'process', 'task', 'link'])
const fallback: LayoutResult = {
  nodes: [],
  edges: [],
  width: 320,
  height: 240,
  aspectRatio: 320 / 240,
  nodeSize: { width: 220, height: 92 },
}

const layout = ref<LayoutResult>({ ...fallback })
const containerRef = ref<HTMLDivElement | null>(null)
const containerSize = ref({ width: 0, height: 0 })
let resizeObserver: ResizeObserver | undefined
let layoutToken = 0

const COLUMN_SPACING = 120
const ROW_SPACING = 40
const PADDING_X = 32
const PADDING_Y = 32
const DEFAULT_NODE_SIZE = { width: 220, height: 92 }

onMounted(() => {
  if (typeof ResizeObserver === 'undefined') {
    scheduleLayoutUpdate()
    return
  }

  resizeObserver = new ResizeObserver(entries => {
    const entry = entries[0]
    if (!entry) {
      return
    }
    const { width, height } = entry.contentRect
    if (width !== containerSize.value.width || height !== containerSize.value.height) {
      containerSize.value = { width, height }
    }
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
  scheduleLayoutUpdate()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

watch(
  () => props.flow,
  () => {
    scheduleLayoutUpdate()
  },
  { deep: true }
)

watch(
  containerSize,
  () => {
    scheduleLayoutUpdate()
  },
  { deep: true }
)

function scheduleLayoutUpdate(): void {
  const token = ++layoutToken
  void computeLayout().then(result => {
    if (token === layoutToken) {
      layout.value = result
    }
  })
}

async function computeLayout(): Promise<LayoutResult> {
  if (!props.flow || !props.flow.nodes?.length) {
    return { ...fallback }
  }

  const nodeSize = { ...DEFAULT_NODE_SIZE }
  const nodes = props.flow.nodes
  const edges = props.flow.edges ?? []

  const columnCount = resolveColumnCount(props.flow, nodes)
  const layoutNodes: LayoutNode[] = []
  const nodeLookup = new Map<string, LayoutNode>()
  const order = computeTopologicalOrder(nodes, edges)
  const validEdges: NsFlowEdge[] = []
  const incoming = new Map<string, LayoutNode[]>()

  for (const original of nodes) {
    const nodeType = resolveNodeType(original)
    const quicktip = extractQuicktip(original)
    const linkPath = extractLinkPath(original)
    const isClickable = nodeType === 'link' && typeof linkPath === 'string'

    const layoutNode: LayoutNode = {
      ...original,
      x: 0,
      y: 0,
      column: 0,
      row: 0,
      lines: extractLines(original),
      nodeType,
      quicktip,
      linkPath,
      isClickable,
    }

    const preferredColumn = Number.isFinite(original.column) ? Math.floor(original.column as number) : undefined
    const columnIndex = clampColumnIndex(preferredColumn, columnCount)
    layoutNode.column = columnIndex

    layoutNodes.push(layoutNode)
    nodeLookup.set(layoutNode.id, layoutNode)
  }

  edges.forEach(edge => {
    const source = nodeLookup.get(edge.source)
    const target = nodeLookup.get(edge.target)
    if (!source || !target) {
      return
    }
    validEdges.push(edge)
    if (!incoming.has(target.id)) {
      incoming.set(target.id, [])
    }
    incoming.get(target.id)?.push(source)
  })

  const sortedNodes = [...layoutNodes].sort(
    (a, b) => getOrderValue(a.id, order) - getOrderValue(b.id, order)
  )
  const columnNextRow = Array.from({ length: columnCount }, () => 0)
  let maxRow = 0

  sortedNodes.forEach(node => {
    const sources = incoming.get(node.id) ?? []
    const requiredRow = sources.reduce((acc, source) => {
      const baseRow = source.row ?? 0
      const additional = source.column === node.column ? 1 : 0
      return Math.max(acc, baseRow + additional)
    }, 0)
    const columnIndex = node.column
    const row = Math.max(requiredRow, columnNextRow[columnIndex])
    node.row = row
    node.x = PADDING_X + columnIndex * (nodeSize.width + COLUMN_SPACING)
    node.y = PADDING_Y + row * (nodeSize.height + ROW_SPACING)
    columnNextRow[columnIndex] = row + 1
    if (row > maxRow) {
      maxRow = row
    }
  })

  const layoutEdges: LayoutEdge[] = []
  validEdges.forEach((edge, index) => {
    const id = edge.id ?? `${edge.source}-${edge.target}-${index}`
    const path = buildEdgePath(edge, nodeLookup, nodeSize, ROW_SPACING)
    if (!path) {
      return
    }
    layoutEdges.push({
      ...edge,
      id,
      path,
    })
  })

  const width =
    PADDING_X * 2 + columnCount * nodeSize.width + Math.max(0, columnCount - 1) * COLUMN_SPACING
  const rowsForHeight = Math.max(maxRow + 1, 1)
  const height =
    PADDING_Y * 2 + rowsForHeight * nodeSize.height + Math.max(0, rowsForHeight - 1) * ROW_SPACING
  const aspectRatio = width > 0 && height > 0 ? width / height : fallback.aspectRatio

  return {
    nodes: layoutNodes,
    edges: layoutEdges,
    width,
    height,
    aspectRatio,
    nodeSize,
  }
}

function resolveColumnCount(flow: NsFlowData, nodes: NsFlowNode[]): number {
  const explicit = Number.isFinite(flow.columns) ? Math.floor(flow.columns as number) : undefined
  let maxColumnFromNodes = 0
  for (const node of nodes) {
    if (Number.isFinite(node.column)) {
      const normalized = Math.floor(node.column as number)
      if (normalized > maxColumnFromNodes) {
        maxColumnFromNodes = normalized
      }
    }
  }
  const base = explicit && explicit > 0 ? explicit : 0
  const required = maxColumnFromNodes + 1
  const columnCount = Math.max(base, required, 1)
  return columnCount
}

function clampColumnIndex(column: number | undefined, columnCount: number): number {
  if (!Number.isFinite(column)) {
    return 0
  }
  const normalized = Math.floor(column as number)
  if (columnCount <= 1) {
    return 0
  }
  return Math.min(Math.max(normalized, 0), columnCount - 1)
}

function computeTopologicalOrder(nodes: NsFlowNode[], edges: NsFlowEdge[]): Map<string, number> {
  const indegree = new Map<string, number>()
  const adjacency = new Map<string, Set<string>>()

  for (const node of nodes) {
    indegree.set(node.id, 0)
    adjacency.set(node.id, new Set<string>())
  }

  for (const edge of edges) {
    const sourceSet = adjacency.get(edge.source)
    if (!sourceSet || !indegree.has(edge.target)) {
      continue
    }
    if (!sourceSet.has(edge.target)) {
      sourceSet.add(edge.target)
      indegree.set(edge.target, (indegree.get(edge.target) ?? 0) + 1)
    }
  }

  const queue: string[] = []
  for (const node of nodes) {
    if ((indegree.get(node.id) ?? 0) === 0) {
      queue.push(node.id)
    }
  }

  const order = new Map<string, number>()
  let index = 0

  while (queue.length) {
    const id = queue.shift()
    if (!id || order.has(id)) {
      continue
    }
    order.set(id, index++)
    const neighbours = adjacency.get(id)
    if (!neighbours) {
      continue
    }
    for (const target of neighbours) {
      const nextInDegree = (indegree.get(target) ?? 0) - 1
      indegree.set(target, nextInDegree)
      if (nextInDegree <= 0 && !order.has(target)) {
        queue.push(target)
      }
    }
  }

  for (const node of nodes) {
    if (!order.has(node.id)) {
      order.set(node.id, index++)
    }
  }

  return order
}

function getOrderValue(id: string, order: Map<string, number>): number {
  return order.get(id) ?? Number.MAX_SAFE_INTEGER
}

function buildEdgePath(
  edge: NsFlowEdge,
  nodeLookup: Map<string, LayoutNode>,
  nodeSize: { width: number; height: number },
  rowSpacing: number
): string | undefined {
  const source = nodeLookup.get(edge.source)
  const target = nodeLookup.get(edge.target)
  if (!source || !target) {
    return undefined
  }

  const startX = source.x + nodeSize.width / 2
  const startY = source.y + nodeSize.height
  const endX = target.x + nodeSize.width / 2
  const endY = target.y

  const points: Array<{ x: number; y: number }> = [{ x: startX, y: startY }]

  if (source.column === target.column) {
    points.push({ x: endX, y: endY })
  } else {
    const verticalOffset = rowSpacing / 2
    const firstBendY = startY + verticalOffset
    const secondBendY = endY - verticalOffset

    if (secondBendY <= firstBendY) {
      points.push({ x: startX, y: firstBendY })
      points.push({ x: endX, y: firstBendY })
      points.push({ x: endX, y: endY - verticalOffset })
    } else {
      points.push({ x: startX, y: firstBendY })
      points.push({ x: endX, y: secondBendY })
    }

    points.push({ x: endX, y: endY })
  }

  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${round(point.x)} ${round(point.y)}`)
    .join(' ')
}

function round(value: number): string {
  return Number(value.toFixed(2)).toString()
}

function extractLines(node: NsFlowNode): string[] {
  const labelCandidate = typeof node.label === 'string' ? node.label : ''

  return labelCandidate
    .split(/\r?\n/g)
    .map(line => line.trim())
    .filter(Boolean)
}

function extractQuicktip(node: NsFlowNode): string | undefined {
  const quicktipCandidate = node.quicktip
  if (typeof quicktipCandidate !== 'string') {
    return undefined
  }

  const trimmed = quicktipCandidate.trim()
  return trimmed.length ? trimmed : undefined
}

function extractLinkPath(node: NsFlowNode): string | undefined {
  const pathCandidate = node.path
  if (typeof pathCandidate !== 'string') {
    return undefined
  }

  const trimmed = pathCandidate.trim()
  return trimmed.length ? trimmed : undefined
}

function resolveNodeType(node: NsFlowNode): NsFlowNodeType {
  if (NODE_TYPES.has(node.type as NsFlowNodeType)) {
    return node.type as NsFlowNodeType
  }
  return 'process'
}

function handleNodeActivate(node: LayoutNode): void {
  if (!node.isClickable || !node.linkPath) {
    return
  }

  void router.push(node.linkPath)
}

function getDecisionPoints(size: LayoutResult['nodeSize']): string {
  const halfWidth = size.width / 2
  const halfHeight = size.height / 2
  return `${halfWidth},0 ${size.width},${halfHeight} ${halfWidth},${size.height} 0,${halfHeight}`
}

function getCornerRadius(type: NsFlowNodeType, size: LayoutResult['nodeSize']): number {
  switch (type) {
    case 'start-end':
      return size.height / 2
    case 'link':
      return 18
    case 'task':
      return 12
    case 'process':
    default:
      return 12
  }
}

</script>

<style scoped>
.ns-flow {
  width: 100%;
}

.ns-flow__canvas {
  width: 100%;
}

.ns-flow__svg {
  width: 100%;
  height: auto;
  display: block;
}

.ns-flow__edges path {
  fill: none;
  stroke: var(--ion-color-primary, #1767d1);
  stroke-width: 2.4;
}

.ns-flow__edge {
  transition: stroke 0.2s ease-in-out;
}

.ns-flow__nodes {
  font-family: inherit;
}

.ns-flow__node {
  outline: none;
}

.ns-flow__node-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 12px;
  text-align: center;
  color: var(--ion-color-dark, #1f2633);
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.25;
}

.ns-flow__node-line {
  display: block;
}

.ns-flow__node-quicktip {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.9;
}

.ns-flow__node-shape {
  stroke-width: 1.5;
  stroke-linejoin: round;
}

.ns-flow__node--process .ns-flow__node-shape {
  fill: #1767d1;
  stroke: #0f4898;
}

.ns-flow__node--task .ns-flow__node-shape {
  fill: #ffe38a;
  stroke: #d9b246;
}

.ns-flow__node--start-end .ns-flow__node-shape {
  fill: #f8d34c;
  stroke: #c9a11f;
}

.ns-flow__node--decision .ns-flow__node-shape {
  fill: #f6c94c;
  stroke: #c5961b;
}

.ns-flow__node--link .ns-flow__node-shape {
  fill: #f2994a;
  stroke: #c06a18;
}

.ns-flow__node--process .ns-flow__node-body,
.ns-flow__node--link .ns-flow__node-body {
  color: #ffffff;
}

.ns-flow__node--clickable {
  cursor: pointer;
}

.ns-flow__node--clickable:focus-visible {
  outline: 2px solid var(--ion-color-primary, #1767d1);
  outline-offset: 4px;
}

.ns-flow__empty {
  width: 100%;
  padding: 36px 16px;
  text-align: center;
  color: var(--ion-color-medium, #666666);
  background: var(--ion-color-step-50, #f4f5f8);
  border-radius: 18px;
}

.ns-flow :deep(marker path) {
  fill: var(--ion-color-primary, #1767d1);
}

@media (prefers-color-scheme: dark) {
  .ns-flow__canvas {
    background: rgba(34, 40, 49, 0.6);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45);
  }

  .ns-flow__node--process .ns-flow__node-shape {
    fill: #1f4fbf;
    stroke: #122f7b;
  }

  .ns-flow__node--task .ns-flow__node-shape {
    fill: #d5b534;
    stroke: #9d8623;
  }

  .ns-flow__node--start-end .ns-flow__node-shape {
    fill: #d7b234;
    stroke: #9f8019;
  }

  .ns-flow__node--decision .ns-flow__node-shape {
    fill: #d1a934;
    stroke: #947519;
  }

  .ns-flow__node--link .ns-flow__node-shape {
    fill: #d87725;
    stroke: #9f5310;
  }

  .ns-flow__node-body {
    color: var(--ion-color-light, #f7f8fc);
  }

  .ns-flow__node--task .ns-flow__node-body,
  .ns-flow__node--start-end .ns-flow__node-body,
  .ns-flow__node--decision .ns-flow__node-body {
    color: #1f2633;
  }

  .ns-flow__edge {
    stroke: var(--ion-color-tertiary, #9ec5ff);
  }

  .ns-flow :deep(marker path) {
    fill: var(--ion-color-tertiary, #9ec5ff);
  }

  .ns-flow__empty {
    background: rgba(34, 40, 49, 0.6);
    color: rgba(255, 255, 255, 0.6);
  }
}

</style>

