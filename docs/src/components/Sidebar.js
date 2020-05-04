import React from "react"
import { Link } from "gatsby"

const PADDING = 40

const Sidebar = ({ files, currentName }) => (
  <ul
    style={{
      marginLeft: 0,
      backgroundColor: `#eee`,
      listStyleType: `none`,
      paddingLeft: `${PADDING}px`,
      paddingRight: `${PADDING}px`,
      paddingTop: `${PADDING}px`,
    }}
  >
    {files.map(file => (
      <li key={file.slug}>
        <Link
          to={`/${file.slug}`}
          style={{
            textDecoration: `none`,
            color: file.name === currentName ? `#000` : `#666`,
          }}
        >
          {file.name}
        </Link>
      </li>
    ))}
  </ul>
)

export default Sidebar
