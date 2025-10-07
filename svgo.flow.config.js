import { optimize } from 'svgo';

/** Map known Draw.io colors → CSS variables */
const COLORMAP = new Map([
  ['#000', 'var(--color)'],
  ['#fff', 'var(--background)'],
  ['#dae8fc', 'var(--ns-flow-process)'],
  ['#6c8ebf', 'var(--ns-flow-process-border)'],
  ['#d5e8d4', 'var(--ns-flow-saa)'],
  ['#82b366', 'var(--ns-flow-saa-border)'],
]);

const NodesToNeutralize = new Set([
  'path','rect','circle','ellipse','polygon','polyline','line','use'
]);
const NodesToColorMap = new Set([
  'div', 'path', 'rect'
]);


// #region color-mapping

const parseStyle = (style) => {
  const obj = {};
  if (!style) return obj;
  style.split(';').forEach(s => {
    const i = s.indexOf(':');
    if (i < 0) return;
    const k = s.slice(0, i).trim();
    const v = s.slice(i + 1).trim();
    if (k) obj[k] = v;
  });
  return obj;
};

const isSkippable = (v) =>
  !v ||
  v === 'none' ||
  v === 'transparent' ||
  v === 'currentColor' ||
  /^url\(/i.test(v) ||
  /^var\(/i.test(v);

const mapColor = (v) => {
  if (isSkippable(v)) return v;
  const key = v.toLowerCase();
  return COLORMAP.get(key) || v;
};

const styleToString = (obj) =>
  Object.entries(obj).map(([k, v]) => `${k}:${v}`).join(';');


// #endregion

const mapColorsToCssVars = {
  name: 'mapColorsToCssVars',
  type: 'visitor',
  fn: (root, params) => {
    const allowed = NodesToColorMap
    return {
      element: {
        enter(node) {
          if (!allowed.has(node.name)) return;
          const a = node.attributes || {};
          if (!a.style) return;

          const o = parseStyle(a.style);
          if (o.fill)           o.fill = mapColor(o.fill);
          if (o.stroke)         o.stroke = mapColor(o.stroke);
          if (o.color)          o.color = mapColor(o.color);
          if (o['stop-color'])  o['stop-color'] = mapColor(o['stop-color']);
          if (o['background-color'])  o['background-color'] = mapColor(o['background-color']);
          a.style = styleToString(o);
        }
      }
    };
  }
};

/** Plugin: drop background rect that just covers 100% with white/var */
const dropFullBackgroundRect = {
  name: 'dropFullBackgroundRect',
  type: 'visitor',
  fn: () => ({
    element: {
      enter: (node, parentNode) => {
        if (!parentNode || parentNode.name !== 'svg' || node.name !== 'rect') return;

        const a = node.attributes || {};
        const x = a.x ?? '0';
        const y = a.y ?? '0';
        const w = a.width;
        const h = a.height;

        // consider it "just background" if fill is absent/none/transparent
        const bgFill = !a.fill || a.fill === 'transparent';

        // match 100% x 100% at (0,0)
        let isFull =
          w === '100%' && h === '100%' && x === '0' && y === '0';

        if (isFull && bgFill) {
          console.log('removed bg-rect');
          // actually remove the node
          parentNode.children = parentNode.children.filter((child) => child !== node);
        }
      }
    }
  })
};


const dropGroupMetaData = {
  name: 'dropGroupMetaData',
  type: 'visitor',
  fn: () => ({
    element: {
      enter: (node, parentNode) => {
        if (node.attributes?.['data-cell-id']) {
          delete node.attributes['data-cell-id'];
        }
      }
    }
  })
}

const neutralizePaintAttrs = {
  name: 'neutralizePaintAttrs',
  type: 'visitor',
  fn: (root, params) => {
    const onlyIfMissing = false;
    const allowed = NodesToNeutralize
    return {
      element: {
        enter(node) {
          if (!allowed.has(node.name)) return;
          const a = node.attributes || {};

          if (onlyIfMissing) {
            if (a.fill == null)   node.attributes.fill   = 'transparent';
            if (a.stroke == null) node.attributes.stroke = 'transparent';
          } else {
            node.attributes.fill   = 'transparent';
            node.attributes.stroke = 'transparent';
          }
        }
      }
    };
  }
};

const dropTextFallback = {
  name: 'dropTextFallback',
  type: 'visitor',
  fn: () => ({
    element: {
      enter(node, parent) {
        if (node.name === 'switch') {
          const fo = node.children.find(c => c.type === 'element' && c.name === 'foreignObject');
          if (fo && parent) {
            const idx = parent.children.indexOf(node);
            parent.children.splice(idx, 1, fo);
          }
        }
      }
    }
  })
};

const dropSvgStyle = {
  name: 'dropSvgStyle',
  type: 'visitor',
  fn: () => ({
    element: {
      enter(node) {
        if (node.name === 'svg' && node.attributes?.style) {
          delete node.attributes.style;
        }
      }
    }
  })
};

export default {
  multipass: true,
  js2svg: { pretty: true, indent: 2 },
  // Built-in plugins + our custom ones
  plugins: [
    'removeDoctype',
    'removeXMLProcInst',
    'cleanupAttrs',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'removeHiddenElems',
    'removeEmptyText',
    'removeEmptyContainers',

    dropFullBackgroundRect,
    neutralizePaintAttrs,
    dropGroupMetaData,
    dropTextFallback,
    dropSvgStyle,

    'minifyStyles',
    mapColorsToCssVars,

    'collapseGroups',
    'removeUselessDefs',
  ]
};
