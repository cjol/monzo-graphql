import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import request from 'request-promise';
import Account from './Account';

export default new GraphQLObjectType({
	name: 'Viewer',
	fields: () => ({
		token: {
			type: GraphQLString,
			resolve( viewer, params, context ) {
				return context.token;
			}
		},

		accounts: {
			type: new GraphQLList(Account),
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
