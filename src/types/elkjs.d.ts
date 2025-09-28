declare module 'elkjs/lib/elk.bundled.js' {
  export interface ElkNode {
    id?: string
    width?: number
    height?: number
    children?: ElkNode[]
    edges?: ElkEdge[]
    layoutOptions?: Record<string, unknown>
    [key: string]: unknown
  }

  export interface ElkEdge {
    id?: string
    sources?: string[]
    targets?: string[]
    sections?: Array<{
      startPoint?: { x: number; y: number }
      endPoint?: { x: number; y: number }
      bendPoints?: Array<{ x: number; y: number }>
    }>
    [key: string]: unknown
  }

  export default class Elk {
    constructor(options?: Record<string, unknown>)
    layout<T extends ElkNode>(graph: T): Promise<T>
  }
}
