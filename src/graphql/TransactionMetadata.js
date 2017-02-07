import { GraphQLObjectType, GraphQLString } from 'graphql';
import request from 'request-promise';

export default new GraphQLObjectType({
	name: 'TransactionMetadata',
	fields: {
		name: {
			type: GraphQLString
		},
		value: {
			type: GraphQLString
		}
	}
});
