import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import parse from 'html-react-parser'
import blog_icon from '../../images/blog_icon.png'
import { getFeaturedImageUrl } from '../../utils/functions'

const RelatedBlogWrapper = styled.div`
  display: flex;
  flex-flow: column;
  background-color: hsl(264, 71%, 43%);
  border-radius: 5px;
  margin-bottom: 200px;
`

const RelatedBlogInner = styled.div`
  margin: 4rem 7.375rem 10rem;
  display: flex;
  flex-flow: row;
`

const BlogInnerContainer = styled.div`
  display: flex;
  flex-flow: row;
`

const BlogItem = styled.div`
  max-width: 550px;
  margin-left: 48px;
  margin-top: 100px;
`

const RelatedBlogs = ({ id }) => {
  const currentBlogUri = `"${id}"`
  console.log(currentBlogUri)
  // console.log(id)

  const { wpPost } = useStaticQuery(graphql`
    query OTHER_POSTS {
      allWpPost(limit: 4) {
        nodes {
          id
          title
          uri
          slug
          blogPreview {
            blogPreview
          }
          featuredImage {
            node {
              localFile {
                url
              }
            }
          }
        }
      }
    }
  `)
  console.log(wpPost)

  return (
    <>
      {wpPost !== null ? (
        <RelatedBlogWrapper className="related-blog-wrapper">
          <div style={{ margin: `4rem 7.375rem 10rem` }}>
            <div style={{ display: `flex`, flexFlow: `row` }}>
              <h2 className="related-blog-header">
                Dit vindt je misschien <br /> ook interessant
              </h2>
              <img src={blog_icon} alt="blog-icon" className="related-blog-icon" />
            </div>
            <BlogInnerContainer>
              {wpPost !== undefined ? (
                <p>Test</p>
              ) : (
                <pre style={{ color: 'white' }}>No related blog items found.</pre>
              )}
            </BlogInnerContainer>
          </div>
        </RelatedBlogWrapper>
      ) : (
        <pre style={{ color: 'darkred' }}>This component has not loaded succesfully.</pre>
      )}
    </>
  )
}

export default RelatedBlogs
