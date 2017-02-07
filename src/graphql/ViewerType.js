import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import request from 'request-promise';
import AccountType from './AccountType';

export default new GraphQLObjectType({
	name: 'ViewerType',
	fields: () => ({
		token: {
			type: GraphQLString,
			resolve( viewer, params, context ) {
				return context.token;
			}
		},

		accounts: {
			type: new GraphQLList(AccountType),
			async resolve( viewer, params, context ) {

				var options = {
					method: 'GET',
					auth: {
						bearer: context.token
					},
					uri: 'https://api.monzo.com/accounts',
				};

				const body = JSON.parse(await request(options));
				return body.accounts;
			}
		},

	})
});
