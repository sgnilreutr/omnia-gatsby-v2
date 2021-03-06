import React from 'react'
import Layout from '../../components/layout'
import parse from 'html-react-parser'
import styled from '@emotion/styled'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import AutoHelmet from '../../components/helmet'

const ContactWrapper = styled.div`
  margin-bottom: 5%;
  max-width: 1240px;
  justify-self: center;
  @media only screen and (max-width: 1024px) {
    width: 100%;
    grid-column: 1 / 4;
  }
  @media only screen and (max-width: 480px) {
    margin-bottom: 0;
    background-color: hsl(247, 69%, 15%);
  }
`

const DesktopWrapper = styled.div`
  @media only screen and (max-width: 480px) {
    display: none;
  }
`

const MobileWrapper = styled.div`
  @media only screen and (min-width: 481px) {
    display: none;
  }
`

const ContactHeaderContainer = styled.div`
  background-color: hsl(247, 69%, 15%);
  border-radius: 5px;
  margin-top: 10%;
  @media only screen and (max-width: 480px) {
    background-color: transparent;
    margin-top: 0;
  }
`

const ContactHeaderInner = styled.div`
  display: flex;
  flex-flow: row;
  @media only screen and (max-width: 480px) {
    flex-flow: column;
  }
`

const HeroMobileContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  place-content: center;
  background-color: inherit;
`

const ContactHeaderContent = styled.div`
  @media only screen and (min-width: 481px) {
    height: 425px;
    max-width: 920px;
    padding: 3rem 4rem 1rem;
  }
  @media only screen and (min-width: 1025px) {
    margin: 0 auto;
    padding: 2rem 13rem;
  }
`

const Homepage = (props) => {
  const {
    pageContext: {
      page: { title, uri, content, contactACF },
    },
  } = props

  const gMapsImage = {
    img: contactACF?.contactGmaps?.localFile?.childImageSharp?.gatsbyImageData,
    alt: contactACF?.contactGmaps?.altText || `google-maps-location`,
  }

  return (
    <Layout>
      {props.pageContext ? (
        <>
          <AutoHelmet title={title} />
          <ContactWrapper>
            <DesktopWrapper>
              <ContactHeaderContainer>
                <ContactHeaderContent>
                  <h1 className="contact-header">{parse(contactACF.contactHeader)}</h1>
                  <ContactHeaderInner>
                    {gMapsImage.img !== undefined || null ? (
                      <GatsbyImage
                        image={gMapsImage.img}
                        alt={gMapsImage.alt}
                        className="contact-location-image"
                      />
                    ) : (
                      <StaticImage
                        src="../../images/featured_blog_placeholder.png"
                        alt="placeholder"
                        className="contact-location-image"
                      />
                    )}
                    <div className="contact-body-text">{parse(content)}</div>
                  </ContactHeaderInner>
                </ContactHeaderContent>
              </ContactHeaderContainer>
            </DesktopWrapper>

            <MobileWrapper>
              <ContactHeaderContainer>
                <ContactHeaderContent>
                  <ContactHeaderInner>
                    <HeroMobileContainer>
                      {gMapsImage.img !== undefined || null ? (
                        <GatsbyImage
                          image={gMapsImage.img}
                          alt={gMapsImage.alt}
                          className="contact-location-image"
                        />
                      ) : (
                        <StaticImage
                          src="../../images/featured_blog_placeholder.png"
                          alt="placeholder"
                          className="contact-location-image"
                        />
                      )}
                    </HeroMobileContainer>
                    <h1 className="contact-header">{parse(contactACF.contactHeader)}</h1>
                    <div className="contact-body-text">{parse(content)}</div>
                  </ContactHeaderInner>
                </ContactHeaderContent>
              </ContactHeaderContainer>
            </MobileWrapper>
          </ContactWrapper>
        </>
      ) : (
        <div>Something went wrong</div>
      )}
    </Layout>
  )
}

export default Homepage
