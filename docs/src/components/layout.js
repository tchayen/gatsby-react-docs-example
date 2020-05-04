import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Sidebar from "./Sidebar"
import { extractFileList } from "./utils"

import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
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
  `)

  const files = extractFileList(data.allFile)

  return (
    <div style={{ display: `flex`, minHeight: `100vh` }}>
      <Sidebar files={files} />
      <main>{children}</main>
    </div>
  )
}

export default Layout
