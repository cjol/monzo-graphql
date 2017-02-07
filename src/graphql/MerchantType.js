import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import request from 'request-promise';

export default new GraphQLObjectType({
	name: 'MerchantType',
	fields: {
		id: {
			type: GraphQLString
		}
	}
});
