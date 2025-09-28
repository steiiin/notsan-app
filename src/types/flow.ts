export interface NsFlowNode {
  id: string
  /**
   * Optional payload compatible with VueFlow default nodes.
   */
  data?: Record<string, unknown>
  /**
   * Convenience label if no data.label is supplied.
   */
  label?: string
  width?: number
  height?: number
}

export interface NsFlowEdge {
  id?: string
  source: string
  target: string
  label?: string
}

export interface NsFlowData {
  nodes: NsFlowNode[]
  edges: NsFlowEdge[]
}

