const path = require("path")
const { parse } = require("react-docgen")
const dashify = require("dashify")

exports.onCreateNode = async ({ node, actions, loadNodeContent }) => {
  const { createNodeField } = actions

  if (node.extension === "tsx") {
    const content = await loadNodeContent(node)
    const { description, displayName, props } = parse(content, null, null, {
      filename: node.relativePath,
    })

    const arrayProps = Object.keys(props).map(key => ({
      name: key,
      ...props[key],
    }))

    const value = {
      description,
      displayName,
      props: arrayProps,
    }

    createNodeField({
      name: "doc",
      node,
      value,
    })

    createNodeField({
      name: "slug",
      node,
      value: `docs/${dashify(displayName)}`,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allFile {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const docs = result.data.allFile.edges.filter(edge => !!edge.node.fields)

  docs.forEach(({ node }) => {
    console.log("createPage", node.fields.slug)
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/doc-layout.js`),
      context: { id: node.id },
    })
  })
}
