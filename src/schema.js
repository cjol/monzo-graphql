import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, } from 'graphql';

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			token: {
				type: GraphQLString,
				resolve( parent, params, context ) {
					return context.token;
				},
			}
		},
	})
});

export default schema;
