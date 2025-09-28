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
import Elk, { type ElkEdge, type ElkNode } from 'elkjs/lib/elk.bundled.js'
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

type ElkLayoutChild = ElkNode & { id?: string; x?: number; y?: number }
interface ElkPointLike {
  x: number
  y: number
}
interface ElkSectionLike {
  startPoint?: ElkPointLike
  endPoint?: ElkPointLike
  bendPoints?: ElkPointLike[]
}
type ElkLayoutEdge = ElkEdge & { id?: string; sections?: ElkSectionLike[] }
type ElkLayoutGraph = ElkNode & {
  children?: ElkLayoutChild[]
  edges?: ElkLayoutEdge[]
  width?: number
  height?: number
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
const elk = new Elk()
let resizeObserver: ResizeObserver | undefined
let layoutToken = 0

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

  const nodeSize = { width: 220, height: 92 }
  const columnSpacing = 120
  const rowSpacing = 40
  const paddingX = 32
  const paddingY = 32
  const nodes = props.flow.nodes
  const edges = props.flow.edges ?? []

  const orientation = determineDirection(containerSize.value)
  const nodeMap = new Map(nodes.map(node => [node.id, node]))
  const edgeMap = new Map<string, NsFlowEdge>()

  const elkGraph: ElkNode = {
    id: 'ns-flow',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': orientation,
      'elk.layered.spacing.nodeNodeBetweenLayers': `${columnSpacing}`,
      'elk.spacing.nodeNode': `${rowSpacing}`,
      'elk.padding': `[${paddingY}, ${paddingX}, ${paddingY}, ${paddingX}]`,
      'elk.edgeRouting': 'POLYLINE',
      'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
      'elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF',
      'elk.layered.compaction.postCompaction.enabled': 'true',
    },
    children: nodes.map(node => ({
      id: node.id,
      width: nodeSize.width,
      height: nodeSize.height,
    })),
    edges: edges
      .filter(edge => nodeMap.has(edge.source) && nodeMap.has(edge.target))
      .map((edge, index) => {
        const id = edge.id ?? `${edge.source}-${edge.target}-${index}`
        edgeMap.set(id, edge)
        return {
          id,
          sources: [edge.source],
          targets: [edge.target],
        } satisfies ElkEdge
      }),
  }

  let elkResult: ElkLayoutGraph
  try {
    elkResult = await elk.layout(elkGraph)
  } catch (error) {
    console.warn('Failed to compute ELK layout. Falling back to static layout.', error)
    return { ...fallback }
  }

  const layoutNodes: LayoutNode[] = []
  for (const child of elkResult.children ?? []) {
    const original = child.id ? nodeMap.get(child.id) : undefined
    if (!original) {
      continue
    }
    const nodeType = resolveNodeType(original)
    const quicktip = extractQuicktip(original)
    const linkPath = extractLinkPath(original)
    const isClickable = nodeType === 'link' && typeof linkPath === 'string'

    layoutNodes.push({
      ...original,
      x: child.x ?? 0,
      y: child.y ?? 0,
      column: 0,
      row: 0,
      lines: extractLines(original),
      nodeType,
      quicktip,
      linkPath,
      isClickable,
    })
  }

  assignGridCoordinates(layoutNodes, orientation, nodeSize)

  const layoutEdges: LayoutEdge[] = []
  for (const edgeLayout of elkResult.edges ?? []) {
    const edgeId = edgeLayout.id ?? ''
    const originalEdge = edgeMap.get(edgeId)
    if (!originalEdge) {
      continue
    }
    const path = buildEdgePath(edgeLayout)
    if (!path) {
      continue
    }
    layoutEdges.push({
      ...originalEdge,
      id: edgeId,
      path,
    })
  }

  const width = elkResult.width ?? fallback.width
  const height = elkResult.height ?? fallback.height
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

function determineDirection(size: { width: number; height: number }): 'DOWN' | 'RIGHT' {
  const { width, height } = size
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return 'DOWN'
  }

  const aspectRatio = width / height
  return aspectRatio >= 1.35 ? 'RIGHT' : 'DOWN'
}

function assignGridCoordinates(
  nodes: LayoutNode[],
  orientation: 'DOWN' | 'RIGHT',
  nodeSize: { width: number; height: number }
): void {
  if (!nodes.length) {
    return
  }

  if (orientation === 'DOWN') {
    const columns: LayoutNode[][] = []
    const sorted = [...nodes].sort((a, b) => (a.x - b.x) || (a.y - b.y))
    const threshold = nodeSize.width / 2

    for (const node of sorted) {
      let columnIndex = columns.findIndex(column => Math.abs(column[0].x - node.x) <= threshold)
      if (columnIndex === -1) {
        columnIndex = columns.length
        columns[columnIndex] = []
      }
      node.column = columnIndex
      columns[columnIndex].push(node)
    }

    columns.forEach(column => {
      column.sort((a, b) => a.y - b.y)
      column.forEach((node, index) => {
        node.row = index
      })
    })
  } else {
    const rows: LayoutNode[][] = []
    const sorted = [...nodes].sort((a, b) => (a.y - b.y) || (a.x - b.x))
    const threshold = nodeSize.height / 2

    for (const node of sorted) {
      let rowIndex = rows.findIndex(row => Math.abs(row[0].y - node.y) <= threshold)
      if (rowIndex === -1) {
        rowIndex = rows.length
        rows[rowIndex] = []
      }
      node.row = rowIndex
      rows[rowIndex].push(node)
    }

    rows.forEach(row => {
      row.sort((a, b) => a.x - b.x)
      row.forEach((node, index) => {
        node.column = index
      })
    })
  }
}

function buildEdgePath(edge: ElkLayoutEdge): string | undefined {
  const sections = edge.sections ?? []
  const pathSegments: string[] = []

  for (const section of sections) {
    const points = [section.startPoint, ...(section.bendPoints ?? []), section.endPoint].filter(
      Boolean
    ) as Array<{ x: number; y: number }>

    if (!points.length) {
      continue
    }

    const segment = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${round(point.x)} ${round(point.y)}`)
      .join(' ')
    if (segment) {
      pathSegments.push(segment)
    }
  }

  if (!pathSegments.length) {
    return undefined
  }

  return pathSegments.join(' ')
}

function round(value: number): string {
  return Number(value.toFixed(2)).toString()
}

function extractLines(node: NsFlowNode): string[] {
  const labelCandidate = typeof node.data?.label === 'string'
    ? node.data.label
    : typeof node.label === 'string'
      ? node.label
      : ''

  return labelCandidate
    .split(/\r?\n/g)
    .map(line => line.trim())
    .filter(Boolean)
}

function extractQuicktip(node: NsFlowNode): string | undefined {
  const quicktipCandidate = node.data?.quicktip
  if (typeof quicktipCandidate !== 'string') {
    return undefined
  }

  const trimmed = quicktipCandidate.trim()
  return trimmed.length ? trimmed : undefined
}

function extractLinkPath(node: NsFlowNode): string | undefined {
  const pathCandidate = node.data?.path
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

