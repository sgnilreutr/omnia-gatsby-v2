const { slash }         = require( `gatsby-core-utils` );
const dienstenTemplate = require.resolve( `../src/templates/diensten/index.tsx` );
// const { SeoFragment } = require('./fragments/seo/index.js');

// Get all the services page data.
const GET_DIENSTEN_PAGE = `
query GET_DIENSTEN_PAGE {
  page: wpPage(slug: {eq: "diensten"}) {
    id
    title
    uri
    dienstenACF {
      aanbestedingenBody
      aanbestedingenHeader
      adviesHeader
      adviesBody
      andereUitdagingBody
      andereUitdagingHeader
      beleidsplanningBody
      beleidsplanningHeader
      fieldGroupName
      procesmanagementBody
      projectmanagementBody
      procesmanagementHeader
      projectmanagementHeader
      sparringBody
      sparringHeader
      visieBody
      visieHeader
    }
  }
}
`;

module.exports = async ( { actions, graphql } ) => {

	const { createPage } = actions;

	const fetchPosts = async () => {

		// Do query to get services page data.
		return await graphql( GET_DIENSTEN_PAGE )
			.then(({ data }) => {
				
                const { page } = data;
                
				return {  page: page };
			} );


	};

	// When the above fetchPosts is resolved, then create page and pass the data as pageContext to the page template.
	await fetchPosts().then( ( { page } ) => {
		createPage( {
			path: page.uri,
			component: slash( dienstenTemplate ),
			context: {
				page
			},
		},
		);
	} )

};