import { optimize } from 'svgo';


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
    dropGroupMetaData,
    'minifyStyles',
    'collapseGroups',
    'removeUselessDefs',
  ]
};
