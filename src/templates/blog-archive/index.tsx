import React from 'react'
import Layout from '../../components/layout'
import parse from 'html-react-parser'
import styled from '@emotion/styled'
import BlogPreview from '../../components/blog-preview'
import blog_icon from '../../images/blog_icon.png'
import { slice, concat } from 'lodash'
import Category from './category'
import AutoHelmet from '../../components/helmet'

const BlogWrapper = styled.div`
  margin-top: 5%;
  @media only screen and (min-width: 1025px) {
    display: flex;
    flex-flow: column;
    justify-self: center;
  }
  @media only screen and (max-width: 1024px) {
    width: 100%;
    grid-column: 1 / 4;
  }
`

const BlogOverviewHeaderContainer = styled.div`
  background-color: hsl(247, 69%, 15%);
  border-radius: 5px;
  max-width: 1400px;
  @media only screen and (min-width: 1025px) {
    margin: 0 -40px;
  }
  @media only screen and (max-width: 1024px) {
    margin: 0;
  }
  @media only screen and (max-width: 480px) {
    margin-top: 0;
    margin-bottom: 2rem;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`

const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`

const BlogOverviewHeaderInner = styled.div`
  /* padding: 3rem 7.375rem 15rem; */
  max-width: 920px;
  padding: 3rem 4rem 15rem;
  @media only screen and (max-width: 480px) {
    padding: 1.125rem 3.062rem;
  }
`

const BlogContainer = styled.div`
  max-width: 990px;
  /* margin: 0 auto; */
  display: grid;
  place-items: center;
  margin: 0 5rem;
  @media only screen and (max-width: 1024px) {
    margin: 0 1rem;
  }
  @media only screen and (max-width: 480px) {
    margin: 0 2rem;
  }
`

const BlogInnerContainer = styled.div`
  display: grid;
  @media only screen and (min-width: 769px) {
    grid-template-columns: repeat(3, 310px);
    grid-column-gap: 2rem;
    grid-row-gap: 3.75rem;
    transform: translateY(-180px);
    max-width: 100%;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 310px);
    grid-column-gap: 2rem;
    grid-row-gap: 3.75rem;
    transform: translateY(-180px);
    max-width: 100%;
  }
  @media only screen and (max-width: 480px) {
    grid-template-columns: 310px;
    grid-template-rows: auto;
    grid-row-gap: 2.5rem;
    margin-bottom: 1rem;
    transform: none;
  }
`
const ButtonContainer = styled.div`
  display: grid;
  place-items: center;
  transform: translateY(-80px);
  @media only screen and (max-width: 480px) {
    transform: none;
    padding-bottom: 2rem;
  }
`

const BlogArchive = (props) => {
  const {
    pageContext: {
      page: { title, blogOverviewACF },
      allPosts,
      categories,
    },
  } = props

  const DATA = [...allPosts]
  const LIMIT = 6
  const START_CAT = 'Alles'
  const NO_BLOGS_FOUND = 'Geen gerelateerde blogs gevonden.'

  const [showMore, setShowMore] = React.useState(DATA.length > 6 ? true : false)
  const [filteredList, setFilteredList] = React.useState(DATA)
  const [baseList, setBaseList] = React.useState(slice(DATA, 0, LIMIT))
  const [index, setIndex] = React.useState(LIMIT)
  const [selected, setSelected] = React.useState(START_CAT)

  const loadMore = () => {
    const newIndex = index + LIMIT
    const newShowMore = newIndex < filteredList.length + 1 - 1
    const newList = concat(baseList, slice(filteredList, index, newIndex))
    setIndex(newIndex)
    setBaseList(newList)
    setShowMore(newShowMore)
  }

  const filterCategory = (category) => {
    const filterBlogs = DATA.filter((blog) =>
      blog.categories.nodes.map((category) => category.id).includes(category.id)
    )
    const newShowMore = LIMIT < filterBlogs.length + 1 - 1
    setIndex(LIMIT)
    setBaseList(slice(filterBlogs, 0, LIMIT))
    setFilteredList(filterBlogs)
    setShowMore(newShowMore)
  }

  const filteredCategories = props.pageContext?.categories.nodes.filter(
    (data) => data.name != 'Featured' && data.name != 'Geen categorie'
  )

  const sortedCategories = filteredCategories.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase()

    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })

  return (
    <Layout>
      {props.pageContext ? (
        <>
          <AutoHelmet title={title} />
          <BlogWrapper>
            <BlogOverviewHeaderContainer>
              {/* <img src={blog_icon} alt="blog-icon" className="related-blog-icon" /> */}
              <BlogOverviewHeaderInner>
                <h1 className="blog-overview-header">
                  {parse(blogOverviewACF.blogOverviewHeader)}
                </h1>
                <OptionsContainer>
                  {sortedCategories &&
                    sortedCategories.map((category) => (
                      <div key={category.id} onClick={() => filterCategory(category)}>
                        <div onClick={() => setSelected(category.name)}>
                          <Category catData={category} selected={selected} />
                        </div>
                      </div>
                    ))}
                </OptionsContainer>
              </BlogOverviewHeaderInner>
            </BlogOverviewHeaderContainer>
            <BlogContainer>
              <BlogInnerContainer>
                {allPosts !== undefined || null ? (
                  baseList.length > 0 ? (
                    baseList.map((post) => <BlogPreview key={post.id} post={post} />)
                  ) : (
                    <pre style={{ color: 'white' }}>{NO_BLOGS_FOUND}</pre>
                  )
                ) : (
                  <pre style={{ color: 'white' }}>{NO_BLOGS_FOUND}</pre>
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
        </>
      ) : (
        <div>{NO_BLOGS_FOUND}</div>
      )}
    </Layout>
  )
}

export default BlogArchive
