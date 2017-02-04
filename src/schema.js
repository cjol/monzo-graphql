import { graphql, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import request from 'request-promise';

const BalanceType =
	new GraphQLObjectType({
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

const AccountType =
	new GraphQLObjectType({
		name: 'AccountType',
		fields: {
			id: {
				type: GraphQLString
			},
			description: {
				type: GraphQLString
			},
			created: {
				type: GraphQLString
			},

			balance: {
				type: BalanceType,
				async resolve(account, params, context) {
					var options = {
						method: 'GET',
						auth: {
							bearer: context.token
						},
						qs: {
							account_id: account.id
						},
						uri: 'https://api.monzo.com/balance',
					};

					return JSON.parse(await request(options));
				}
			}
		}
	});

const ViewerType = new GraphQLObjectType({
	name: 'ViewerType',
	fields: {
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
		}
	}
});


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
