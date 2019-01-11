import React from 'react'
import styled from 'styled-components'
import { Link, StaticQuery, graphql } from 'gatsby'

const LISTING_QUERY = graphql`
    query BlogPostListing {
        allMarkdownRemark (limit: 10, sort: {
        order: DESC,
        fields: [frontmatter___date]
    }) {
        edges {
            node {
            excerpt
            frontmatter {
                date (formatString: "MMMM DD, YYYY")
                title
                slug
            }
            }
        }
        }
    }
`

const Post = styled.article`
    box-shadow: 0px 3px 10px rgba(25,17,34,0.05);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    a {
        color: #000;
        text-decoration: none;
    }
    h2 {
        margin-bottom: 0px;
    }
    p {
        font-size: 0.8rem
    }
    .readmore {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 0.8rem;
        text-decoration: underline;
        color: blue;
    }
`

const Listing = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({allMarkdownRemark}) => (
        allMarkdownRemark.edges.map(edge => (
            <Post key={edge.node.frontmatter.slug}>
                <Link to={`/posts${edge.node.frontmatter.slug}`}>
                    <h2>{edge.node.frontmatter.title}</h2>
                </Link>
                <p>{edge.node.frontmatter.date}</p>
                <p>
                    {edge.node.excerpt}
                </p>
                <Link className="readmore" to={`/posts${edge.node.frontmatter.slug}`}>read more</Link>
            </Post>
        ))
    )}
  />
)



export default Listing
