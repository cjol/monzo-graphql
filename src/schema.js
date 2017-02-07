import { graphql, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import request from 'request-promise';

import ViewerType from './graphql/ViewerType';


const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			Viewer: {
				type: ViewerType,
				resolve( parent, params, context ) {
					return {};
				}
			}
		}
	})
});

export default schema;
