export type NsFlowNodeType = 'start-end' | 'decision' | 'process' | 'task' | 'link'

export interface NsFlowNode {
  id: string
  type?: NsFlowNodeType
  label?: string
  quicktip?: string
  path?: string
  /**
   * Optional column index used for grid based layouts.
   */
  column?: number
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
  /**
   * Desired number of virtual columns for the layout.
   */
  columns?: number
}

