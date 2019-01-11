import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'

const ArchiveList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    a {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 0.8rem;
        text-decoration: underline;
        color: blue;
    }
`

const POST_ARCHIVE_QUERY = graphql`
    query BlogPostArchive {
        allMarkdownRemark (limit: 2, sort: {
            order: DESC,
            fields: [frontmatter___date]
          }) {
        totalCount
        edges {
            node {
            frontmatter {
                title
                slug
            }
            }
        }
        }
    }
`

const Archive = () => (
  <StaticQuery
    query={POST_ARCHIVE_QUERY}
    render={({allMarkdownRemark}) => (
      <>
        <aside>
            <h3>Archive</h3>
            <ArchiveList>
            {allMarkdownRemark.edges.map(edge => (
                <li key={edge.node.frontmatter.slug}>
                    <Link to={`/posts${edge.node.frontmatter.slug}`}>{edge.node.frontmatter.title}</Link>
                </li>
            ))}
            </ArchiveList>
        </aside>
      </>
    )}
  />
)

export default Archive
