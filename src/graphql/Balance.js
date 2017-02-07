import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import request from 'request-promise';

export default new GraphQLObjectType({
	name: 'BalanceType',
	fields: {
		balance: {
			type: GraphQLInt
		},
		currency: {
			type: GraphQLString
		},
		spend_today: {
			type: GraphQLInt
		}
	}
});
