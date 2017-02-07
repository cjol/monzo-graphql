import { graphql, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import request from 'request-promise';

import Viewer from './graphql/Viewer';


const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			Viewer: {
				type: Viewer,
				resolve( parent, params, context ) {
					return {};
				}
			}
		}
	})
});

export default schema;
