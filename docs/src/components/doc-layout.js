import React, { Fragment } from "react"
import { graphql } from "gatsby"
import Sidebar from "./Sidebar"
import { extractFileList } from "./utils"

const PADDING = 40

export default function PageTemplate({ data: { file, allFile } }) {
  const {
    fields: { doc },
  } = file

  const otherFiles = extractFileList(allFile)

  return (
    <div style={{ display: `flex`, minHeight: `100vh` }}>
      <Sidebar currentName={doc.displayName} files={otherFiles} />
      <div style={{ paddingLeft: `${PADDING}px`, paddingTop: `${PADDING}px` }}>
        <h1>{doc.displayName}</h1>
        <p>{doc.description}</p>
        <h2>Props</h2>
        {doc.props.map(prop => (
          <Fragment key={prop.name}>
            <h3>{prop.name}</h3>
            <p>{prop.description}</p>
            <ul>
              <li>
                <strong>type</strong>{" "}
                <code>{prop.tsType.raw || prop.tsType.name}</code>
              </li>
              {prop.required && (
                <li>
                  <strong>Required</strong>
                </li>
              )}
            </ul>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($id: String) {
    file(id: { eq: $id }) {
      fields {
        slug
        doc {
          description
          displayName
          props {
            name
            description
            required
            tsType {
              raw
              name
            }
          }
        }
      }
    }
    allFile {
      edges {
        node {
          id
          fields {
            slug
            doc {
              displayName
            }
          }
        }
      }
    }
  }
`
