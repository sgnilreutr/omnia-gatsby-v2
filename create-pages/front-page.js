const { slash }         = require( `gatsby-core-utils` );
const frontPageTemplate = require.resolve( `../src/templates/front-page/index.tsx` );
// const singleProductPageTemplate = require.resolve( `../src/templates/product/index.js` );
// const { ProductsFragment } = require('./fragments/products/index.js');
// const { SeoFragment } = require('./fragments/seo/index.js');
// const { HomepageFragment } = require('./fragments/pages/index.js');

// Get all the front page data.
const GET_FRONT_PAGE = `
query GET_FRONT_PAGE {
  page: wpPage(slug: {eq: "homepage"}) {
    id
    title
    uri
    homepageACF {
      heroHeader
      heroSubtext
      heroSubHeader
      servicesContent
      servicesContent1
      servicesHeader
      uspHeader
      servicesImage {
        sourceUrl
      }
    }
  }
}
`;

module.exports = async ( { actions, graphql } ) => {

	const { createPage } = actions;

	const fetchPosts = async () => {

		// Do query to get home page data.
		return await graphql( GET_FRONT_PAGE )
			.then(({ data }) => {
				
                const { page } = data;
                
				return {  page: page };
			} );


	};

	// When the above fetchPosts is resolved, then create page and pass the data as pageContext to the page template.
	await fetchPosts().then( ( { page } ) => {
		createPage( {
			// path: `/`,
			path: page.uri,
			component: slash( frontPageTemplate ),
			context: {
				page
			},
		},
		);
	} )

};