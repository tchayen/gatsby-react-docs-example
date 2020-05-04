export const extractFileList = files =>
  files.edges
    .filter(edge => !!edge.node.fields)
    .map(edge => ({
      name: edge.node.fields.doc.displayName,
      slug: edge.node.fields.slug,
    }))
