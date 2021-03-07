import React from 'react'
import Layout from '../../components/layout'
import parse from 'html-react-parser'
import styled from '@emotion/styled'
import BlogPreview from '../../components/blog-preview'
import blog_icon from '../../images/blog_icon.png'
import { slice, concat } from 'lodash'

const BlogWrapper = styled.div`
  /* margin-bottom: 10%; */
`

const BlogOverviewHeaderContainer = styled.div`
  background-color: hsl(247, 69%, 15%);
  border-radius: 5px;
  margin-top: 10%;
  @media only screen and (max-width: 414px) {
    margin-top: 0;
    margin-bottom: 2rem;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`

const BlogOverviewHeaderInner = styled.div`
  padding: 3rem 7.375rem 15rem;
  @media only screen and (max-width: 414px) {
    padding: 1.125rem 3.062rem;
  }
`

const BlogContainer = styled.div`
  max-width: 990px;
  margin: 0 auto;
  @media only screen and (max-width: 414px) {
    margin: 0 2rem;
  }
`

const BlogInnerContainer = styled.div`
  display: grid;
  @media only screen and (min-width: 416px) {
    grid-template-columns: repeat(3, auto);
    grid-column-gap: 2rem;
    grid-row-gap: 3.75rem;
    min-height: calc(100vh - 100px);
    transform: translateY(-180px);
    max-width: 100%;
  }
  @media only screen and (max-width: 414px) {
    grid-template-rows: auto;
    grid-row-gap: 2.5rem;
    margin-bottom: 1rem;
  }
`
const ButtonContainer = styled.div`
  display: grid;
  place-items: center;
  transform: translateY(-80px);
  @media only screen and (max-width: 414px) {
    transform: none;
    padding-bottom: 2rem;
  }
`

const BlogArchive = (props) => {
  const {
    pageContext: {
      page: { blogOverviewACF },
      allPosts,
    },
  } = props

  const LENGTH = allPosts.length + 1
  const DATA = [...allPosts]
  const LIMIT = 6

  const [showMore, setShowMore] = React.useState(true)
  const [list, setList] = React.useState(slice(DATA, 0, LIMIT))
  const [index, setIndex] = React.useState(LIMIT)

  const loadMore = () => {
    const newIndex = index + LIMIT
    const newShowMore = newIndex < LENGTH - 1
    const newList = concat(list, slice(DATA, index, newIndex))
    setIndex(newIndex)
    setList(newList)
    setShowMore(newShowMore)
  }

  return (
    <Layout>
      {props.pageContext ? (
        <BlogWrapper>
          <BlogOverviewHeaderContainer>
            {/* <img src={blog_icon} alt="blog-icon" className="related-blog-icon" /> */}
            <BlogOverviewHeaderInner>
              <h1 className="blog-overview-header">{parse(blogOverviewACF.blogOverviewHeader)}</h1>
            </BlogOverviewHeaderInner>
          </BlogOverviewHeaderContainer>
          <BlogContainer>
            <BlogInnerContainer>
              {allPosts !== undefined || null ? (
                list.map((post) => <BlogPreview post={post} />)
              ) : (
                <pre style={{ color: 'white' }}>No related blog items found.</pre>
              )}
            </BlogInnerContainer>
            <ButtonContainer>
              {showMore && (
                <div className="lees-verder-button" onClick={loadMore}>
                  <span style={{ cursor: 'pointer' }} className="lees-verder-link">
                    Laad meer
                  </span>
                </div>
              )}
            </ButtonContainer>
          </BlogContainer>
        </BlogWrapper>
      ) : (
        <div>Something went wrong</div>
      )}
    </Layout>
  )
}

export default BlogArchive
