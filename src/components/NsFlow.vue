<template>
  <div class="ns-flow">
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
            class="ns-flow__node"
            :transform="`translate(${node.x}, ${node.y})`"
          >
            <rect
              class="ns-flow__node-box"
              :width="layout.nodeSize.width"
              :height="layout.nodeSize.height"
              rx="14"
              ry="14"
            />
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
import { computed } from 'vue'

import type { NsFlowData, NsFlowEdge, NsFlowNode } from '@/types/flow'

const props = defineProps<{ flow: NsFlowData }>()

interface LayoutNode extends NsFlowNode {
  x: number
  y: number
  column: number
  row: number
  lines: string[]
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

const layout = computed<LayoutResult>(() => {
  const fallback: LayoutResult = {
    nodes: [],
    edges: [],
    width: 320,
    height: 240,
    aspectRatio: 320 / 240,
    nodeSize: { width: 220, height: 92 },
  }

  if (!props.flow || !props.flow.nodes?.length) {
    return fallback
  }

  const nodeSize = {
    width: 220,
    height: 92,
  }
  const columnSpacing = 120
  const rowSpacing = 40
  const paddingX = 32
  const paddingY = 32

  const nodes = props.flow.nodes
  const edges = props.flow.edges ?? []

  const nodeMap = new Map(nodes.map(node => [node.id, node]))
  const adjacency = new Map<string, string[]>(nodes.map(node => [node.id, []]))
  const indegree = new Map<string, number>(nodes.map(node => [node.id, 0]))

  for (const edge of edges) {
    if (!nodeMap.has(edge.source) || !nodeMap.has(edge.target)) {
      continue
    }
    adjacency.get(edge.source)?.push(edge.target)
    indegree.set(edge.target, (indegree.get(edge.target) ?? 0) + 1)
  }

  const queue: string[] = []
  const levels = new Map<string, number>()
  const visited = new Set<string>()

  for (const [id, count] of indegree) {
    if (count === 0) {
      queue.push(id)
      levels.set(id, 0)
    }
  }

  while (queue.length) {
    const current = queue.shift() as string
    visited.add(current)
    const currentLevel = levels.get(current) ?? 0
    const targets = adjacency.get(current) ?? []

    for (const target of targets) {
      const nextLevel = currentLevel + 1
      levels.set(target, Math.max(levels.get(target) ?? 0, nextLevel))

      const nextIndegree = (indegree.get(target) ?? 1) - 1
      indegree.set(target, nextIndegree)
      if (nextIndegree === 0) {
        queue.push(target)
      }
    }
  }

  // Ensure cyclic nodes still receive a column by appending them after traversal.
  const maxAssignedLevel = Math.max(0, ...Array.from(levels.values()))
  for (const node of nodes) {
    if (!levels.has(node.id)) {
      levels.set(node.id, maxAssignedLevel)
    }
  }

  const columns = new Map<number, LayoutNode[]>()
  let maxColumnHeight = 0

  for (const node of nodes) {
    const column = levels.get(node.id) ?? 0
    const columnNodes = columns.get(column) ?? []
    columns.set(column, columnNodes)
    columnNodes.push({
      ...node,
      x: 0,
      y: 0,
      column,
      row: 0,
      lines: extractLines(node),
    })
  }

  const columnEntries = Array.from(columns.entries()).sort((a, b) => a[0] - b[0])
  const columnCount = columnEntries.length

  for (const [, columnNodes] of columnEntries) {
    const columnHeight = columnNodes.length * nodeSize.height + Math.max(0, columnNodes.length - 1) * rowSpacing
    maxColumnHeight = Math.max(maxColumnHeight, columnHeight)
  }

  const layoutWidth = paddingX * 2 + columnCount * nodeSize.width + Math.max(0, columnCount - 1) * columnSpacing
  const contentHeight = Math.max(nodeSize.height, maxColumnHeight)
  const layoutHeight = paddingY * 2 + contentHeight

  for (const [columnIndex, columnNodes] of columnEntries) {
    const columnHeight = columnNodes.length * nodeSize.height + Math.max(0, columnNodes.length - 1) * rowSpacing
    const offsetY = paddingY + (contentHeight - columnHeight) / 2
    columnNodes.forEach((node, nodeIndex) => {
      node.row = nodeIndex
      node.x = paddingX + columnIndex * (nodeSize.width + columnSpacing)
      node.y = offsetY + nodeIndex * (nodeSize.height + rowSpacing)
    })
  }

  const layoutNodes = columnEntries.flatMap(([, columnNodes]) => columnNodes)

  const layoutEdges: LayoutEdge[] = []
  for (const edge of edges) {
    const source = layoutNodes.find(node => node.id === edge.source)
    const target = layoutNodes.find(node => node.id === edge.target)
    if (!source || !target) {
      continue
    }
    const startX = source.x + nodeSize.width
    const startY = source.y + nodeSize.height / 2
    const endX = target.x
    const endY = target.y + nodeSize.height / 2
    const controlX = startX + (endX - startX) / 2
    const path = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`

    layoutEdges.push({
      ...edge,
      id: edge.id ?? `${edge.source}-${edge.target}`,
      path,
    })
  }

  const aspectRatio = layoutWidth / layoutHeight

  return {
    nodes: layoutNodes,
    edges: layoutEdges,
    width: layoutWidth,
    height: layoutHeight,
    aspectRatio: Number.isFinite(aspectRatio) && aspectRatio > 0 ? aspectRatio : fallback.aspectRatio,
    nodeSize,
  }
})

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

.ns-flow__node-box {
  fill: var(--ion-color-light, #ffffff);
  stroke: rgba(0, 0, 0, 0.08);
  stroke-width: 1.5;
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

  .ns-flow__node-box {
    fill: rgba(20, 24, 32, 0.85);
    stroke: rgba(255, 255, 255, 0.08);
  }

  .ns-flow__node-body {
    color: var(--ion-color-light, #f7f8fc);
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

